import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home.jsx'
import Footer from './components/Footer'
import Login from './components/Login'
import ExplorarCreadores from './components/ExplorarCreadores'
import Perfil from './components/Perfil'
import CrearCuenta from './components/CrearCuenta'
import { UserProvider } from './context/UserContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <UserProvider>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/iniciarsesion' element={<Login />} />
        <Route path='/perfil' element={<ExplorarCreadores />} />
        <Route path='/perfil/:username' element={<Perfil />} />
        <Route path='/crearcuenta' element={<CrearCuenta />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </UserProvider>
)
