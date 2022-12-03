import React from 'react'
import Santa from '../assets/santa.png'

const Banner = () => {
    return (
        <>
            <img src={Santa} className="banner" alt="Secret Santa" />
            {/* <h1 className="title">Welcome to Kringle!</h1> */}
        </>
    )
}

export default Banner