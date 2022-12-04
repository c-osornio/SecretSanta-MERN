import React from 'react'
import Banner from '../components/Banner'
import NavBar from '../components/NavBar'
import PartyForm from '../components/PartyForm'

const ViewPartyForm = () => {
  
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