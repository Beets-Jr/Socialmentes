import { useEffect, useState } from "react";

import { Box, CircularProgress } from "@mui/material";

import SearchField from '../../../Components/ElementsInterface/SearchField';
import DataTable from '../../../Components/ElementsInterface/DataTable';
import { UserService } from '../../../Services/userService';
import { EditIcon } from "../../../Assets/Icons/EditIcon";
import { VisibilityIcon } from "../../../Assets/Icons/VisibilityIcon";

import styles from './Patients.module.css';

function Patients() {

    const [isLoading, setIsLoading] = useState(true);
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        UserService.getByPosition('Paciente')
            .then((patients) => {
                setIsLoading(false);
                setPatients(patients);
            });
    }, []);

    return (
        <Box className={styles.container_patients}>

            { isLoading ? (
                <Box className={styles.container_empty}>
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    <SearchField placeholder="Pesquisar paciente" />
                    <Box mt={4}>
                        <DataTable
                            xs={[ 4.5, 3, 4.5 ]}
                            columns={[ 'fullName', 'phone', 'specialization' ]}
                            head={[ 'Nome', 'Idade', 'Responsável' ]}
                            body={patients}
                            onAdd={() => console.log('click!')}
                            actions={[
                                {
                                    func: (id) => console.log(`eye ${id}`),
                                    icon: <VisibilityIcon/>
                                },
                                {
                                    func: (id) => console.log(`edit ${id}`),
                                    icon: <EditIcon/>
                                }
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