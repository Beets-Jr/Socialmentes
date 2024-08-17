import { useEffect, useState } from "react";
import { useParams } from "react-router-dom/dist";

import { Box, CircularProgress, createTheme, ThemeProvider, Typography, useMediaQuery } from "@mui/material";

import { getPatient } from "../../../Services/patientService";
import { getTestByIdTest } from "../../../Services/testsPatientsService"
import { TabelaPaciente } from "../../../Components/PainelPsicologo/Reports/Tabela/TabelaPaciente";
import BottomBtn from "../../../Components/PainelPsicologo/Reports/AcompanharIntervencao/BottomBtn";

import styles from './Tabela.module.css';

let theme = createTheme();
theme.typography.h4 = {
    [theme.breakpoints.up('xs')]: {
        fontSize: '24px'
    },
    [theme.breakpoints.up('sm')]: {
        fontSize: '30px'
    },
};

const Title = ({ component = 'h3', text = '' }) => {
    return (
        <Typography
            variant="h4"
            sx={{
                fontFamily: 'var(--font-sub)',
                fontWeight: component == 'h2' ? 500 : 400,
                color: 'var(--color-blue-4)',
                marginBottom: 2
            }}
        >
            {text}
        </Typography>
    );
};

function AcompanharIntervencao() {

    const { testId } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [patient, setPatient] = useState();
    const [data, setData] = useState();

    const isMobile = useMediaQuery('(max-width:600px)');

    useEffect(() => {
        async function createTable() {
            try {
                // recupera o teste
                const test = await getTestByIdTest(testId);
                if (test instanceof Error) {
                    console.log(test.message);
                    return;
                }

                // seta o paciente relacionado ao teste
                const respPatient = await getPatient(test.patientId)
                if (respPatient instanceof Error) {
                    console.log(respPatient.message);
                    return;
                } else {
                    setPatient(respPatient);
                }

                setIsLoading(false);

                setTimeout(() => setData((
                    <>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, dolores quibusdam. Officiis tenetur sed a veniam. Culpa voluptatem odio ipsum laboriosam, tempore, tempora ut eaque dignissimos cum doloremque ratione facere.
                        <br/>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos et, officiis tempora quasi reprehenderit veritatis modi sequi ducimus saepe omnis provident distinctio, aperiam commodi necessitatibus. Nostrum quos distinctio reiciendis illo?
                        <br/>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat provident quisquam eligendi natus modi labore suscipit quidem ipsa libero! Optio at libero non quae necessitatibus sit. Hic maxime eos delectus.
                        <br/>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque quod quisquam fuga soluta aliquid ex, atque dicta illum! Numquam commodi dolorem temporibus velit, molestiae dolores delectus voluptate sapiente totam? Distinctio!
                        <br/>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores eligendi voluptatibus animi fuga provident repellendus tenetur eaque reprehenderit, laboriosam, culpa vel non, itaque dicta similique? Vitae necessitatibus ipsum doloribus consequuntur?
                        <br/>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam sint reprehenderit deleniti, nam qui ad saepe fugit natus optio? Delectus repudiandae inventore enim harum rem assumenda velit illum corporis error!
                        <br/>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, quisquam optio aperiam dignissimos expedita, inventore ratione dolor mollitia corporis labore iusto asperiores quia molestias magnam nam, blanditiis veritatis repellendus necessitatibus.
                        <br/>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi voluptatem, unde nulla fuga, mollitia perspiciatis officia quis repudiandae delectus ipsam reprehenderit magni molestiae quo maiores molestias veniam at obcaecati distinctio?
                        <br/>
                    </>
                )), 10);
            } catch (error) {
                console.log(error);
            }
        }
        createTable();
    }, []);
    
    return (
        <Box className={styles.container_reports}>

            { isLoading ? (
                <Box className={styles.container_empty}>
                    <CircularProgress />
                </Box>
            ) : (

                <Box style={{ position: 'relative' }} >

                    <ThemeProvider theme={theme}>
                        <Title
                            text="Checklist Curriculum Modelo Intervenção Precoce em Crianças com Austismo"
                            component='h2'
                        />

                        <TabelaPaciente patient={patient} showCaption={false} showDateBirth />

                        <br/>

                        <Box>
                            {data}
                        </Box>

                        <Box>
                            <BottomBtn />
                        </Box>

                    </ThemeProvider>
                </Box>

            )}

        </Box>
    );

}

export default AcompanharIntervencao;