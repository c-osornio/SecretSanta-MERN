import {useState, useEffect, useContext} from 'react'
import Banner from '../components/Banner'
import NavBar from '../components/NavBar'
import PartyForm from '../components/PartyForm'
import {useNavigate} from 'react-router-dom'
import {UserContext} from '../context/UserContextProvider'

const ViewPartyForm = ({state}) => {
  // const {state,dispatch} = useContext(UserContext);
  const navigate = useNavigate()
  

  useEffect( ()=> {
    if(!state) {
        navigate("/home")
    }
// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])

  return (
    <>
        <NavBar/>
        <Banner/>
        <h1 className="dashboardTitle text-7xl ml-2 text-center">Plan a party!</h1>
        <PartyForm state={state}/>
    </>
  )
}

export default ViewPartyForm