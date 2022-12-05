import {useState, useEffect, useContext} from 'react'
import Banner from '../components/Banner'
import NavBar from '../components/NavBar'
import PartyForm from '../components/PartyForm'
import {useNavigate} from 'react-router-dom'
import {UserContext} from '../context/UserContextProvider'

const ViewPartyForm = () => {
  const {state,dispatch} = useContext(UserContext);
  const navigate = useNavigate()
  

  useEffect( ()=> {
    if(!state.user) {
        navigate("/home")
    }
// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
        <NavBar/>
        <Banner/>
        <h1 className="dashboardTitle text-7xl ml-2 text-center">Party Time!</h1>
        <PartyForm/>
    </>
  )
}

export default ViewPartyForm