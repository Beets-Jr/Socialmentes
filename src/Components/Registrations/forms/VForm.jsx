import { createContext, forwardRef, useContext, useImperativeHandle, useMemo, useRef, useState } from "react";

const VFormContext = createContext();

/**
 * Encapsula todos os componentes do formulário
 */
// eslint-disable-next-line react/display-name
export const VForm = forwardRef(( props, ref ) => {

    const { children, defaultValues, onSubmit } = props;

    const data = useMemo(() => {
        return defaultValues ? defaultValues : {};
    }, []);

    const [focusedField, setFocusedField] = useState('');

    const [focusedFieldData, setFocusedFieldData] = useState(false);

    const getData = () => {
        return data;
    }

    const getFieldValue = (name) => {
        const tree = name.split('.');
        if (tree.length === 1) {
            return data[tree[0]];
        } else {
            return data[tree[0]][tree[1]];
        }
    };

    const setFieldValue = (name, value) => {
        const tree = name.split('.');
        if (tree.length === 1) {
            data[tree[0]] = value;
        } else {
            data[tree[0]][tree[1]] = value;
        }
    }

    useImperativeHandle(ref, () => ({
        getData,
        getFieldValue,
        setFieldValue
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



// export const VFormContent = ({ formRef, setCurrentField, disabledForm, setDisabledButton, items }) => {

//     // quando atualizado indica alguma alteração nos valores do formulário
//     const [alteredField, setAlteredField] = useState(false);

//     // ao alterar o valor de algum campo verifica se ao menos um está vazio
//     useDebounce( () => {
//         if ( [...Object.values(formRef.current.getData())].some( value => !value ) )
//             setDisabledButton(true);
//         else {
//             setDisabledButton(false);
//         }
//     }, [alteredField], 500, true);

//     return (

//         <Grid container
//         flex-direction='column'
//         gap={2.5}
//         pl={8}
//         pr={8}>

//             { items.map( (row, index) => {

//                 const row_props = row.length == 1 ? {
//                     textAlign: 'center'
//                 } : {
//                     direction: 'row',
//                     justifyContent: 'space-between'
//                 };

//                 return (

//                     <Grid container item key={index} {...row_props}>

//                         { row.map( field => {

//                             const {xs, type, ...rest} = field;

//                             switch (type) {
//                                 case 'photo':
//                                     return (
//                                         <Grid item xs={xs} key={field.name}>
//                                             <VUploadPhoto
//                                                 {...rest}
//                                                 onChange={() => setAlteredField(oldValue => !oldValue)}
//                                             />
//                                         </Grid>
//                                     );
//                                 case 'text':
//                                     return (
//                                         <Grid item xs={xs} key={field.name}>
//                                             <VTextField
//                                                 {...rest}
//                                                 onFocus={() => setCurrentField(field.name)}
//                                                 onBlur={() => setCurrentField('')}
//                                                 onKeyDown={() => setAlteredField(oldValue => !oldValue)}
//                                                 variant='outlined'
//                                                 disabled={disabledForm}
//                                                 fullWidth
//                                             />
//                                         </Grid>
//                                     );
//                                 default:
//                                     return (
//                                         <Grid item xs={xs} key={field.name}>
//                                             <VSelect
//                                                 {...rest}
//                                                 onOpen={() => setCurrentField(field.name)}
//                                                 onBlur={() => setCurrentField('')}
//                                                 onChange={() => setAlteredField(oldValue => !oldValue)}
//                                                 variant='outlined'
//                                                 disabled={disabledForm}
//                                                 fullWidth
//                                             />
//                                         </Grid>
//                                     );
//                             }

//                         })}

//                     </Grid>

//                 );

//             })}

//         </Grid>

//     );

// };