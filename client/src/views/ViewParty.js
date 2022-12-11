import {useEffect,useState} from 'react'
import {useParams,useNavigate} from 'react-router-dom'
import axios from 'axios'
import Banner from '../components/Banner'
import NavBar from '../components/NavBar'
import Video from '../assets/video.mp4'

const ViewParty = ({state}) => {
    const [party,setParty] = useState({})
    const {id} = useParams()
    const navigate = useNavigate()
    const [date, setDate] = useState("")
    // const [myEmail, setMyEmail] = useState("")
    const [members, setMembers] = useState([])

    const stateId = state.user?.user?.id

    useEffect( ()=> {
        if(!state) {
            navigate("/home")
        } else {
            axios.get('http://localhost:8000/api/users/' + stateId, {withCredentials:true} )
            .then(res => {
                console.log("Logged In User's Email: ", res.data.email)
                // setMyEmail(res.data.email)
                shuffleMembers(members)
            })
            .catch((err)=> {
                console.log(err);
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state])

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/party/${id}`,{withCredentials:true})
        .then((res)=>{
            console.log(res)
            // window.scrollTo(0, 0)
            setParty(res.data)
            const newDate = new Date(res.data.date).toLocaleDateString() 
            let [month, day, year] = newDate.split('/');
            day++
            setDate([month, day, year].join("/"))
            setMembers([...res.data.members])
            shuffleMembers(members)
        })
        .catch((err)=>{
            console.log(err)
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const handleDelete=()=>{
        axios.delete(`http://localhost:8000/api/party/${id}`,{withCredentials:true})
        .then((res)=>{
            console.log(res)
            navigate('/dashboard')
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    const shuffleMembers= (array) => {
        let currentIndex = members.length
        // While there remain elements to shuffle.
        while (currentIndex !== 0) {
          // Pick a remaining element.
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
          // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
        return array;
    }

    const setSecretSantas = () => {
        console.log("Attempting to assign secret santas")
        const newParty = {...party}
        console.log("Current Party: ", newParty)
        const allMembers = [...party.members]
        shuffleMembers(allMembers)
        console.log("Shuffled Member Emails: ", allMembers)
        for(var i = 0; i < allMembers.length; i++) {
            if(i + 1 < allMembers.length) {
                allMembers[i].secretSanta = allMembers[i + 1].name 
            } else {
                allMembers[i].secretSanta = allMembers[0].name
            }
        }
        console.log("Members with their Secret Santas: ", allMembers)

        let shuffledParty = {...party}
        shuffledParty.members = allMembers
        console.log("New Party: ", shuffledParty)

        const newInput = {...shuffledParty}
        delete newInput._id
        console.log("NewInput without id: ", newInput)

        axios.put(`http://localhost:8000/api/party/${id}`, newInput , {withCredentials:true})
            .then((res) => {
                console.log(res.data);
                navigate(`/dashboard`);
            })
            .catch((err) => {
                console.log("Error in shuffle update: ", err.response.data);
            });
        };

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};

    return (
        <>
            <NavBar/>
            <Banner/>
            <div>
                <video autoPlay loop muted className="partyBackground" poster={Video}>
                    <source src={Video} type="video/mp4" />
                        Your browser does not support the video tag.
                </video>
                <h1 className="partyTitle capitalize">"{party.title}"</h1>
                <div className="w-full min-h-screen overflow-hidden relative">
                    <div className="text-center p-6 m-auto mt-10 bg-white rounded-md shadow-xl shadow-rose-600/40 ring-2 ring-indigo-600 lg:max-w-lg">
                        <h1 className="text-3xl font-semibold text-center text-indigo-700 uppercase">
                            'TIS THE SEASON FOR
                        </h1>
                        <p className="text-3xl font-semibold text-indigo-700 uppercase">
                            SECRET SANTA!
                        </p>
                        <h1 className="mt-10 text-2xl">
                            Join the party
                        </h1>
                        <h1 className="mt-1 text-2xl">
                            {new Date(date).toLocaleDateString('en-US', options)}
                        </h1>
                        <h1 className="mt-5 text-2xl dashboardName">
                            hosted at
                        </h1>
                        <h1 className="text-2xl capitalize">
                            {party.location}
                        </h1>
                        <h1 className="mt-10 text-2xl">
                            Members:
                        </h1>
                        <div className="columns-2 flex justify-around flex-wrap gap-2">
                            {
                                shuffleMembers(members).map((member, idx)=>(
                                    <div key={idx}>
                                        <button key={idx} className="dashboardTitle block capitalize mx-auto mt-5 w-4/8 text-2xl bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 font-bold py-1 px-4 rounded-full" 
                                        onClick= {()=>navigate(`/party/${party._id}/${member._id}`)}>
                                        {member.name}
                                        </button>
                                    </div>
                                ))
                            }
                        </div>
                        <h1 className="mt-10 text-2xl">
                            Gift Exchange Budget ${party.budget}
                        </h1>
                        <button   className="mt-10 capitalize mb-2 w-1/8 bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 font-bold py-1 px-4 rounded-full" onClick={() => navigate("/dashboard")}>Back to Dashboard</button>
                        {
                            party.createdBy === state.user?.user?.id && 
                            <>
                                <button onClick={setSecretSantas} className="capitalize block mx-auto mt-5 text-xs cursor-pointer text-center w-40 hover:text-blue-700 text-gray-500 font-semibold py-1 px-2">
                                    Draw names!
                                </button>
                                <button onClick={() => navigate(`/party/${party._id}/edit`)} className="block mx-auto mt-2 text-xs cursor-pointer text-center w-40 hover:text-blue-700 text-gray-500 font-semibold py-1 px-2">
                                    Edit Party
                                </button>
                                <button onClick={handleDelete} className="block mx-auto mt-2 text-xs cursor-pointer text-center w-40 hover:text-blue-700 text-gray-500 font-semibold py-1 px-2">
                                    Cancel Party
                                </button>
                            </>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewParty