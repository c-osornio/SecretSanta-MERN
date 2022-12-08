import {useEffect,useState} from 'react'
import {useParams,useNavigate} from 'react-router-dom'
import axios from 'axios'
import Banner from '../components/Banner'
import NavBar from '../components/NavBar'
import Video from '../assets/video.mp4'
import WishList from '../components/WishList'
import EditWishList from '../components/EditWishList'

const ViewWishList = ({state}) => {
    const [party,setParty] = useState({})
    const [member, setMember] = useState({})
    const {id, memberId} = useParams()
    const navigate = useNavigate()
    const [myEmail, setMyEmail] = useState("")
    const [myWishlist, setWishlist] = useState([])

    const stateId = state.user?.user?.id

    useEffect( ()=> {
        if(!state) {
            navigate("/home")
        } else {
            axios.get('http://localhost:8000/api/users/' + stateId, {withCredentials:true} )
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
        axios.get(`http://localhost:8000/api/party/${id}`,{withCredentials:true})
        .then((res)=>{
            console.log("Party Members: ", res.data.members)
            setParty(res.data)
            const thisMember = res.data.members.filter(member=>{
                console.log("All member's ids: ", member._id)
                return member._id === memberId
            })
            console.log("This Member: ", thisMember[0])
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
                    <div className="text-center p-6 m-auto mt-10 bg-white rounded-md shadow-xl shadow-rose-600/40 ring-2 ring-indigo-600 lg:max-w-lg">
                        <h1 className="text-3xl font-semibold text-center text-indigo-700 uppercase">
                            Wishlist for {member.name} 
                        </h1>
                        {
                            (myEmail === member.email) ? 
                            <div>
                                <h1 className="mt-5">ADD TO YOUR WISHLIST</h1>
                                <EditWishList state={state} party={party} setParty={setParty} member={member} setMember={setMember} id={id} memberId={memberId}/>
                            </div>
                            :
                            <div>
                                <h1>this is not your wishlist</h1>
                                <WishList state={state} party={party} setParty={setParty} member={member} setMember={setMember} id={id} memberId={memberId}/>
                            </div>
                        }
                        <button   className="mt-10 capitalize mb-2 w-1/8 bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 font-bold py-1 px-4 rounded-full" onClick={() => navigate(`/party/${id}`)}>Go back</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewWishList