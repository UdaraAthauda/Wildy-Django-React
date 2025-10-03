import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Layout from './components/ui/Layout'

function App() {

  return (
    <>
      <Layout>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />

          <Route path='/' element={<Home />} />
        </Routes>
      </Layout>
    </>
  )
}

export default App
