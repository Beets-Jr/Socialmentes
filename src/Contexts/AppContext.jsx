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

    const getSwitchPath = (pathname) => {
      if (pathname.startsWith('/painel-psi/pacientes/informacoes/')) {
        return '/painel-psi/pacientes/informacoes';
      } else if (pathname.startsWith('/painel-psi/pacientes/teste/')) {
        return '/painel-psi/pacientes/teste/';
      } else if (pathname.startsWith('/painel-adm/pacientes/editar-paciente')) {
        return '/painel-adm/pacientes/editar-paciente'
      } else if (pathname.startsWith('/painel-psi/checklist/grafico')) {
        return '/painel-psi/checklist/grafico';
      } else if (pathname.startsWith('/painel-psi/checklist/tabela')) {
        return '/painel-psi/checklist/tabela';
      } else if (pathname.startsWith('/painel-psi/checklist/acompanhar-intervencao')) {
        return '/painel-psi/checklist/acompanhar-intervencao';
      }
      else {
        return pathname;
      }
    };

    switch (getSwitchPath(pathname)) {
      case '/painel-psi/pacientes/informacoes':
        setTitle('Pacientes Cadastrados');
        setSubtitle('');
        break;
      case '/painel-psi/pacientes/teste/':
        setTitle('Criar Teste');
        setSubtitle('');
        break;
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
        setSubtitle(value ? `${value} pacientes cadastrados` : '');
        break;
      case '/painel-psi/pacientes':
        setTitle(value ? 'Pacientes' : 'Pacientes cadastrados');
        setSubtitle(value ? `${value} pacientes cadastrados` : '');
        break;
      case '/painel-adm/pacientes/cadastro':
        setTitle('Pacientes - Cadastro');
        setSubtitle('');
        break;
      case '/painel-adm/pacientes/editar-paciente':
        setTitle('Pacientes - Editar');
        setSubtitle('');
        break;
      case '/painel-psi/home':
        setTitle('Home');
        setSubtitle('');
        break;
      case '/painel-psi/relatorios':
        setTitle('Relatórios');
        setSubtitle(value ? `${value} relatórios cadastrados` : '');
        break;
      case '/painel-psi/checklist':
        setTitle('Relatórios');
        setSubtitle('');
        break;
      case '/painel-psi/checklist/tabela':
        setTitle('Resultados');
        setSubtitle('');
        break;
      case '/painel-psi/checklist/grafico':
        setTitle('Gráfico');
        setSubtitle('');
        break;
      case '/painel-psi/checklist/acompanhar-intervencao':
        setTitle('Plano de Intervenção');
        setSubtitle('');
        break;
      case '/painel-psi/instrumentos':
        setTitle('Instrumentos');
        setSubtitle('');
        break;
      default:
        setTitle('Insira seu Titulo Aqui');
        setSubtitle('');
        break;
    }
  }, [location, value]);

  return <AppContext.Provider value={{ title, subtitle, setValue, open, setOpen }}>{children}</AppContext.Provider>
}
