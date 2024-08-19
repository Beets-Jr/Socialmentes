import { Box } from '@mui/material';
import RadioGroupQuestion from './ReportFormComponents/RadioGroupQuestion';
import TextfieldQuestion from './ReportFormComponents/TextfieldQuestion';
import { useForm, Controller } from 'react-hook-form';
import CheckboxQuestion from './ReportFormComponents/CheckboxQuestion';

function ReportForm() {
    const { handleSubmit, control } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

    return(
        <Box onSubmit={handleSubmit(onSubmit)}>
            {/* Gestação */}
            <RadioGroupQuestion
                labelId="pregnancy"
                label="Gestação:"
                name="pregnancy"
                options={[
                { value: 0, label: 'Desejada e planejada' },
                { value: 1, label: 'Não planejada, mas desejada' },
                { value: 2, label: 'Indesejada' },
                ]}
            />

            <RadioGroupQuestion
                labelId="dataProvidedBy"
                label="Dados fornecidos por:"
                name="dataProvidedBy"
                options={[
                { value: 'pais', label: 'Pais' },
                { value: 'mae', label: 'Mãe' },
                { value: 'pai', label: 'Pai' },
                ]}
            />

            <RadioGroupQuestion
                labelId="withIntercurrences"
                label="Gestação mostrou-se:"
                name="pregnancyWithIntercurrences"
                options={[
                { value: 0, label: 'Sem intercorrência' },
                { value: 1, label: 'Com intercorrência' },
                ]}
            />

            <TextfieldQuestion 
                label="Descrição de possíveis intercorrências:"
                name="pregnancyDescription"
                control={control}
            />

            <TextfieldQuestion 
                label="Tempo de gestação (semanas):"
                name="timeWeeks"
                type="number"
                control={control}
                required
            />
            {/* Amamentação */}
            <RadioGroupQuestion
                labelId="breastfeeding"
                label="Amamentação:"
                name="breastfeedingWithDifficulty"
                options={[
                { value: 0, label: 'Sem dificuldade' },
                { value: 1, label: 'Com dificuldade' },
                ]}
            />

            <TextfieldQuestion 
                label="Amamentado até (meses):"
                name="timeMonths"
                type="number"
                control={control}
                required
            />

            <TextfieldQuestion 
                label="Observações sobre o período:"
                name="breastfeedingObservations"
                control={control}
            />

            {/* Introdução alimentar */}
            <RadioGroupQuestion
                labelId="withIntercurrences"
                label="Introdução alimentar mostrou-se:"
                name="foodIntroductionWithIntercurrences"
                options={[
                { value: 0, label: 'Sem intercorrência' },
                { value: 1, label: 'Com intercorrência' },
                ]}
            />

            <RadioGroupQuestion
                labelId="acceptsFood"
                label="Aceita alimentos:"
                name="foodIntroductionAcceptsFood"
                options={[
                { value: 0, label: 'Aceita variação' },
                { value: 1, label: 'Oscila' },
                { value: 2, label: 'Não aceita' },
                ]}
            />

            <TextfieldQuestion 
                label="Observações sobre o período de alimentação:"
                name="foodIntroductionObservations"
                control={control}
            />

            {/* Sentar, engatinhar e andar */}
            <RadioGroupQuestion
                labelId="period"
                label="Sentar, engatinhar e andar ocorreram:"
                name="sittingCrawlingWalkingPeriod"
                options={[
                { value: 0, label: 'Na idade esperada' },
                { value: 1, label: 'Leve atraso' },
                { value: 2, label: 'Atraso significativo' },
                ]}
            />

            <TextfieldQuestion 
                label="Observações sobre o desenvolvimento de habilidades motoras:"
                name="sittingCrawlingWalkingObservations"
                control={control}
            />

            {/* Desfralde */}
            <RadioGroupQuestion
                labelId="occured"
                label="Desfralde diurno:"
                name="toiletTrainingDaytimeOccured"
                options={[
                { value: 0, label: 'Ocorreu' },
                { value: 1, label: 'Não ocorreu' },
                ]}
            />

            <TextfieldQuestion 
                label="Se ocorreu, com quantos anos foi o desfralde diurno:"
                name="toiletTrainingDaytimeAge"
                type="number"
                control={control}
            />

            <RadioGroupQuestion
                labelId="occured"
                label="Desfralde noturno:"
                name="toiletTrainingNighttimeOccured"
                options={[
                { value: 0, label: 'Ocorreu' },
                { value: 1, label: 'Não ocorreu' },
                ]}
            />

            <TextfieldQuestion 
                label="Se ocorreu, com quantos anos foi o desfralde noturno:"
                name="toiletTrainingNighttimeAge"
                type="number"
                control={control}
            />

            {/* Autonomia */}
            <TextfieldQuestion 
                label="Observações sobre habilidades de autonomia:"
                name="autmonomyObservations"
                control={control}
            />

            <CheckboxQuestion
                control={control}
                name="acquiredSkills"
                label="Habilidades adquiridas:"
                options={[
                    { value: 1, label: 'Alimentar-se' },
                    { value: 2, label: 'Vestir-se' },
                    { value: 3, label: 'Andar pela casa' },
                    { value: 4, label: 'Brincar sozinho' },
                    { value: 5, label: 'Toma banho' },
                    { value: 6, label: 'Escovar os dentes' },
                    { value: 7, label: 'Penteia cabelo' },
                    { value: 8, label: 'Ajuda/carrega própria mochila ou bolsa' },
                    { value: 9, label: 'Coopera/guarda brinquedos após usá-los' },
                    { value: 10, label: 'Coopera com rotina de casa (coloca mesa, arruma cama)' },
                ]}
            />
            {/* Olhar se as habilidades adquiridas e as com dificuldade podem ter as mesmas marcações */}
            <CheckboxQuestion
                control={control}
                name="skillsWithDifficulty"
                label="Habilidades com dificuldade:"
                options={[
                    { value: 1, label: 'Alimentar-se' },
                    { value: 2, label: 'Vestir-se' },
                    { value: 3, label: 'Andar pela casa' },
                    { value: 4, label: 'Brincar sozinho' },
                    { value: 5, label: 'Toma banho' },
                    { value: 6, label: 'Escovar os dentes' },
                    { value: 7, label: 'Penteia cabelo' },
                    { value: 8, label: 'Ajuda/carrega própria mochila ou bolsa' },
                    { value: 9, label: 'Coopera/guarda brinquedos após usá-los' },
                    { value: 10, label: 'Coopera com rotina de casa (coloca mesa, arruma cama)' },
                ]}
            />

            {/* Relação com brinquedos */}
            <RadioGroupQuestion
                labelId="toyRelationship"
                label="Em relação às brincadeiras:"
                name="toyRelationship"
                options={[
                { value: 0, label: 'Uso funcional' },
                { value: 1, label: 'Nem sempre' },
                { value: 2, label: 'Não faz' },
                ]}
            />
            <RadioGroupQuestion
                labelId="skillsSuitableSymbolicPlay"
                label="Habilidade para jogo simbólico:"
                name="skillsSuitableSymbolicPlay"
                options={[
                { value: 0, label: 'Adequada para idade' },
                { value: 1, label: 'Indadequada para idade' },
                ]}
            />
            <RadioGroupQuestion
                labelId="socialSkills"
                label="Habilidades sociais:"
                name="socialSkills"
                options={[
                { value: 0, label: 'Na idade esperada' },
                { value: 1, label: 'Leve atraso' },
                { value: 2, label: 'Atraso significativo' },
                ]}
            />
        </Box>
    );
}

export default ReportForm;