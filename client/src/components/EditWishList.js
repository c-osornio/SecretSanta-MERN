import {React, useState, useEffect} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import ShowList from './ShowList'

const EditWishList = ({state, party, setParty, member, setMember, id, memberId}) => {
    const [item, setItem] = useState("")
    const [details, setDetails] = useState("")
    const [image, setImage] = useState("")
    const [errors,setErrors] = useState({})
    const navigate = useNavigate()
    const [index, setIndex] = useState(0)
    const [allMembers, setAllMembers] = useState([])


    useEffect( ()=> {
        if(!state) {
            navigate("/home")
        } else {
            axios.get('http://localhost:8000/api/party/' + id, {withCredentials:true} )
            .then(res => {
                console.log("Party Details: ", res.data)
                setParty(res.data)
                console.log("Members then member", res.data.members, member)
                const index = res.data.members.findIndex(i => i.email === member.email)
                console.log("Member Index: ", index)
                console.log("Current wishlist: ", member.wishlist)
                setIndex(index)
                setAllMembers(res.data.members)
            })
            .catch((err)=> {
                console.log(err);
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [state])

    const submitHandler = (e) => {
        e.preventDefault();

        console.log("Updating wishlist")
        console.log("Check size of wishlist: ", member.wishlist.length)
        let newList = [...party.members[index].wishlist[0].list, {item, details, image}]
        console.log("Newly entered list: ", newList)
        console.log("New wishlist: ", newList)
       
        let newMemberList = []
        newMemberList = party.members.map((member, idx) => {
            console.log("Indexes:" , idx, index)
            if(idx === index) {
                member = {
                    ...member,
                    wishlist: {list: newList}
                }
            }
            return member
        })
        console.log("Updated memberList: ", newMemberList)

        let newParty = {...party}
        newParty.members = newMemberList
        console.log("New Party: ", newParty)

        const newInput = {...newParty}
        delete newInput._id
        console.log("NewInput without id: ", newInput)
        console.log("Updated wishlist: ", newParty.members[index].wishlist)
        
        axios.put(`http://localhost:8000/api/party/${id}`, newInput , {withCredentials:true})
            .then((res) => {
                console.log(res.data);
                setErrors({})
                setItem("")
                setDetails("")
                setImage("")
                navigate(`/party/${id}`);
            })
            .catch((err) => {
                console.log("Error in wishlist: ", err.response.data.error);
                if(err.response.data.error.errors) {
                    setErrors(err.response.data.error.errors)
                    console.log("Errors: ", errors)
                } else {
                    setErrors(err.response.data.error)
                    console.log("Errors: ", errors)
                }
            });
        };
        
        return (
            <>
            <div>
                <ShowList state={state} party={party} setParty={setParty} member={member} setMember={setMember} id={id} memberId={memberId}/>
                <h1 className="dashboardName text-2xl">Add to your wishlist!</h1>
                <form className="mt-2" onSubmit={submitHandler}>
                    <div className="mb-2">
                        <label
                            htmlFor="item"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Item Name
                        </label>
                        <input
                            autoComplete="item"
                            value={item}
                            onChange={(e) => setItem(e.target.value)}
                            type="text"
                            name="item"
                            className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                        { 
                            errors?.item && (<p className="text-red-500 text-xs italic">{errors?.item.message}</p>)
                        }
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="details"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Item Details
                        </label>
                        <input
                            autoComplete="details"
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
                            type="text"
                            name="details"
                            className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                        { 
                            errors?.details && (<p className="text-red-500 text-xs italic">{errors?.details.message}</p>)
                        }
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="image"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Image PNG URL
                        </label>
                        <input
                            autoComplete="image"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            type="text"
                            name="image"
                            className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                        { 
                            errors?.image && (<p className="text-red-500 text-xs italic">{errors?.image.message}</p>)
                        }
                    </div>
                    <div className="mt-6">
                        <button type="submit" className="w-full px-4 py-2 bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 font-bold rounded-full">
                            ADD TO WISHLIST
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default EditWishList