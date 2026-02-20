import { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from './pages/Login'
import './App.css'
import Register from './pages/Register';
import Home from './pages/Home';

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  }

  return (

    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/login" element={<Login showAlert={showAlert} />} />
          <Route path="/register" element={<Register showAlert={showAlert} />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
