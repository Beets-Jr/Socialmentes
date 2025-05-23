import React from 'react';
import { FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import { Controller } from 'react-hook-form';

{/*
   Param:
    label -> Rótulo que será exibido acima do grupo de checkboxes
    name -> Nome do grupo de checkboxes para identificação no formulário
    options -> Lista de opções para exibir como checkboxes, cada uma com um value e um label
    control -> Controlador do React Hook Form para este campo
*/}
function CheckboxQuestion({ control, name, label, options }) {
    return (
        <FormControl component="fieldset" variant="standard">
            <FormLabel component="legend" sx={{
                    fontFamily: 'var(--font-sub)', 
                    color: 'var(--color-blue-3)',
                    '&.Mui-focused': { color: 'var(--color-blue-3)' }, 
                    '&.MuiFormLabel-root': { color: 'var(--color-blue-3)' } 
                }} >{label}</FormLabel>
            <FormGroup sx={{display:'flex', flexDirection:'row'}}>
                {options.map((option) => (
                    <Controller
                        key={option.value}
                        name={`${name}.${option.value}`}
                        control={control}
                        render={({ field }) => (
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        {...field}
                                        checked={field.value}
                                        sx={{
                                            // Remove a elevação
                                            '&.Mui-checked': {
                                                color: 'var(--color-blue-3)', // Cor quando selecionado
                                            },
                                            '&:hover': {
                                                backgroundColor: 'transparent', // Remover fundo ao passar o mouse
                                            },
                                            // Remove a sombra ao ser clicado
                                            '&.MuiCheckbox-root.Mui-disabled': {
                                                boxShadow: 'none',
                                            },
                                        }}
                                        
                                    />
                                }
                                label={`${option.value}. ${option.label}`}
                                sx={{fontFamily:'var(--font-text)', color:'var(--color-gray-4)'}}
                            />
                        )}
                    />
                ))}
            </FormGroup>
        </FormControl>
    );
}

export default CheckboxQuestion;
