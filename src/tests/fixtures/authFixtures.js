export const initialState = {
    status: 'checking',
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,
}

export const authenticatedState = {
    status: 'authenticated',
    uid: '123',
    email: 'demos@email.com',
    displayName: 'Demo user',
    photoURL: 'https://demos.jpg',
    errorMessage: null,
}


export const notauthenticatedState = {
    status: 'not-authenticated',
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,
}

export const demoUser = {
    uid: '123',
    email: 'demos@email.com',
    displayName: 'Demo user',
    photoURL: 'https://demos.jpg'
}
