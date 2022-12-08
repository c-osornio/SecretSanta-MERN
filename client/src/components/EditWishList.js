import {React, useState, useEffect} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const EditWishList = ({state, party, setParty, member, setMember, id, memberId}) => {
    const [item, setItem] = useState("")
    const [details, setDetails] = useState("")
    const [image, setImage] = useState("")
    const [errors,setErrors] = useState({})
    const navigate = useNavigate()
    const [index, setIndex] = useState(0)
    const [allMembers, setAllMembers] = useState([])
    const [wishlist, setWishlist] = useState({
        list: []
    }
    )

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
        setWishlist = [...party.members[index].wishlist]
        let newList = []
        newList = [...party.members[index].wishlist.list]
        console.log(newList)
        newList.push({
            item,
            details,
            image
        })
        console.log("New wishlist: ", newList)
        let newMemberList = []
        // newMemberList = party.members.map((member, idx) => {
        //     console.log("Indexes:" , idx, index)
        //     if(idx === index) {
        //         member = {
        //             ...member,
        //             wishlist: [
        //                 ...wishlist,
        //                 list: newList
        //             ]
        //         }
        //     }
        //     return member
        // })
        console.log("Updated member: ", member)
        setParty({...party, members: newMemberList})
        console.log("Updated party: ", party)
        const newInput = {...party}
        delete newInput._id
        console.log("NewInput without id: ", newInput)
        console.log("Updated wishlist: ", party.members[index].wishlist)
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
                } else {
                    setErrors(err.response.data.error)
                }
            });
    };

    return (
        <>
            <form className="mt-6" onSubmit={submitHandler}>
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
        </>
    )
}

export default EditWishList