import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Layout from './components/ui/Layout'
import Info from './pages/Info'

function App() {

  return (
    <>
      <Layout>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />

          <Route path='/' element={<Home />} />
          <Route path='/info/:id' element={<Info />} />
        </Routes>
      </Layout>
    </>
  )
}

export default App
