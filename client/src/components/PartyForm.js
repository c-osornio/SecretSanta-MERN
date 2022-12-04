import {useState, useEffect, useContext} from 'react'
import {Link} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import {UserContext} from '../context/UserContextProvider'

const PartyForm = () => {
    const {state,dispatch} = useContext(UserContext);
    const [input,setInput] = useState({})
    const [errors, setErrors] = useState({});
    const navigate = useNavigate()
    const [showMore, setShowMore] = useState(false)

    useEffect(()=>{
        console.log("Current state (login):", state)
        state.user && navigate('/party/new')
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[state.user])

    const submitHandler = (e)=>{
        e.preventDefault();
        axios.post('http://localhost:8000/api/party', input)
            .then(res => {
                console.log(res.data)
                setErrors({})
                setInput({})
                navigate('/dashboard')
            })
            .catch((err)=>{
                console.log("Party errors: ", err)
                setErrors(err.response.data.error.errors)
            })
    }

    const changeHandler=(e)=>{
        setInput({...input,[e.target.name]:e.target.value})
    }

    const toggleMore = (e) => {
        let more = !showMore
        setShowMore(more)
    }

    return (
        <div className="w-full min-h-screen overflow-hidden">
            <div className="p-6 m-auto mt-10 bg-white rounded-md shadow-xl shadow-rose-600/40 ring-2 ring-indigo-600 lg:max-w-lg">
                <h1 className="text-3xl font-semibold text-center text-indigo-700 underline uppercase decoration-wavy">
                    Party Planner
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
                            errors.title && (<p className="text-red-500 text-xs italic">{errors.title.message}</p>)
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
                            className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                        { 
                            errors.date && (<p className="text-red-500 text-xs italic">{errors.date.message}</p>)
                        }
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="location"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Where's the party?
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
                            errors.location && (<p className="text-red-500 text-xs italic">{errors.location.message}</p>)
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
                            errors.budget && (<p className="text-red-500 text-xs italic">{errors.budget.message}</p>)
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
                            errors.members && (<p className="text-red-500 text-xs italic">{errors.members.messages}</p>)
                        }
                        <div>
                            <div className="columns-2 row flex justify-between">
                                <h4 className="mt-4 mr-3">1.</h4>
                                <input
                                    disabled
                                    autoComplete="members"
                                    value={state.user.user.firstName}
                                    onChange={changeHandler}
                                    type="text"
                                    name="members"
                                    className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                                { 
                                    errors.members && (<p className="text-red-500 text-xs italic">{errors.members.messages}</p>)
                                }
                                <input
                                    value={state.user.user.id}
                                    autoComplete="members"
                                    onChange={changeHandler}
                                    type="hidden"
                                    name="members"
                                    className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                            </div>
                            <div className="row flex justify-between">
                                <h4 className="mt-4 mr-3">2.</h4>
                                <input
                                    placeholder="Enter member 2"
                                    autoComplete="members"
                                    onChange={changeHandler}
                                    type="text"
                                    name="members"
                                    className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                                <input
                                    placeholder="Email"
                                    autoComplete="members"
                                    onChange={changeHandler}
                                    type="text"
                                    name="members"
                                    className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                            </div>
                            <div className="row flex justify-between">
                                <h4 className="mt-4 mr-3">3.</h4>
                                <input
                                    placeholder="Enter member 3"
                                    autoComplete="members"
                                    onChange={changeHandler}
                                    type="text"
                                    name="members"
                                    className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                                <input
                                    placeholder="Email"
                                    autoComplete="members"
                                    onChange={changeHandler}
                                    type="text"
                                    name="members"
                                    className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                            </div>
                            <div className="row flex justify-between">
                                <h4 className="mt-4 mr-3">4.</h4>
                                <input
                                    placeholder="Enter member 4"
                                    autoComplete="members"
                                    onChange={changeHandler}
                                    type="text"
                                    name="members"
                                    className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                                <input
                                    placeholder="Email"
                                    autoComplete="members"
                                    onChange={changeHandler}
                                    type="text"
                                    name="members"
                                    className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                            </div>
                            <div className="row flex justify-between">
                                <h4 className="mt-4 mr-3">5.</h4>
                                <input
                                    placeholder="Enter member 5"
                                    autoComplete="members"
                                    onChange={changeHandler}
                                    type="text"
                                    name="members"
                                    className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                                <input
                                    placeholder="Email"
                                    autoComplete="members"
                                    onChange={changeHandler}
                                    type="text"
                                    name="members"
                                    className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                            </div>
                        </div>
                    </div>
                    {
                        showMore ? 
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
                                        placeholder="Enter member 6"
                                        autoComplete="members"
                                        onChange={changeHandler}
                                        type="text"
                                        name="members"
                                        className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    />
                                    <input
                                        placeholder="Email"
                                        autoComplete="members"
                                        onChange={changeHandler}
                                        type="text"
                                        name="members"
                                        className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    />
                                </div>
                                <div className="row flex justify-between">
                                    <h4 className="mt-4 mr-3">7.</h4>
                                    <input
                                        placeholder="Enter member 7"
                                        autoComplete="members"
                                        onChange={changeHandler}
                                        type="text"
                                        name="members"
                                        className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    />
                                    <input
                                        placeholder="Email"
                                        autoComplete="members"
                                        onChange={changeHandler}
                                        type="text"
                                        name="members"
                                        className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    />
                                </div>
                                <div className="row flex justify-between">
                                    <h4 className="mt-4 mr-3">8.</h4>
                                    <input
                                        placeholder="Enter member 8"
                                        autoComplete="members"
                                        onChange={changeHandler}
                                        type="text"
                                        name="members"
                                        className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    />
                                    <input
                                        placeholder="Email"
                                        autoComplete="members"
                                        onChange={changeHandler}
                                        type="text"
                                        name="members"
                                        className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    />
                                </div>
                                <div className="row flex justify-between">
                                    <h4 className="mt-4 mr-3">9.</h4>
                                    <input
                                        placeholder="Enter member 9"
                                        autoComplete="members"
                                        onChange={changeHandler}
                                        type="text"
                                        name="members"
                                        className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    />
                                    <input
                                        placeholder="Email"
                                        autoComplete="members"
                                        onChange={changeHandler}
                                        type="text"
                                        name="members"
                                        className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    />
                                </div>
                                <div className="row flex justify-between">
                                    <h4 className="mt-4 mr-3 ten">10.</h4>
                                    <input
                                        placeholder="Enter member 10"
                                        autoComplete="members"
                                        onChange={changeHandler}
                                        type="text"
                                        name="members"
                                        className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    />
                                    <input
                                        placeholder="Email"
                                        autoComplete="members"
                                        onChange={changeHandler}
                                        type="text"
                                        name="members"
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