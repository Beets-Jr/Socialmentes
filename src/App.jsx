import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './Components/Header/Header'
import Login from "./Components/Login/Login"
import Sidebar from "./Components/Sidebar/Sidebar"
import DialogConfirmation from "./Components/ElementsInterface/DialogConfirmation"

function App() {

  return (
    <Router>
        <Header title="Pacientes Cadastrados"/>
        <Routes>
          <Route path='/' element={<DialogConfirmation />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/conta' element={<Sidebar />}/>
        </Routes>
    </Router>   
  )
}

export default App