import React from 'react'
import {useNavigate} from 'react-router-dom'

const WishList = ({party, member, setMember, id, memberId, myEmail}) => {
    return (
        <>
            {
                member.wishlist ? null : <h1 className="mt-5 mb-3 dashboardName text-2xl">Wishlist:</h1> 
            }
            <div className="grid grid-cols-2 place-content-around gap-10 mt-10 mb-10"> 
                {
                    member.wishlist ?
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

export default WishList


{/* {
        member.wishlist ?
        member.wishlist.map((items, idx)=>(
            <div key={idx}>
                {
                    items.list.map((wish, i)=> (
                        <div key={i} className="border mb-5">
                            <h1>{i + 1}</h1>
                            <h1>{wish.item}</h1>
                            <h1>{wish.details}</h1>
                            <h1>{wish.image}</h1>
                        </div>
                    ))
                }
            </div>
        ))
        :
        null
} */}