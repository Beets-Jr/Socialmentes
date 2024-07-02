import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box, CircularProgress } from "@mui/material";

import SearchField from '../../../Components/ElementsInterface/SearchField';
import DataTable from '../../../Components/ElementsInterface/DataTable';
import { UserService } from '../../../Services/userService';
import { EditIcon } from "../../../Assets/Icons/EditIcon";
import { VisibilityIcon } from "../../../Assets/Icons/VisibilityIcon";

import styles from './Patients.module.css';
import { AppContext } from "../../../Contexts/AppContext";
import { DocIcon } from "../../../Assets/Icons/DocIcon";

function Patients() {
    const navigate = useNavigate();
    const {setValue} = useContext(AppContext);
    const [isLoading, setIsLoading] = useState(true);

    const [patients, setPatients] = useState([]);
    const [filteredPatients, setFilteredPatients] = useState([]);

    useEffect(() => {
        UserService.getByPosition('Paciente')
            .then((patients) => {
                setIsLoading(false);
                setPatients(patients);
                setFilteredPatients(patients);
                setValue(patients.length);
            });
    }, []);

    return (
        <Box className={styles.container_patients} sx={{ position: "sticky"}}>

            { isLoading ? (
                <Box className={styles.container_empty}>
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    <SearchField
                        placeholder="Pesquisar paciente"
                        data={patients}
                        field='fullName'
                        setFilteredData={setFilteredPatients}
                    />
                    <Box mt={4}>
                        <DataTable
                            md={[ 4.5, 2, 3.5, 2 ]}
                            sm={[ 4, 2, 3, 3 ]}
                            xs={[ 3, 2, 3, 4 ]}
                            head={[ 'Nome', 'Idade', 'Responsável' ]}
                            columns={[
                                (row) => row.fullName,
                                (row) => row.phone, // Idade
                                (row) => row.email // Responsável
                            ]}
                            body={filteredPatients}
                            onAdd={ () => console.log('click!') }
                            actions={[
                                {
                                    func: (id) => navigate(`informacoes`),
                                    icon: <VisibilityIcon/>
                                },
                                {
                                    func: (id) => console.log(`edit ${id}`),
                                    icon: <EditIcon/>
                                },
                                {
                                    func: (id) => console.log(`docs ${id}`),
                                    icon: <DocIcon/>
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