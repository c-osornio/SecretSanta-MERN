import {useEffect,useState} from 'react'
import {useParams,useNavigate} from 'react-router-dom'
import axios from 'axios'
import Banner from '../components/Banner'
import NavBar from '../components/NavBar'
import Video from '../assets/video.mp4'
import Secret from '../assets/secret.png'

const ViewSecret = ({state}) => {
    const [party,setParty] = useState({})
    const [member, setMember] = useState({})
    const {id, memberId} = useParams()
    const navigate = useNavigate()
    const [myEmail, setMyEmail] = useState("")
    const [secret, setSecret] = useState("")
    const [index, setIndex] = useState(0)
    const [allMembers, setAllMembers] = useState([])

    const stateId = state.user?.user?.id

    useEffect( ()=> {
        if(!state) {
            navigate("/home")
        } else {
            axios.get('http://localhost:8000/api/users/' + stateId, {withCredentials:true} )
            .then(res => {
                // console.log("Logged In User's Email: ", res.data.email)
                setMyEmail(res.data.email)
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
                // console.log("Party Members: ", res.data.members)
                setParty(res.data)
                const thisMember = res.data.members.filter(member=>{
                    // console.log("All member's ids: ", member._id)
                    return member._id === memberId
                })
                // console.log("This Member: ", thisMember[0])
                setMember(thisMember[0])
            })
            .catch((err)=>{
                console.log(err)
            })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[] )

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
                    <div className="text-center p-6 m-auto mt-10 bg-white rounded-md shadow-xl shadow-rose-600/40 ring-2 ring-indigo-600 lg:max-w-3xl">
                        <h1 className="mb-3 text-3xl font-semibold text-center text-indigo-700 uppercase">
                            Shhhhhhh...... Your Secret Santa
                        </h1>
                        <h1 className="mb-20 text-3xl font-semibold text-center text-indigo-700 uppercase">
                            for {party.title} Is.....
                        </h1>
                        {
                            member.secretSanta ?
                            <div className="columns-2 justify-center flex gap-10">
                                <h1 className="mt-5 text-8xl font-semibold text-center dashboardTitle">{member.secretSanta}</h1>
                                <br/>
                                <img src={Secret} className="santa" alt="secret santa"/>
                            </div>
                            :
                            <h1 className="mt-5 text-8xl font-semibold text-center dashboardTitle">Pending...</h1>
                        }
                        <button   className="mt-20 capitalize mb-2 w-1/8 bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 font-bold py-1 px-4 rounded-full" onClick={() => navigate(`/party/${id}/${memberId}`)}>Go back to homepage</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewSecret