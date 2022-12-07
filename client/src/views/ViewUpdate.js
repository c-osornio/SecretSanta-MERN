import {useState, useEffect, useContext} from 'react'
import Banner from '../components/Banner'
import NavBar from '../components/NavBar'
import {useNavigate} from 'react-router-dom'
import UpdateParty from '../components/UpdateParty'

const ViewUpdate = ({state}) => {
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
            <UpdateParty state={state}/>
        </>
    )
}

export default ViewUpdate