import { createContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

export const AppContext = createContext();

// eslint-disable-next-line react/prop-types
export const AppStorage = ({ children }) => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [value, setValue] = useState();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const { pathname } = location;
    if (pathname.startsWith('/painel-psi/pacientes/informacoes/')) {
      setTitle('Pacientes Cadastrados');
      setSubtitle('');
    } else if (pathname.startsWith('/painel-psi/pacientes/teste/')) {
      setTitle('Criar Teste');
      setSubtitle('');
    } else {
      switch (pathname) {
        case '/painel-adm/cargos':
          setTitle('Gerenciar Cargos');
          setSubtitle('');
          break;
        case '/painel-adm/cadastros':
          setTitle('Gerenciar Cadastros');
          setSubtitle('');
          break;
        case '/painel-adm/pacientes':
          setTitle(value ? 'Pacientes' : 'Pacientes cadastrados');
          setSubtitle(value ? `${value} pacientes cadastrados` : '')
          break;
        case '/painel-psi/pacientes':
          setTitle(value ? 'Pacientes' : 'Pacientes cadastrados');
          setSubtitle(value ? `${value} pacientes cadastrados` : '')
        break;
        default:
          setTitle('Insira seu Titulo Aqui');
          setSubtitle('');
      }
    }
  }, [location, value]);

  return <AppContext.Provider value={{ title, subtitle, setValue, open, setOpen }}>{children}</AppContext.Provider>
}
