import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import { Login } from '@/presentation/pages'
import Login from '@/presentation/pages/login/login'

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
