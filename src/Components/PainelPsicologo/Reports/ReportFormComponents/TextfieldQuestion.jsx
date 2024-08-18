import { TextField, FormControl } from '@mui/material';

{/*
   Param:
    label -> Rótulo que será exibido acima do campo de texto
    name -> Nome do campo de texto para identificação
    type -> Tipo de campo (se não for passado, será 'text')
    value -> Valor atual do campo 
    onChange -> função para ações no campo de texto 
    required -> se o campo é obrigatório (por default é false)

*/}
function TextfieldQuestion({ label, name, type = 'text', value, onChange, required = false }) {
    return(
        <FormControl fullWidth>
            <TextField
                label={label}
                name={name}
                type={type}   
                value={value} 
                onChange={onChange} // olhar o react hook form para isso
                required={required} 
                variant="outlined"  
            />
        </FormControl>
    );
}

export default TextfieldQuestion;