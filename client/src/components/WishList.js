import React from 'react'

const WishList = ({party, member, setMember, id, memberId}) => {
    return (
        <>
            {
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
            }
        </>
    )
}

export default WishList