import { configureStore } from "@reduxjs/toolkit";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { LoginPage } from "../../../auth/pages/LoginPage";
import { authSlice } from "../../../store/auth/authSlice";
import { notauthenticatedState } from "../../fixtures/authFixtures";

// debe de llevar la palabra mock para q funcione
const mockStartGoogleSignIn = jest.fn();
// se hace mock del thunk startGoogleSignIn
jest.mock('../../../store/auth/thunks', () => ({
    startGoogleSignIn: () => mockStartGoogleSignIn
}));

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
    })
});
