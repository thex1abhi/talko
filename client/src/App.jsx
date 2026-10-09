import { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import axios from 'axios'
import ProtectedRoutes from './Components/ProtectedRoutes'
import NavBar from './Components/NavBar'
import Builder from './pages/Builder'
import Billing from './pages/Billing'
import  { Toaster } from 'react-hot-toast';

export const ServerUrl = "http://localhost:8000"


function App() {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    const fetchMe = async () => {
      try {
        const res = await axios.get(ServerUrl + "/api/user/current-user", { withCredentials: true })

        setUser(res.data)
        console.log(res.data);
        setLoading(false)

      } catch (error) {
        console.log(error);
        setLoading(false)
      }
    }
    fetchMe()
  }, []);


  return (
    <>
      <Toaster position='top-right' />
      <Routes>

        <Route path='/login' element={<Login setUser={setUser} />} />
        <Route path='/*' element={<ProtectedRoutes user={user} loading={loading} >
          <NavBar setUser={setUser} user={user} />
          <Routes >
            <Route path='/' element={<Home user={user} />} />
            <Route path='/builder' element={<Builder user={user} setUser={setUser} />} />
            <Route path='/billing' element={<Billing user={user} />} />
            <Route path='*' element={<Navigate to="/" replace />} />
          </Routes>
        </ProtectedRoutes>} />
      </Routes>
    </>
  )
}

export default App
