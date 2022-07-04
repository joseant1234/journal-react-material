import { useEffect, useMemo, useState } from 'react';

export const useForm = ( initialForm = {}, formValidations = {} ) => {

    const [ formState, setFormState ] = useState( initialForm );
    // se hace con el hook de react porque si en caso hay un error se puede redibujar el formulario con los errores
    const [ formValidation, setFormValidation] = useState({})

    // se dispara cada vez q formState cambia (por ejemplo un input)
    useEffect(() => {
      createValidators();
    }, [formState])

    // se usa el useMemo para volver a calcular el valor solo si formValidation cambia
    const isFormValid = useMemo(() => {
        for (const formValue of Object.keys(formValidation)) {

            // valor de retorno de la funcion
            if ( formValidation[formValue] !== null) return false;
        }
        return true;
    }, [formValidation])


    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [ name ]: value
        });
    }

    const onResetForm = () => {
        setFormState( initialForm );
    }

    const createValidators = () => {
        const formCheckedValues = {};
        for (const formField of Object.keys(formValidations)) {
            // formField es la propiedad: email, ...
            const [ fn, errorMessage ] = formValidations[formField];
            // formState['email], se le envía el valor a la funcion de validación
            formCheckedValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage;
        }

        setFormValidation(formCheckedValues);
    }

    // formValidation tiene las props: nombrePropValid

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
        ...formValidation,
        isFormValid,
    }
}
