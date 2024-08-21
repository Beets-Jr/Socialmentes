import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';

/* 
    Param: 
    labelId -> ID usado para associar o FormLabel ao grupo de botões
    label -> rótulo do grupo de botões (indicar o que é perguntado)
    name -> nome do grupo de botões (garantir que só um deles seja selecionado)
    options -> array com as opções de botão
        value: valor da opção 
        label: texto exibido na tela
*/
function RadioGroupQuestion({ labelId, label, name, options }) {
    return (
        <FormControl sx={{margin:'0.1vh'}}>
            {/* Associar o FormLabel ao RadioGroup */}
            <FormLabel id={labelId} sx={{fontFamily:'var(--font-sub)', color:'var(--color-blue-3)'}}>{label}</FormLabel> 
            <RadioGroup
                row
                aria-labelledby={labelId}
                name={name}
            >
                {/* Mapear os possíveis valores para os radio buttons */}
                {options.map((option) => {
                    return (
                        <FormControlLabel
                            key={option.value}
                            value={option.value}
                            control={<Radio />} 
                            label={option.label}
                            sx={{fontFamily:'var(--font-text)', color:'var(--color-gray-4)'}}
                        />
                    );
                })}
            </RadioGroup>
        </FormControl>
    );
}

export default RadioGroupQuestion;
