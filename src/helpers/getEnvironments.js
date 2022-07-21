export const getEnvironments = () => {
    // esto es para cargar las variables de entorno
    import.meta.env;

    return {
        ...import.meta.env
    }


}
