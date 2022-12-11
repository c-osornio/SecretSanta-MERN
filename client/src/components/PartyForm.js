import {useState, useEffect, useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import {UserContext} from '../context/UserContextProvider'

const PartyForm = ({state}) => {
    const [errors, setErrors] = useState({});
    const navigate = useNavigate()
    const [showMore, setShowMore] = useState(false)
    const [email, setEmail] = useState("")
    const name = `${state.user?.user?.firstName?.charAt(0).toUpperCase()}${state.user?.user?.firstName?.slice(1)}`
    const [input,setInput] = useState({
        "title" : "",
        "members" : [
            {
                "name" : "",
                "email" : "",
                "wishlist" : [
                    {
                        list: []
                    }
                ],
                "secretSanta" : ""
            },
            {
                "name" : "",
                "email" : "",
                "wishlist" : [
                    {
                        list: []
                    }
                ],
                "secretSanta" : ""
            },
            {
                "name" : "",
                "email" : "",
                "wishlist" : [
                    {
                        list: []
                    }
                ],
                "secretSanta" : ""
            },
            {
                "name" : "",
                "email" : "",
                "wishlist" : [
                    {
                        list: []
                    }
                ],
                "secretSanta" : ""
            },
            {
                "name" : "",
                "email" : "",
                "wishlist" : [
                    {
                        list: []
                    }
                ],
                "secretSanta" : ""
            },
            {
                "name" : "",
                "email" : "",
                "wishlist" : [
                    {
                        list: []
                    }
                ],
                "secretSanta" : ""
            },
            {
                "name" : "",
                "email" : "",
                "wishlist" : [
                    {
                        list: []
                    }
                ],
                "secretSanta" : ""
            },
            {
                "name" : "",
                "email" : "",
                "wishlist" : [
                    {
                        list: []
                    }
                ],
                "secretSanta" : ""
            },
            {
                "name" : "",
                "email" : "",
                "wishlist" : [
                    {
                        list: []
                    }
                ],
                "secretSanta" : ""
            },
            {
                "name" : "",
                "email" : "",
                "wishlist" : [
                    {
                        list: []
                    }
                ],
                "secretSanta" : ""
            }
        ],
        "date" : "",
        "location" : "",
        "budget" : "",
        "createdBy" : ""
    })

    useEffect(()=>{
        if(!state) {
            navigate("/home")
        } else {
            axios.get('http://localhost:8000/api/users/' + state.user?.user?.id, {withCredentials:true} )
            .then(res => {
                setEmail(res.data.email)
                const newMembers = [...input.members]
                newMembers[0].name = name
                newMembers[0].email = res.data.email
                setInput({...input, members: newMembers})
                const createdBy = state.user?.user?.id
                console.log("Created by: ", createdBy)
                setInput({...input, createdBy: createdBy})
                setShowMore(false)
            })
            .catch((err)=> {
                console.log(err);
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[state])




    const submitHandler = (e)=>{
        e.preventDefault();
        const newMembers = input.members.filter(member=>{
            return member.name.length !== 0 || member.email.length !== 0
        })
        console.log("Creating party with input: (before/after trim)", input, {...input, members: newMembers })
        axios.post('http://localhost:8000/api/party', {...input, members: newMembers} , {withCredentials:true})
            .then(res => {
                console.log(res.data)
                setErrors({})
                setInput({
                    "title" : "",
                    "members" : [
                        {
                            "name" : "",
                            "email" : "",
                            "wishlist" : [
                                {
                                    list: []
                                }
                            ],
                            "secretSanta" : ""
                        },
                                {
                            "name" : "",
                            "email" : "",
                            "wishlist" : [
                                {
                                    list: []
                                }
                            ],
                            "secretSanta" : ""
                        },
                        {
                            "name" : "",
                            "email" : "",
                            "wishlist" : [
                                {
                                    list: []
                                }
                            ],
                            "secretSanta" : ""
                        },
                        {
                            "name" : "",
                            "email" : "",
                            "wishlist" : [
                                {
                                    list: []
                                }
                            ],
                            "secretSanta" : ""
                        },
                        {
                            "name" : "",
                            "email" : "",
                            "wishlist" : [
                                {
                                    list: []
                                }
                            ],
                            "secretSanta" : ""
                        },
                        {
                            "name" : "",
                            "email" : "",
                            "wishlist" : [
                                {
                                    list: []
                                }
                            ],
                            "secretSanta" : ""
                        },
                        {
                            "name" : "",
                            "email" : "",
                            "wishlist" : [
                                {
                                    list: []
                                }
                            ],
                            "secretSanta" : ""
                        },
                        {
                            "name" : "",
                            "email" : "",
                            "wishlist" : [
                                {
                                    list: []
                                }
                            ],
                            "secretSanta" : ""
                        },
                        {
                            "name" : "",
                            "email" : "",
                            "wishlist" : [
                                {
                                    list: []
                                }
                            ],
                            "secretSanta" : ""
                        },
                        {
                            "name" : "",
                            "email" : "",
                            "wishlist" : [
                                {
                                    list: []
                                }
                            ],
                            "secretSanta" : ""
                        }
                    ],
                    "date" : "",
                    "location" : "",
                    "budget" : "",
                    "createdBy": ""
                })
                setShowMore(false)
                navigate('/dashboard')
            })
            .catch((err)=>{
                console.log("Party errors: ", err)
                if(err.response.data.error.errors) {
                    setErrors(err.response.data.error.errors)
                } else {
                    setErrors(err.response.data.error)
                }
            })
    }

    const changeHandler=(e)=>{
        setInput({...input,[e.target.name]:e.target.value})
    }

    const handleMembers =(e, number) => {
        const memberList = input.members.map((member, idx) => {
            if(idx + 1 === number) {
                member = {
                    ...member,
                    [e.target.name] : e.target.value
                }
            }
            return member
        })
        setInput({...input, members: memberList})
    }

    const toggleMore = (e) => {
        let more = !showMore
        setShowMore(more)
    }

    return (
        <div className="w-full min-h-screen overflow-hidden h-full">
            <div className="p-6 m-auto mt-10 bg-white rounded-md shadow-xl shadow-rose-600/40 ring-2 ring-indigo-600 lg:max-w-lg">
                <h1 className="text-3xl font-semibold text-center text-indigo-700 underline uppercase decoration-wavy">
                    Secret Santa Planner
                </h1>
                <form className="mt-6" onSubmit={submitHandler}>
                    <div className="mb-2">
                        <label
                            htmlFor="title"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            What should we title your party?
                        </label>
                        <input
                            autoComplete="title"
                            value={input.title}
                            onChange={changeHandler}
                            type="title"
                            name="title"
                            className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                        { 
                            errors?.title && (<p className="text-red-500 text-xs italic">{errors?.title.message}</p>)
                        }
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="date"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            When's the party?
                        </label>
                        <input
                            autoComplete="date"
                            value={input.date}
                            onChange={changeHandler}
                            type="date"
                            name="date"
                            pattern="yyyy-MM-dd"
                            className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                        { 
                            errors?.date && (<p className="text-red-500 text-xs italic">{errors?.date.message}</p>)
                        }
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="location"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            What's the address?
                        </label>
                        <input
                            autoComplete="location"
                            value={input.location}
                            onChange={changeHandler}
                            type="text"
                            name="location"
                            className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                        { 
                            errors?.location && (<p className="text-red-500 text-xs italic">{errors?.location.message}</p>)
                        }
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="budget"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            What's the gift budget?
                        </label>
                        <div className="mt-2 mb-4 flex flex-wrap items-stretch w-full relative">
                            <div className="flex -mr-px">
                                <span className="flex items-center leading-normal bg-grey-lighter rounded rounded-r-none border border-r-0 border-grey-light px-3 whitespace-no-wrap text-grey-dark text-sm">$</span>
                            </div>
                            <input
                                autoComplete="budget"
                                value={input.budget}
                                onChange={changeHandler}
                                type="number"
                                name="budget"
                                className="flex-shrink flex-grow flex-auto leading-normal w-px border h-10 border-grey-light px-3 relative text-indigo-700 bg-white rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                            <div className="flex -mr-px">
                                <span className="flex items-center leading-normal bg-grey-lighter rounded rounded-l-none border border-l-0 border-grey-light px-3 whitespace-no-wrap text-grey-dark text-sm">.00</span>
                            </div>	
                        </div>
                        { 
                            errors?.budget && (<p className="text-red-500 text-xs italic budget">{errors?.budget.message}</p>)
                        }
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="members"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Who's invited?
                        </label>
                        { 
                            errors?.members && (<p className="text-red-500 text-xs italic">{errors?.members.message}</p>)
                        }
                        { 
                            errors["members.1.name"] ? (<div className="table-row"><p className="text-red-500 text-xs italic table-cell">{errors["members.1.name"]?.message}</p></div>)
                            : null
                        }
                        { 
                            errors["members.1.email"] ? (<div className="table-row"><p className="text-red-500 text-xs italic table-cell">{errors["members.1.email"]?.message}</p></div>)
                            : null
                        }
                        <div>
                            <div className="columns-2 row flex justify-between">
                                <h4 className="mt-4 mr-3">1.</h4>
                                <input
                                    disabled
                                    autoComplete="members"
                                    value={name}
                                    type="text"
                                    name="name"
                                    className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                                <input
                                    disabled
                                    value={email}
                                    autoComplete="members"
                                    type="text"
                                    name="email"
                                    className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                            </div>
                            <div className="row flex justify-between">
                                <h4 className="mt-4 mr-3">2.</h4>
                                <input
                                    value= {input.members[1]?.name}
                                    placeholder="Enter member 2"
                                    autoComplete="members"
                                    onChange={ (e)=> handleMembers(e, 2) }
                                    type="text"
                                    name="name"
                                    className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                                <input
                                    value= {input.members[1]?.email}
                                    placeholder="Email"
                                    autoComplete="members"
                                    onChange={ (e)=> handleMembers(e, 2) }
                                    type="text"
                                    name="email"
                                    className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                            </div>
                            <div className="row flex justify-between">
                                <h4 className="mt-4 mr-3">3.</h4>
                                <input
                                    value= {input.members[2]?.name}
                                    placeholder="Enter member 3"
                                    autoComplete="members"
                                    onChange={ (e)=> handleMembers(e, 3) }
                                    type="text"
                                    name="name"
                                    className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                                <input
                                    value={input.members[2]?.email}
                                    placeholder="Email"
                                    autoComplete="members"
                                    onChange={ (e)=> handleMembers(e, 3) }
                                    type="text"
                                    name="email"
                                    className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                            </div>
                            <div className="row flex justify-between">
                                <h4 className="mt-4 mr-3">4.</h4>
                                <input
                                    value={input.members[3]?.name}
                                    placeholder="Enter member 4"
                                    autoComplete="members"
                                    onChange={ (e)=> handleMembers(e, 4) }
                                    type="text"
                                    name="name"
                                    className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                                <input
                                    value={input.members[3]?.email}
                                    placeholder="Email"
                                    autoComplete="members"
                                    onChange={ (e)=> handleMembers(e, 4) }
                                    type="text"
                                    name="email"
                                    className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                            </div>
                            <div className="row flex justify-between">
                                <h4 className="mt-4 mr-3">5.</h4>
                                <input
                                    value={input.members[4]?.name}
                                    placeholder="Enter member 5"
                                    autoComplete="members"
                                    onChange={ (e)=> handleMembers(e, 5) }
                                    type="text"
                                    name="name"
                                    className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                                <input
                                    value={input.members[4]?.email}
                                    placeholder="Email"
                                    autoComplete="members"
                                    onChange={ (e)=> handleMembers(e, 5) }
                                    type="text"
                                    name="email"
                                    className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                            </div>
                        </div>
                    </div>
                    {
                        !showMore ? 
                            <div className="mt-4">
                                <h3 className= "text-xs cursor-pointer text-center mx-auto w-20 hover:text-blue-700 text-gray-500 font-semibold py-1 px-2" onClick={toggleMore}>
                                    Invite more
                                </h3>
                            </div>
                            :
                            <div>
                                <div className="row flex justify-between">
                                    <h4 className="mt-4 mr-3">6.</h4>
                                    <input
                                        value={input.members[5]?.name}
                                        placeholder="Enter member 6"
                                        autoComplete="members"
                                        onChange={ (e)=> handleMembers(e, 6) }
                                        type="text"
                                        name="name"
                                        className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    />
                                    <input
                                        value={input.members[5]?.email}
                                        placeholder="Email"
                                        autoComplete="members"
                                        onChange={ (e)=> handleMembers(e, 6) }
                                        type="text"
                                        name="email"
                                        className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    />
                                </div>
                                <div className="row flex justify-between">
                                    <h4 className="mt-4 mr-3">7.</h4>
                                    <input
                                        value={input.members[6]?.name}
                                        placeholder="Enter member 7"
                                        autoComplete="members"
                                        onChange={ (e)=> handleMembers(e, 7) }
                                        type="text"
                                        name="name"
                                        className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    />
                                    <input
                                        value={input.members[6]?.email}
                                        placeholder="Email"
                                        autoComplete="members"
                                        onChange={ (e)=> handleMembers(e, 7) }
                                        type="text"
                                        name="email"
                                        className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    />
                                </div>
                                <div className="row flex justify-between">
                                    <h4 className="mt-4 mr-3">8.</h4>
                                    <input
                                        value={input.members[7]?.name}
                                        placeholder="Enter member 8"
                                        autoComplete="members"
                                        onChange={ (e)=> handleMembers(e, 8) }
                                        type="text"
                                        name="name"
                                        className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    />
                                    <input
                                        value={input.members[7]?.email}
                                        placeholder="Email"
                                        autoComplete="members"
                                        onChange={ (e)=> handleMembers(e, 8) }
                                        type="text"
                                        name="email"
                                        className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    />
                                </div>
                                <div className="row flex justify-between">
                                    <h4 className="mt-4 mr-3">9.</h4>
                                    <input
                                        value={input.members[8]?.name}
                                        placeholder="Enter member 9"
                                        autoComplete="members"
                                        onChange={ (e)=> handleMembers(e, 9) }
                                        type="text"
                                        name="name"
                                        className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    />
                                    <input
                                        value={input.members[8]?.email}
                                        placeholder="Email"
                                        autoComplete="members"
                                        onChange={ (e)=> handleMembers(e, 9) }
                                        type="text"
                                        name="email"
                                        className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    />
                                </div>
                                <div className="row flex justify-between">
                                    <h4 className="mt-4 mr-3 ten">10.</h4>
                                    <input
                                        value={input.members[9]?.name}
                                        placeholder="Enter member 10"
                                        autoComplete="members"
                                        onChange={ (e)=> handleMembers(e, 10) }
                                        type="text"
                                        name="name"
                                        className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    />
                                    <input
                                        value={input.members[9]?.email}
                                        placeholder="Email"
                                        autoComplete="members"
                                        onChange={ (e)=> handleMembers(e, 10) }
                                        type="text"
                                        name="email"
                                        className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    />
                                </div>
                                <div className="mt-4">
                                <h3 className= "text-xs cursor-pointer text-center hover:text-blue-700 text-gray-500 font-semibold py-1 px-2 w-20 mx-auto" onClick={toggleMore}>
                                    Invite less
                                </h3>
                            </div>
                            </div>
                    }
                    <div className="mt-6">
                        <button type="submit" className="w-full px-4 py-2 bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 font-bold rounded-full">
                            LET'S PARTY!
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PartyForm