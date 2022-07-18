import { checkingCredentials } from "../../../store/auth/authSlice";
import { checkingAuthentication } from "../../../store/auth/thunks"

jest.mock('../../../firebase/providers');

describe('Pruebas en auth thunk', () => {

    const dispatch = jest.fn()

    beforeEach(() => jest.clearAllMocks());

    test('debe de invocar el checkingCredentials', async() => {
        // el primer () es el llamdo a la funcion, el siguiente es el valor de retorno de la funcion
        await checkingAuthentication()(dispatch);
        expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
    })
})
