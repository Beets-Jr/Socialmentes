import { Box } from "@mui/material";
import { EditOutlined, VisibilityOutlined } from '@mui/icons-material';

import SearchField from '../../../Components/ElementsInterface/SearchField';
import DataTable from '../../../Components/ElementsInterface/DataTable';

import styles from './Patients.module.css';

function Patients() {

    return (
        <Box className={styles.container_patients}>

            <SearchField placeholder="Pesquisar paciente" />

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
                        icon: <VisibilityOutlined fontSize="small" />
                    },
                    {
                        func: (id) => console.log(`edit ${id}`),
                        icon: <EditOutlined fontSize="small" />
                    }
                ]}
            />

        </Box>
    );

}

export default Patients;