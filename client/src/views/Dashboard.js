import {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import {UserContext} from '../context/UserContextProvider'
import {useNavigate} from 'react-router-dom'
import Banner from '../components/Banner'
import NavBar from '../components/NavBar'

const Dashboard = () => {
    const [users,setUsers] = useState([])
    const {state,dispatch} = useContext(UserContext);
    const navigate = useNavigate()

    useEffect( ()=> {
        !state.user && navigate("/home")
        axios.get('http://localhost:8000/api/users',{withCredentials:true})
        .then((res)=>{
            console.log("Updated current state:", state)
            setUsers(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <NavBar/>
            <Banner/>
            <div>You are loged in!</div>
            {
                users.map((item,idx)=>(
                    <div key={idx}>
                        <h4>{item.firstName}</h4>
                    </div>
                ))
            }
        </>
    )
}

export default Dashboard