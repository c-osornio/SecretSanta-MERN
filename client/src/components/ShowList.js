import React from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'


const ShowList = ({state, party, setParty, member, setMember, id, memberId, index, myEmail}) => {

    const navigate = useNavigate()
    
    const handleDelete=(idx)=>{
        console.log("Attempting to remove item from wishlist")
        console.log("List index: ", idx)
        let newList = party.members[index].wishlist[0].list
        console.log("Trying to remove: ", newList[idx].item)
        newList.splice(idx, 1)
        console.log("List without item: ", newList)

        let newMemberList = []
        newMemberList = party.members.map((participant, i) => {
            if(i === index) {
                participant = {
                    ...participant,
                    wishlist: {list: newList}
                }
            }
            return participant
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
                navigate(`/party/${id}`);
            })
            .catch((err) => {
                console.log("Error in wishlist delete: ", err);
            });
    };
    
    return (
        <>
            {
                member.wishlist[0]?.list ? <h1 className="mt-5 mb-3 dashboardName text-2xl">Wishlist:</h1> : null
            }
            <div className="grid grid-cols-2 place-content-around gap-10 mt-10 mb-10"> 
                {
                    member.wishlist[0]?.list ?
                    member.wishlist[0]?.list.map((items, idx)=>(
                        <div key={idx} className="break-words max-w-lg w-full lg:max-w-full lg:flex mb-8 border-2 border-slate-600 rounded overflow-hidden">
                            <div className="wrapper h-60 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden ">
                                <img className="overflow-hidden max-w-fit" src=
                                {
                                    items.image ? items.image : "https://media.istockphoto.com/id/1128262881/vector/decorative-black-gift-box-with-golden-bow-isolated-on-white.jpg?s=612x612&w=0&k=20&c=Gun3eVyEhbfOTJtGvANml18ARBAqWD8UObeallkbltc="
                                }
                                alt={items.item} />
                            </div>
                            <div className="lg:w-48 h-48 bg-white p-4 flex flex-col justify-between overflow-hidden bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 font-bold py-1 px-4">
                                {
                                    (myEmail === member.email) ? 
                                    <button onClick={(e)=>handleDelete(idx) } className="text-right text-xs hover:text-blue-700 text-gray-500 font-semibold">
                                        Delete
                                    </button>
                                    :
                                    null
                                }
                                <a className="mt-3 text-2xl font-bold capitalize" href={items.details} target="_blank" rel="noopener noreferrer">
                                    {items.item}
                                </a>
                                <div className="mb-10 capitalize">
                                        <h3 className="mt-3 text-xs italic">Click the title to go to the item's link!</h3>
                                </div>
                            </div>
                        </div>
                    ))
                    :
                    null
                }
            </div>
        </>
    )
}

export default ShowList