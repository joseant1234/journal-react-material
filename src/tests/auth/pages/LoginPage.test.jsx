import { configureStore } from "@reduxjs/toolkit";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { LoginPage } from "../../../auth/pages/LoginPage";
import { authSlice } from "../../../store/auth/authSlice";
import { notauthenticatedState } from "../../fixtures/authFixtures";

// debe de llevar la palabra mock para q funcione
const mockStartGoogleSignIn = jest.fn();
const mockStartLoginWithEmailPassword = jest.fn();


// se hace mock del thunk startGoogleSignIn
jest.mock('../../../store/auth/thunks', () => ({
    startGoogleSignIn: () => mockStartGoogleSignIn,
    startLoginWithEmailPassword: ({ email, password }) => {
        return () => mockStartLoginWithEmailPassword({ email, password })
    },
}));

// useDispatch: () => {
//     return (fn) => fn()
// },
jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: () => (fn) => fn(),
}))

// usando el preloadedState se carga un estado inicial, ya que por defecto con el estado inicial q maneja el store el status es 'checking' ocasiona que el botón de google esté deshabilitado
const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    },
    preloadedState: {
        auth: notauthenticatedState,
    }
})

describe('Pruebas en LoginPage', () => {

    beforeEach(() => jest.clearAllMocks());

    test('debe de mostrar el componente correctamente', () => {
        // el memory router proporciona todo lo necesario para simular el componente de route
        render(
            <Provider store={ store }>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        )
        // screen.debug();

        expect(screen.getAllByText('Login').length).toBeGreaterThanOrEqual(1);
    });

    test('botón google debe de llamar el startGoogleSign', () => {
        render(
            <Provider store={ store }>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        )

        const googleBtn = screen.getByLabelText('google-btn');
        // hacer click al botón
        fireEvent.click(googleBtn);
        expect(mockStartGoogleSignIn).toHaveBeenCalled()
    });

    test('submit debe de llamar startLoginWithEmailPassword', () => {

        const email = 'jose@email.com';
        const password = '123456';

        render(
            <Provider store={ store }>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );

        // busca un componente con el name correo, el name no es de la prop name, sino q se crea un name en componente q por lo general es el label o contenido de componente
        const emailField = screen.getByRole('textbox', { name: 'Correo' });
        fireEvent.change(emailField, { target: { name: 'email', value: email }});

        const passwordField = screen.getByTestId('password');
        fireEvent.change(passwordField, { target: { name: 'password', value: password }});

        const loginForm = screen.getByLabelText('submit-form');
        fireEvent.submit(loginForm);

        expect(mockStartLoginWithEmailPassword).toHaveBeenCalledWith({
            email,
            password
        });
    });
});
