import { Box } from "@mui/material";

import SearchField from '../../../Components/ElementsInterface/SearchField';
import DataTable from '../../../Components/ElementsInterface/DataTable';
import { EditIcon } from "../../../Assets/Icons/EditIcon";
import { VisibilityIcon } from "../../../Assets/Icons/VisibilityIcon";

import styles from './Patients.module.css';

function Patients() {

    return (
        <Box className={styles.container_patients}>

            <SearchField placeholder="Pesquisar paciente" />

            <Box mt={4}>
                <DataTable
                    spacing={[ 4.5, 3, 4.5 ]}
                    head={[ 'Nome', 'Idade', 'Responsável' ]}
                    body={[
                        {id: 1, name: 'TesteNome', resp: 'TesteResp', age: 22},
                        {id: 2, name: 'TesteNome', resp: 'TesteResp', age: 22}
                    ]}
                    onAdd={() => {console.log('click!');}}
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
                />
            </Box>

        </Box>
    );

}

export default Patients;