import { createContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

export const UserContext = createContext();

// eslint-disable-next-line react/prop-types
export const UserStorage = ({ children }) => {
    const [title, setTitle] = useState('');
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

    return <UserContext.Provider value={{title}}>{children}</UserContext.Provider>
}