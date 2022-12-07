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

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/party/${id}`,{withCredentials:true})
        .then((res)=>{
            console.log(res)
            setParty(res.data)
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
    
    return (
        <>
            <NavBar/>
            <Banner/>
            <div>
                {/* <img src="https://images.pexels.com/photos/6102006/pexels-photo-6102006.jpeg" className="partyBackground" alt="background" /> */}
                <video autoPlay loop muted className="partyBackground" poster={Video}>
                    <source src={Video} type="video/mp4" />
                        Your browser does not support the video tag.
                </video>
                <h1 className="partyTitle capitalize">"{party.title}"</h1>
                {/* <div>
                    {party.title}
                    {(new Date(party.date)).toLocaleDateString()}
                    {party.location}
                    {party.budget}
                    {
                        party.members?.map((member, idx)=>(
                        <h2 key={idx}>
                        {console.log(member)}
                        Email: {member.email}
                        Name: {member.name}
                        ID: {member._id}
                        </h2>
                        ))
                    }
                </div> */}
                <div className="w-full min-h-screen overflow-hidden relative">
                    <div className="text-center p-6 m-auto mt-10 bg-white rounded-md shadow-xl shadow-rose-600/40 ring-2 ring-indigo-600 lg:max-w-lg">
                        <h1 className="text-3xl font-semibold text-center text-indigo-700 uppercase">
                            'TIS THE SEASON FOR
                        </h1>
                            <p className="text-3xl font-semibold text-indigo-700 uppercase">
                                SECRET SANTA!
                            </p>
                            {/* <p className="mt-4 text-7xl font-semibold welcome">
                                "{party.title}"
                            </p> */}
                        <h1 className="mt-10 text-2xl">
                            Join the party
                        </h1>
                        <h1 className="mt-1 text-2xl">
                            {(new Date(party.date)).toLocaleDateString()}
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
                                party.members?.map((member, idx)=>(
                                <button key={idx} className="dashboardTitle block capitalize mx-auto mt-5 w-4/8 text-2xl bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 font-bold py-1 px-4 rounded-full" 
                                onClick= {()=>navigate(`/party/${party._id}/${member._id}`)}>
                                {member.name}
                                </button>
                                ))
                            }
                        </div>
                        <h1 className="mt-10 text-2xl">
                            Gift Exchange Budget ${party.budget}
                        </h1>
                        
                        <button   className="mt-20 capitalize mb-2 w-1/8 bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 font-bold py-1 px-4 rounded-full" onClick={() => navigate("/dashboard")}>Back to Dashboard</button>
                        {
                            party.createdBy === state.user?.user?.id && 
                            <>
                                <button onClick={() => navigate(`/party/${party._id}/edit`)} className="block mx-auto mt-1 text-xs cursor-pointer text-center w-40 hover:text-blue-700 text-gray-500 font-semibold py-1 px-2">
                                    Edit Party
                                </button>
                                <button onClick={handleDelete} className="block mx-auto mt-1 mb-5 text-xs cursor-pointer text-center w-40 hover:text-blue-700 text-gray-500 font-semibold py-1 px-2">
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