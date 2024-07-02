import { useContext, useEffect, useState } from "react";

import { Box, CircularProgress, StyledEngineProvider, ThemeProvider } from "@mui/material";
import { CacheProvider } from "@emotion/react";
import createCache from '@emotion/cache';

import { AppContext } from "../../../Contexts/AppContext";
import { UserService } from '../../../Services';
import { theme } from "../../../Components/PainelAdm/Registrations/theme";
import { VisibilityIcon } from "../../../Assets/Icons/VisibilityIcon";
import { EditIcon } from "../../../Assets/Icons/EditIcon";
import AddRegister from "../../../Components/PainelAdm/Registrations/AddRegister";
import SearchField from "../../../Components/ElementsInterface/SearchField";
import DataTable from "../../../Components/ElementsInterface/DataTable";

import styles from './Registrations.module.css';

const cache = createCache({
    key: 'css',
    prepend: true,
});

function Registrations() {

    const {setValue} = useContext(AppContext);
    const [isLoading, setIsLoading] = useState(true);
    const [registerCreated, setRegisterCreated] = useState(false); // informa se um registro foi criado com sucesso, para atualizar a lista de registros
    const [registrations, setRegistrations] = useState([]); // a própria lista de registros
    const [filteredRegistrations, setFilteredRegistrations] = useState([]); // a lista de registros filtrada
    const [openDialog, setOpenDialog] = useState(false); // controla a exibição do Dialog

    // atualiza a lista de registros
    useEffect(() => {
        UserService.getAllUsers()
            .then((patients) => {
                setIsLoading(false);
                setRegistrations(patients);
                setFilteredRegistrations(patients);
                setValue(patients.length);
            });
    }, [registerCreated]);

    // trata o fechamento do Dialog
    const handleClose = () => {
        setOpenDialog(false);
    }

    return (

        <ThemeProvider theme={theme}>
            <CacheProvider value={cache}>
                <StyledEngineProvider injectFirst >

                    <Box className={styles.container_patients}>

                        {isLoading ? (
                            <Box className={styles.container_empty}>
                                <CircularProgress />
                            </Box>
                        ) : (
                            <>
                                <SearchField
                                    placeholder="Pesquisar paciente"
                                    data={registrations}
                                    field='fullName'
                                    setFilteredData={setFilteredRegistrations}
                                />
                                <Box mt={4}>
                                    <DataTable
                                        md={[4, 2, 2, 2, 2]}
                                        sm={[3, 2, 2, 2, 3]}
                                        xs={[3, 2, 1.5, 1.5, 4]}
                                        head={['Nome', 'CPF', 'Telefone', 'Email']}
                                        columns={[
                                            (row) => row.fullName,
                                            (row) => `${row.cpf.slice(0, 3)}.${row.cpf.slice(3, 6)}.${row.cpf.slice(6, 9)}-${row.cpf.slice(9)}`,
                                            (row) => `(${row.phone.slice(0, 2)}) ${row.phone.slice(2, 7)}-${row.phone.slice(7)}`,
                                            (row) => row.email
                                        ]}
                                        body={filteredRegistrations}
                                        onAdd={() => setOpenDialog(true)}
                                        actions={[
                                            {
                                                func: (id) => console.log(`eye ${id}`),
                                                icon: <VisibilityIcon />
                                            },
                                            {
                                                func: (id) => console.log(`edit ${id}`),
                                                icon: <EditIcon />
                                            },
                                        ]}
                                        emptyText='Nenhum paciente cadastrado'
                                    />
                                </Box>
                            </>
                        )}

                        {/** Dialog */}
                        <AddRegister
                            openDialog={openDialog}
                            handleClose={handleClose}
                            setRegisterCreated={setRegisterCreated}
                        />

                    </Box>
                </StyledEngineProvider>
            </CacheProvider>
        </ThemeProvider>

    );

}

export default Registrations;