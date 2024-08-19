import { FormControl, FormLabel, OutlinedInput } from '@mui/material';
import { useController } from 'react-hook-form';

{/*
   Param:
    label -> Rótulo que será exibido acima do campo de texto
    name -> Nome do campo de texto para identificação
    control -> Controlador do React Hook Form para este campo
    type -> Tipo de campo (se não for passado, será 'text')
    required -> se o campo é obrigatório (por default é false)
*/}
function TextfieldQuestion({ label, name, control, type = 'text', required = false }) {
    // Utilize o useController para conectar o campo ao hook form
    const {
        field: { onChange, onBlur, value, ref },
        fieldState: { error },
    } = useController({
        name,
        control,
        rules: { required },
        defaultValue: '',
    });

    return (
        <FormControl variant="outlined" fullWidth error={!!error}>
            <FormLabel htmlFor={name}>{label}</FormLabel>
            <OutlinedInput
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                inputRef={ref} // Ref para o input
                required={required}
                fullWidth
                sx={{
                    marginTop: '8px',
                }}
            />
            {/* Exibe uma mensagem de erro se houver */}
            {error && <p style={{ color: 'red' }}>{error.message}</p>}
        </FormControl>
    );
}

export default TextfieldQuestion;
