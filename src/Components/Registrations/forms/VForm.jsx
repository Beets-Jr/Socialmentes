import { useState } from "react";
import { Grid } from "@mui/material";

import { VTextField, VSelect, VUploadPhoto } from '../forms';
import { useDebounce } from "../hooks";

import '../styles/Form.css';

export { Form as VForm } from '@unform/web';

export const VFormContent = ({ formRef, setCurrentField, disabledForm, setDisabledButton, items }) => {

    // quando atualizado indica alguma alteração nos valores do formulário
    const [alteredField, setAlteredField] = useState(false);

    // ao alterar o valor de algum campo verifica se ao menos um está vazio
    useDebounce( () => {
        if ( [...Object.values(formRef.current.getData())].some( value => !value ) )
            setDisabledButton(true);
        else {
            setDisabledButton(false);
        }
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

                            switch (type) {
                                case 'photo':
                                    return (
                                        <Grid item xs={xs} key={field.name}>
                                            <VUploadPhoto
                                                {...rest}
                                                onChange={() => setAlteredField(oldValue => !oldValue)}
                                            />
                                        </Grid>
                                    );
                                case 'text':
                                    return (
                                        <Grid item xs={xs} key={field.name}>
                                            <VTextField
                                                {...rest}
                                                onFocus={() => setCurrentField(field.name)}
                                                onBlur={() => setCurrentField('')}
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
                                                {...rest}
                                                onOpen={() => setCurrentField(field.name)}
                                                onBlur={() => setCurrentField('')}
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

};