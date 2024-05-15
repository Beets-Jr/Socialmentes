import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from "./Routes/AppRoutes"

function App() {
  return (
    <Router>
      <AppRoutes/>
    </Router>
    
  )
}

export default App