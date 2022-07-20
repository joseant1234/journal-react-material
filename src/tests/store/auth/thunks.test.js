import { loginWithEmailPassword, logoutFirebase, signInWithGoogle } from "../../../firebase/providers";
import { checkingCredentials, login, logout } from "../../../store/auth/authSlice";
import { checkingAuthentication, startGoogleSignIn, startLoginWithEmailPassword, startLogout } from "../../../store/auth/thunks"
import { clearNotesLogout } from "../../../store/journal";
import { demoUser } from "../../fixtures/authFixtures";

jest.mock('../../../firebase/providers');

describe('Pruebas en auth thunk', () => {

    const dispatch = jest.fn()

    beforeEach(() => jest.clearAllMocks());

    test('debe de invocar el checkingCredentials', async() => {
        // el primer () es el llamdo a la funcion, el siguiente es el valor de retorno de la funcion
        await checkingAuthentication()(dispatch);
        expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
    });

    test('startGoogleSignIn debe de llamar checkingCredentials y login - Exito', async() => {
        const loginData = { ok: true, ...demoUser };
        // signInWithGoogle esto ya es un mock
        // cualquier cosa q retorna lo que está en mock('providers) es un mock
        await signInWithGoogle.mockResolvedValue(loginData);

        // startGoogleSignIn es el thunk
        await startGoogleSignIn()(dispatch);
        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(login(loginData));
    });

    test('startGoogleSignIn debe de llamar checkingCredentials y logout - Error', async() => {
        const loginData = { ok: false, errorMessage: 'Un error en Google' };

        await signInWithGoogle.mockResolvedValue(loginData);

        await startGoogleSignIn()(dispatch);
        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage));
    });

    test('startLoginWithEmailPassword debe de llamar checkingCredentials y login - Exito', async() => {
        const loginData = { ok: true, ...demoUser };
        const formData = { email: demoUser.email, password: '123456 '};

        await loginWithEmailPassword.mockResolvedValue(loginData);
        // lo que se quiere probar es el thunk
        await startLoginWithEmailPassword(formData)(dispatch)

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(login(loginData));
    });


    test('startLogout debe de llamar logoutFirebase, clearNotes y logout', async() => {

        await startLogout()(dispatch);

        expect(logoutFirebase).toHaveBeenCalled();
        expect(dispatch).toHaveBeenCalledWith(clearNotesLogout());
        expect(dispatch).toHaveBeenCalledWith(logout());
    });
})
