import { useContext, useEffect, useState } from "react";

import { Box, CircularProgress, StyledEngineProvider, ThemeProvider, useMediaQuery } from "@mui/material";
import { CacheProvider } from "@emotion/react";
import createCache from '@emotion/cache';

import { AppContext } from "../../../Contexts/AppContext";
import { UserService } from '../../../Services';
import { theme } from "../../../Components/PainelAdm/Registrations/theme";
import { VisibilityIcon } from "../../../Assets/Icons/VisibilityIcon";
import { EditIcon } from "../../../Assets/Icons/EditIcon";
import AddRegister from "../../../Components/PainelAdm/Registrations/AddRegister";
import SearchField from "../../../Components/ElementsInterface/SearchField/SearchField";
import DataTable from "../../../Components/ElementsInterface/DataTable/DataTable";
import DialogConfirmation from '../../../Components/PainelAdm//Patients/DialogConfirmation';

import styles from './Registrations.module.css';
import { DeleteOutlineRounded } from "@mui/icons-material";

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
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [idRegister, setIdRegister] = useState();
    const [message, setMessage] = useState();
    const [deleted, setDeleted] = useState(0);

    const isMobile = useMediaQuery('(max-width:700px)');

    // atualiza a lista de registros
    useEffect(() => {
        UserService.getAllUsers()
            .then((patients) => {
                setIsLoading(false);
                setRegistrations(patients);
                setFilteredRegistrations(patients);
                setValue(patients.length);
            });
    }, [registerCreated || deleted]);

    useEffect(() => {
        if (!message) {
            setConfirmDialogOpen(false);
        }
    }, [message]);

    // trata o fechamento do Dialog
    const handleClose = () => {
        setOpenDialog(false);
    }

    const deleteRegister = async () => {
        try {
            const resp = await UserService.deleteUserById(idRegister);
            if (resp instanceof Error) {
                setMessage("Erro ao tentar remover profissional.");
            } else {
                setMessage("Profissional removido com sucesso.");
                setDeleted(value => value + 1);
            }
        } catch (error) {
            console.log("Erro ao deletar profissional: ", error);
        }
    };

    return (

        <ThemeProvider theme={theme}>
            <CacheProvider value={cache}>
                <StyledEngineProvider injectFirst >

                    <Box className={styles.container_registrations}>

                        {isLoading ? (
                            <Box className={styles.container_empty}>
                                <CircularProgress />
                            </Box>
                        ) : (
                            <>
                                <SearchField
                                    placeholder="Pesquisar paciente"
                                    data={registrations}
                                    getValue={(row) => row.fullName}
                                    setFilteredData={setFilteredRegistrations}
                                    onAdd={() => setOpenDialog(true)}
                                    isMobile={isMobile}
                                />
                                <Box mt={4}>
                                    <DataTable
                                        md={[4, 2, 2, 2, 2]}
                                        sm={[3, 2, 2, 2, 3]}
                                        head={['Nome', 'CPF', 'Telefone', 'Email']}
                                        columns={[
                                            {
                                                func: (row) => row.fullName,
                                                style: { fontWeight: 600 }
                                            },
                                            {
                                                func: (row) =>
                                                    row.cpf && row.cpf.length === 11
                                                        ? `${row.cpf.slice(0, 3)}.${row.cpf.slice(3, 6)}.${row.cpf.slice(6, 9)}-${row.cpf.slice(9)}`
                                                        : (row.cpf ? row.cpf : "-"),
                                            },
                                            {
                                                func: (row) =>
                                                    row.phone && row.phone.length === 11
                                                        ? `(${row.phone.slice(0, 2)}) ${row.phone.slice(2, 7)}-${row.phone.slice(7)}`
                                                        : (row.phone ? row.phone : "-"),
                                            },
                                            {
                                                func: (row) => row.email
                                            }
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
                                            {
                                                func: (id) => {
                                                    setConfirmDialogOpen(true);
                                                    setIdRegister(id);
                                                },
                                                icon: <DeleteOutlineRounded/>
                                            },
                                        ]}
                                        emptyText='Nenhum paciente cadastrado'
                                        isMobile={isMobile}
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

                        <DialogConfirmation
                            open={confirmDialogOpen}
                            onClose={()=> {
                                setConfirmDialogOpen(false);
                                setIdRegister(null);
                            }}
                            onConfirm={() => deleteRegister()}
                            message={message}
                            setMessage={setMessage}
                            title="Remover profissional"
                            text="Você tem certeza que deseja remover o profissional?"
                        />

                    </Box>
                </StyledEngineProvider>
            </CacheProvider>
        </ThemeProvider>

    );

}

export default Registrations;