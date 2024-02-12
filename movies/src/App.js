import React, { Fragment, useEffect } from 'react'
import Header from './components/Header'
import HomePage from './components/HomePage'
import Movies from './components/Movies/Movies'
import Admin from './components/Auth/Admin'
import Auth from './components/Auth/Auth'
import { Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { adminActions, userActions } from './store'
import Booking from './components/Bookings/booking'
import UserProfile from './profile/UserProfile'
import AddMovie from './components/Movies/AddMovie'
import AdminProfile from './profile/AdminProfile'

function App() {
  const dispatch =useDispatch()
  const isAdminLoggedIn = useSelector((state)=> state.admin.isLoggedIn);
  const isUserLoggedIn = useSelector((state)=> state.user.isLoggedIn);
  console.log("isAdminLoggedIn", isAdminLoggedIn )
  console.log("isUserLoggedIn", isUserLoggedIn)
  useEffect(() =>{
  if (localStorage.getItem("userId")){
    dispatch(userActions.login());
  } else if (localStorage.getItem("adminId")){
    dispatch(adminActions.login());
  }

  })

  return (
    <div>
      <Header />
      <section>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/movies" element={<Movies />}></Route>
         {!isUserLoggedIn && !isAdminLoggedIn && (
          <Fragment>
          {" "}
         <Route path="/admin" element={<Admin />}></Route>
          <Route path="/auth" element={<Auth />}></Route>
          </Fragment>
          )} 
          {isUserLoggedIn && !isAdminLoggedIn && (
          <Fragment>
          {" "}
          <Route path="/booking/:id" element={<Booking />}></Route>
          <Route path="/user" element={<UserProfile />}></Route>
          </Fragment>
          )} 
          {/* {isAdminLoggedIn && !isUserLoggedIn && (
          <Fragment>
          {" "} */}
          <Route path="/add" element={<AddMovie />}></Route>
          <Route path="/user-admin" element={<AdminProfile />}></Route>
          {/* {" "}
          </Fragment>
          )}  */}
        </Routes>
      </section>
    </div>
    
  )
}

export default App