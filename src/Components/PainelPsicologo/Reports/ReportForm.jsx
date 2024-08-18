import { Box } from '@mui/material';
import RadioGroupQuestion from './ReportFormComponents/RadioGroupQuestion';
import TextfieldQuestion from './ReportFormComponents/TextfieldQuestion';

function ReportForm() {
    return(
        <Box>
            <RadioGroupQuestion
                labelId="gestacao"
                label="Gestação:"
                name="grupo-gestacao"
                options={[
                { value: 'planejada', label: 'Desejada e planejada' },
                { value: 'desejada', label: 'Não planejada, mas desejada' },
                { value: 'indesejada', label: 'Indesejada' },
                ]}
            />

            <RadioGroupQuestion
                labelId="dados-fornecidos-por"
                label="Dados fornecidos por:"
                name="grupo-dados-fornecidos-por"
                options={[
                { value: 'pais', label: 'Pais' },
                { value: 'mae', label: 'Mãe' },
                { value: 'pai', label: 'Pai' },
                ]}
            />

            <RadioGroupQuestion
                labelId="decorrer-gestacao"
                label="Gestação mostrou-se:"
                name="grupo-decorrer-gestacao"
                options={[
                { value: 'semintercorrencia', label: 'Sem intercorrência' },
                { value: 'comintercorrencia', label: 'Com intercorrência' },
                ]}
            />

            <TextfieldQuestion 
                label="Descrição de possíveis intercorrências:"
                name="descricao-possiveis-intercorrencias"
                value="fico"
                onChange="dale"   
            />

            <RadioGroupQuestion
                labelId="amamentacao"
                label="Amamentação:"
                name="grupo-amamentacao"
                options={[
                { value: 'semdificuldade', label: 'Sem dificuldade' },
                { value: 'comdificuldade', label: 'Com dificuldade' },
                ]}
            />
        </Box>
    );
}

export default ReportForm;