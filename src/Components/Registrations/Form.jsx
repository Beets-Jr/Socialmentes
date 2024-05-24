import { useState } from "react";
import { Grid } from "@mui/material";

import { VTextField, VSelect, VUploadPhoto } from './forms';
import { useDebounce } from "./hooks";

import './styles/Form.css';

function Form({ formRef, disabledForm, setDisabledButton, items }) {

    // quando atualizado indica alguma alteração nos valores do formulário
    const [alteredField, setAlteredField] = useState(false);

    // ao alterar o valor de algum campo
    useDebounce( () => {
        if ( [...Object.values(formRef.current.getData())].some( value => !value ) )
            return;
        console.log(formRef.current.getData());
        setDisabledButton(false);
    }, [alteredField], 500, true);

    return (

        <Grid container className='gridContainer'>

            { items.map( (row, index) => {

                const row_props = row.length == 1 ? {
                    textAlign: 'center'
                } : {
                    direction: 'row',
                    justifyContent: 'space-between'
                };

                return (

                    <Grid container item key={index} {...row_props}>

                        { row.map( field => {

                            const {xs, type, ...rest} = field;

                            const props_field = {
                                onKeyDown: () => setAlteredField(oldValue => !oldValue),
                                variant: 'outlined',
                                disabled: disabledForm,
                                fullWidth: true,
                                ...rest
                            }

                            switch (type) {
                                case 'photo':
                                    return (
                                        <Grid item xs={xs} key={field.name}>
                                            <VUploadPhoto
                                                {...props_field}
                                                onChange={() => setAlteredField(oldValue => !oldValue)}
                                            />
                                        </Grid>
                                    );
                                case 'text':
                                    return (
                                        <Grid item xs={xs} key={field.name}>
                                            <VTextField
                                                {...props_field}
                                                onKeyDown={() => setAlteredField(oldValue => !oldValue)}
                                                variant='outlined'
                                                disabled={disabledForm}
                                                fullWidth
                                            />
                                        </Grid>
                                    );
                                default:
                                    return (
                                        <Grid item xs={xs} key={field.name}>
                                            <VSelect
                                                {...props_field}
                                                onChange={() => setAlteredField(oldValue => !oldValue)}
                                                variant='outlined'
                                                disabled={disabledForm}
                                                fullWidth
                                            />
                                        </Grid>
                                    );
                            }

                        })}

                    </Grid>

                );

            })}

        </Grid>

    );

}

export default Form;