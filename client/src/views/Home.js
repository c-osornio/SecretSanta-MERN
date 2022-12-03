import React from 'react'
import Register from '../components/Register'
import Secret from '../assets/secret-santa.png'

const Home = () => {
    return (
        <div className="background">
            <img src={Secret} className="secret" alt="secret santa title"/>
            <h1 className="welcome">Welcome to Kringle!</h1>
            <div className="flex justify-around">
                <img src="https://pa1.narvii.com/7043/f2eb1977b014551977419b8edcbdad5b0f79ff6er1-344-300_hq.gif" className="peace"></img>
                <Register/>
            </div>
        </div>
    )
}

export default Home