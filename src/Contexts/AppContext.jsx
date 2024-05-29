import { createContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

export const AppContext = createContext();

// eslint-disable-next-line react/prop-types
export const AppStorage = ({ children }) => {
    const [title, setTitle] = useState('');
    const [open, setOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const { pathname } = location;
        switch (pathname) {
          case '/cargos':
            setTitle('Gerenciar Cargos');
            break;
          case '/cadastros':
            setTitle('Gerenciar Cadastros');
            break;
          default:
            setTitle('Insira seu Titulo Aqui');
            
        }
      }, [location]);

    return <AppContext.Provider value={{title, open, setOpen}}>{children}</AppContext.Provider>
}