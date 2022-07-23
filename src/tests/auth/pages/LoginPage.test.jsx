import { configureStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { LoginPage } from "../../../auth/pages/LoginPage";
import { authSlice } from "../../../store/auth/authSlice";

const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    },
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
});
