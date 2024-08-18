import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';

{/* 
    Param: 
    labelId -> ID usado para associar o FormLabel ao grupo de botões
    label -> rótulo do grupo de botões (indicar o que é perguntado)
    name -> nome do grupo de botões (garantir que só um deles seja selecionado)
    options -> array com as opções de botão
        value: valor da opção 
        label: texto exibido na tela
*/}
function RadioGroupQuestion({ labelId, label, name, options }) {
    return(
        <FormControl>
            <FormLabel id={labelId}>{label}</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby={labelId}
                    name={name}
                > 
                    {/* Mapear os possíveis valores para os radio buttons */}
                    {options.map((option) => ( 
                    <FormControlLabel
                        key={option.value}
                        value={option.value}
                        control={<Radio />}
                        label={option.label}
                    />
                    ))}
                </RadioGroup>
        </FormControl>
    );
}

export default RadioGroupQuestion;