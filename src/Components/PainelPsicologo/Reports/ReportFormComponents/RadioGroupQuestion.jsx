import React from 'react';
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Stack } from '@mui/material';
import { Controller } from 'react-hook-form';

/* 
    Param: 
    labelId -> ID usado para associar o FormLabel ao grupo de botões
    label -> rótulo do grupo de botões (indicar o que é perguntado)
    name -> nome do grupo de botões (garantir que só um deles seja selecionado)
    options -> array com as opções de botão
        value: valor da opção 
        label: texto exibido na tela
    control -> Controlador do React Hook Form para este campo
*/
function RadioGroupQuestion({ labelId, label, name, options, control }) {
    return (
        <FormControl sx={{ margin: '0.1vh' }}>
            {/* Associar o FormLabel ao RadioGroup */}
            <FormLabel id={labelId} sx={{
                    fontFamily: 'var(--font-sub)', 
                    color: 'var(--color-blue-3)', 
                    '&.Mui-focused': { color: 'var(--color-blue-3)' },
                    '&.MuiFormLabel-root': { color: 'var(--color-blue-3)' } 
                }} 
            >
                {label}
            </FormLabel>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <RadioGroup
                        row
                        aria-labelledby={labelId}
                        {...field}
                    >
                        {/* Mapear os possíveis valores para os radio buttons */}
                        <Stack direction="row" spacing={2} sx={{display:'flex'}}>
                            {options.map((option) => {
                                const radioId = `${name}-${option.value}`; // Gerar um id único para cada Radio
                                return (
                                    <FormControlLabel
                                        key={option.value}
                                        value={option.value}
                                        control={<Radio id={radioId} sx={{pointerEvents: 'none', '&:hover': {backgroundColor: 'transparent',}, '&.Mui-checked': {color: 'var(--color-blue-3)',}, '&.MuiSvgIcon-root': { borderColor: 'var(--color-gray-3)', },'& .MuiSvgIcon-root': {'& circle': { fill: 'var(--color-gray-3)', },},}}/>}  // Usar id no Radio
                                        label={option.label}
                                        sx={{ fontFamily: 'var(--font-text)', color: 'var(--color-gray-4)'}}
                                    />
                                );
                            })}
                        </Stack>
                    </RadioGroup>
                )}
            />
        </FormControl>
    );
}

export default RadioGroupQuestion;
