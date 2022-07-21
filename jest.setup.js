// En caso de necesitar la implementación del FetchAPI
import 'whatwg-fetch'; // <-- yarn add whatwg-fetch
// por solventar el error de cloudinary
import 'setimmediate';

require("dotenv").config({
    path: '.env.test'
})
jest.mock('./src/helpers/getEnvironments', () => ({
    getEnvironments: () => ({ ...process.env })
}))
jest.setTimeout(10000)
