import Registrations from "./Components/Registrations/Registrations"
import Positions from "./Components/Positions/Positions"
import Login from "./Components/Login/Login"
import DialogConfirmation from "./Components/ElementsInterface/DialogConfirmation"
import Sidebar from "./Components/Sidebar/Sidebar"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {

  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Sidebar/>
        <Routes>
          <Route path="/" element={<DialogConfirmation />}/>
          <Route path="/pacientes" element={<DialogConfirmation />}/>
          <Route path="/cargos" element={<Positions />}/>
          <Route path="/cadastros" element={<Registrations />}/>
          <Route path="/opcoes" element={<Login />}/>
        </Routes>
      </div> 
    </Router>
  )
}

export default App