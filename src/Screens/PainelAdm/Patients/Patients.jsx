import { useContext, useEffect, useState } from "react";

import { Box, CircularProgress } from "@mui/material";

import { AppContext } from "../../../Contexts/AppContext";
import SearchField from '../../../Components/ElementsInterface/SearchField';
import DataTable from '../../../Components/ElementsInterface/DataTable';
import { PatientService } from "../../../Services/patientService";
import { EditIcon } from "../../../Assets/Icons/EditIcon";
import { VisibilityIcon } from "../../../Assets/Icons/VisibilityIcon";

import styles from './Patients.module.css';

function Patients() {

    const {setValue} = useContext(AppContext);
    const [isLoading, setIsLoading] = useState(true);

    const [patients, setPatients] = useState([]);
    const [filteredPatients, setFilteredPatients] = useState([]);

    useEffect(() => {
        PatientService.getAllPatients()
            .then((patients) => {
                setIsLoading(false);
                setPatients(patients);
                setFilteredPatients(patients);
                setValue(patients.length);
            });
    }, []);

    const getAge = (date) => {
        if (!date) return;
        const now = new Date();
        const dataString = date;
        const dateBirth = dataString[2] === '/' ?
            new Date(
                dataString.slice(6, 10),
                Number(dataString.slice(3, 5)) - 1,
                dataString.slice(0, 2)
            ) :
            new Date(
                dataString.slice(0, 4),
                Number(dataString.slice(5, 7)) - 1,
                dataString.slice(8, 10)
            );
        const years = now.getFullYear() - dateBirth.getFullYear();
        const months = now.getMonth() - dateBirth.getMonth();
        const days = now.getDate() - dateBirth.getDate();

        if (months < 0) {
            return `${years - 1} anos e ${12 + months} mes(es)`;
        } else if (months > 0) {
            return `${years} anos e ${months} mes(es)`;
        } else if (days < 0) {
            return `${years - 1} anos e ${months > 0 ? months - 1 : 11} mes(es)`;
        } else {
            return `${years} anos`;
        }
    };

    return (
        <Box className={styles.container_patients}>

            { isLoading ? (
                <Box className={styles.container_empty}>
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    <SearchField
                        placeholder="Pesquisar paciente"
                        data={patients}
                        getValue={(row) => row.children.name}
                        setFilteredData={setFilteredPatients}
                    />
                    <Box mt={4}>
                        <DataTable
                            md={[ 4.5, 2, 3.5, 2 ]}
                            sm={[ 4, 2, 3, 3 ]}
                            // xs={[ 3, 2, 3, 4 ]}
                            head={[ 'Nome', 'Idade', 'Responsável' ]}
                            columns={[
                                {
                                    func: (row) => row.children.name
                                },
                                {
                                    func: (row) => getAge(row.children.dateBirth),
                                },
                                {
                                    func: (row) => row.caregivers.caregiver1.name
                                }
                            ]}
                            body={filteredPatients}
                            onAdd={ () => console.log('click!') }
                            actions={[
                                {
                                    func: (id) => console.log(`eye ${id}`),
                                    icon: <VisibilityIcon/>
                                },
                                {
                                    func: (id) => console.log(`edit ${id}`),
                                    icon: <EditIcon/>
                                },
                            ]}
                            emptyText='Nenhum paciente cadastrado'
                        />
                    </Box>
                </>
            )}

        </Box>
    );

}

export default Patients;