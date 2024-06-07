import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes, redirect } from 'react-router-dom'
import Home from './components/Home.jsx'
import Footer from './components/Footer'
import Login from './components/Login'
import ExplorarCreadores from './components/ExplorarCreadores'
import Perfil from './components/Perfil'
import CrearCuenta from './components/CrearCuenta'
import { UserProvider } from './context/UserContext'
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Auth0Provider
    domain='https://matesito-production.up.railway.app/'
    clientId='djad929@Elawdkwa9@'
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
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
  </Auth0Provider>
)
