import { Box, Grid } from '@mui/material'
import React from 'react'
import styles from './CriarIntervencao.module.css'
import PatientData from '../../../Components/PainelPsicologo/Reports/ChecklistComponents/PatientData'
import StyledInputText from '../../../Components/PainelPsicologo/Reports/InterventionComponents/StyledInputText'
import StyledCheckBox from '../../../Components/PainelPsicologo/Reports/InterventionComponents/StyledCheckBox'
import StyledTitle from '../../../Components/PainelPsicologo/Reports/InterventionComponents/StyledTitle'
import AddFieldButton from '../../../Components/PainelPsicologo/Reports/InterventionComponents/AddFieldButton'


const CriarIntervencao = () => {
  return (
    <>
      <Box className={styles.container}>
        <PatientData name="Jeu da graça" birthday="12/12/2004" />
        <br /><br />
        <StyledTitle text="Metas" />
        <Grid container spacing={1}>
          <StyledInputText lg={11.4} name="data" />
          <AddFieldButton />
        </Grid>

        <StyledTitle text="Rotina de atividades" />
        <Grid container spacing={1}>
          <StyledInputText lg={6} name="type" label="Tipo de brincadeira" />
          <StyledInputText lg={6} name="local" label="Local" />
          <StyledInputText lg={11.4} name="meta" label="Metas" />
          <AddFieldButton vin />
        </Grid>

        <StyledTitle text="Cronograma" />
        <Grid container spacing={1}> {/* Cronograma */}
          <StyledInputText lg={1.5} name="hora" label="Horario" />
          <StyledInputText lg={4.5} name="segunda" label="Terapeuta" />
          <Grid item lg={5.4}>
            <StyledCheckBox />
          </Grid>
          <AddFieldButton vin />
        </Grid >



        <Grid container spacing={1}>
          <StyledInputText lg={12} name="coorS" label="Coordenador Senior" />
          <StyledInputText lg={12} name="coorJ" label="Coordenador Junior" />
          <StyledInputText lg={12} name="participantes" label="Início Intervenção ABA" />
        </Grid>

      </Box>
    </>

  )
}

export default CriarIntervencao