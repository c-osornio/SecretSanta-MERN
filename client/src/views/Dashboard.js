import {useEffect, useContext, useState} from 'react'
import axios from 'axios'
import {UserContext} from '../context/UserContextProvider'
import {useNavigate} from 'react-router-dom'
import Banner from '../components/Banner'
import NavBar from '../components/NavBar'
import dateFormat from 'dateformat';

const Dashboard = ({setLoggedIn, state, dispatch}) => {
    const navigate = useNavigate()
    const [myParties, setMyParties] = useState([])
    const [myEmail, setMyEmail] = useState("")
    const id = state.user?.user?.id

    useEffect( ()=> {
        if(!state) {
            navigate("/home")
        } else {
            axios.get('http://localhost:8000/api/users/' + id, {withCredentials:true} )
            .then(res => {
                console.log("Logged In User's Email: ", res.data.email)
                setMyEmail(res.data.email)
            })
            .catch((err)=> {
                console.log(err);
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state])

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

    useEffect(()=>{
        axios.get('http://localhost:8000/api/parties', {}, {withCredentials:true})
        .then((res)=> {
            console.log("All Parties: ", res.data)
            const parties = res.data.filter(party=>{
                console.log("All Party's Memebers: ", party.members)
                return party.members.some((member)=> {
                    return member.email === myEmail
                })
            })
            console.log("My Parties: ", parties)
            setMyParties(parties)
        })
        .catch((err)=>{
            console.log(err.response)
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state, myEmail])


    const changeDateFormat=(date)=>{
        const newDate = new Date(date).toLocaleDateString() 
        let [month, day, year] = newDate.split('/');
        // console.log("Month:", month)
        // console.log("Year: ", year)
        day++
        // console.log("Month:", typeof month)
        // console.log("Day:", typeof day)
        // console.log("Year: ", typeof year)
        if(day > 31 && month === "12") {
            month = "1"
            day = 1
            year ++
        }
        if(day > 31 && month !== "12") {
            month++
            day =1
        }
        if(day === 31 && (month === "9" || month === "4" || month === "6" || month === "11")) {
            day = 1
            month++
        }
        if(month === "2" && day > 28) {
            day = 1
            month = "3"
        }
        if(day < 10) {
            day = ('0' + day).slice(-2)
            Number(day)
        }
        if(month < 10) {
            month = ('0' + month).slice(-2)
        }
        return [month, day, year].join("/");
    }

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};

    return (
        <>
            <NavBar/>
            <Banner/>
            <h1 className="dashboardTitle text-7xl ml-2 text-center capitalize">Welcome {state.user?.user?.firstName}!</h1>
            <div className="mt-10 h-3/4 ">
                <div className="overflow-hidden parties">
                    <div className="p-6 m-auto lg:max-w-xl">
                        {
                            myParties.length < 1 ? 
                            <div className="p-5 m-auto bg-white rounded-md shadow-xl shadow-rose-600/40 ring-2 ring-indigo-600 lg:max-w-xl">
                                <h2 className="text-3xl text-center font-bold mb-3" >Organize a party today!</h2>
                                <button className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 font-bold py-1 px-4 rounded-full"
                                onClick= {()=>navigate("/party/new")} 
                                >
                                Organize New Party!
                                </button>
                            </div>
                            :
                            <h2 className="text-2xl text-center font-bold mb-5" >Check out your current parties!</h2>
                        }
                        
                        {
                            myParties && 
                            myParties.map((item, idx) => (
                                <div className="mb-5 p-5 m-auto bg-white rounded-md shadow-xl shadow-rose-600/40 ring-2 ring-indigo-600 lg:max-w-xl" key={idx}>
                                    <button key={idx} onClick= {()=>navigate(`/party/${item._id}`)}  className="capitalize mb-2 w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 font-bold py-1 px-4 rounded-full">
                                        - {item.title} -
                                    <span className=" block capitalized">
                                        {
                                            changeDateFormat(new Date(item.date).toLocaleDateString('en-US', options) )
                                        }
                                        </span>
                                    </button>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>

        </>
    )
}

export default Dashboard