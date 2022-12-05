import {useEffect, useContext} from 'react'
import axios from 'axios'
import {UserContext} from '../context/UserContextProvider'
import {useNavigate} from 'react-router-dom'
import Banner from '../components/Banner'
import NavBar from '../components/NavBar'

const Dashboard = ({setLoggedIn}) => {
    const {state,dispatch} = useContext(UserContext);
    const navigate = useNavigate()

    const name = `${state.user?.user?.firstName?.charAt(0).toUpperCase()}${state.user?.user?.firstName?.slice(1)}`

    useEffect( ()=> {
        if(!state.user) {
            navigate("/home")
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.user])

    useEffect(()=>{
        axios.post('http://localhost:8000/api/users/isLoggedIn', {}, {withCredentials:true})
        .then((user)=>{
            console.log(user.data)
            dispatch({
            type:"SET_USER",
            payload:user.data
            })
            setLoggedIn(true)
        })
        .catch((err)=>{
            console.log(err.response.data)
            dispatch({
            type:"NULL_USER",
        })
        })
      // eslint-disable-next-line react-hooks/exhaustive-deps
        },[])

    return (
        <>
            <NavBar/>
            <Banner/>
            <h1 className="dashboardTitle text-7xl ml-2 text-center">What would you like to do</h1>
            <h1 className="dashboardName text-7xl ml-2 text-center">{name}?</h1>
            <div className="mt-10 columns-2 h-2/4">
                <div className="overflow-hidden parties">
                    <div className="p-6 m-auto lg:max-w-xs">
                        <h2 className="text-3xl text-center font-bold mb-3" >Check out your parties!</h2>
                        <button className="mb-2 w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 font-bold py-1 px-4 rounded-full">
                            Group 1
                        </button>
                        <button className="mb-2 w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 font-bold py-1 px-4 rounded-full">
                            Group 2
                        </button>
                        <button className="mb-2 w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 font-bold py-1 px-4 rounded-full">
                            Group 3
                        </button>
                        <button className="mb-2 w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 font-bold py-1 px-4 rounded-full">
                            Group 4
                        </button>
                        <button className="mb-2 w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 font-bold py-1 px-4 rounded-full">
                            Group 5
                        </button>
                        <button className="mb-2 w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 font-bold py-1 px-4 rounded-full">
                            Group 6
                        </button>
                        <button className="mb-2 w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 font-bold py-1 px-4 rounded-full">
                            Group 7
                        </button>
                        
                    </div>
                </div>
                <div>
                    <div className="p-5 m-auto bg-white rounded-md shadow-xl shadow-rose-600/40 ring-2 ring-indigo-600 lg:max-w-xl">
                        <button className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 font-bold py-1 px-4 rounded-full"
                        onClick= {()=>navigate("/party/new")} 
                        >
                            Organize New Party!
                        </button>
                        <button className="mt-5 w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 font-bold py-1 px-4 rounded-full">
                            Join a party!
                        </button>
                        <button className="mt-5 w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 font-bold py-1 px-4 rounded-full">
                            Check out your wishlist!
                        </button>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Dashboard