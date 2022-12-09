import React from 'react'

const ShowList = ({state, party, setParty, member, setMember, id, memberId}) => {
    return (
        <>
            {
                member.wishlist[0]?.list ? <h1 className="mt-5 mb-3 dashboardName text-2xl">Wishlist:</h1> : null
            }
            <div> 
                {
                    member.wishlist[0]?.list ?
                    member.wishlist[0].list.map((items, idx)=>(
                        <div key={idx} className="border mb-5">
                            <h1>{idx + 1}</h1>
                            <h1>{items.item}</h1>
                            <h1>{items.details}</h1>
                            <h1>{items.image}</h1>
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