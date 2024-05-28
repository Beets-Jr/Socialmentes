import Header from './Components/Header/Header'
import { UserStorage, UserContext } from './Contexts/UserContext'
import Login from "./Components/Login/Login"
import Sidebar from "./Components/Sidebar/Sidebar"
import DialogConfirmation from "./Components/ElementsInterface/DialogConfirmation"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <Router>
      <UserStorage>
          <Header title="Pacientes Cadastrados"/>
          <Routes>
            <Route path='/' element={<DialogConfirmation />}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/conta' element={<Sidebar />}/>
          </Routes>
      </UserStorage>
    </Router>   
  )
}

export default App