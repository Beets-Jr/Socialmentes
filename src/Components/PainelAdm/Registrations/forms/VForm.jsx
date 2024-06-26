/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { createContext, forwardRef, useContext, useImperativeHandle, useMemo, useRef, useState } from "react";

const VFormContext = createContext();

export const VForm = forwardRef(( { children, defaultValues, onSubmit }, ref ) => {

    const formRef = useRef();

    const data = useMemo(() => {
        return defaultValues ? defaultValues : {};
    }, []);

    const [focusedField, setFocusedField] = useState('');

    const [focusedFieldData, setFocusedFieldData] = useState(false);

    const getData = () => {
        return data;
    }

    const getFieldValue = (name) => {
        return data[name]
    };

    const setFieldValue = (name, value) => {
        data[name] = value;
    }

    const submitForm = () => {
        formRef.current.requestSubmit();
    }

    useImperativeHandle(ref, () => ({
        getData,
        getFieldValue,
        setFieldValue,
        submitForm
    }));

    return (
        <VFormContext.Provider value={{
            getData,
            getFieldValue,
            setFieldValue,
            focusedField,
            setFocusedField,
            focusedFieldData,
            setFocusedFieldData
        } } >

            <form
                ref={formRef}
                onSubmit={ (e) => {
                    e.preventDefault(e);
                    onSubmit(data);
                }}
                encType="multipart/form-data"
            >

                {children}

            </form>

        </VFormContext.Provider>
    )

});

export const useVFormContext = () => {
    return useContext(VFormContext);
};