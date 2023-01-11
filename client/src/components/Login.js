import {useState, useEffect, useContext} from 'react'
import {Link} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import {UserContext} from '../context/UserContextProvider'


const Login = ({loggedIn, setLoggedIn, state, dispatch}) => {
    const [input,setInput] = useState({})
    const [errors, setErrors] = useState({});
    const navigate = useNavigate()

    useEffect(()=>{
        if(state.user) {
            // console.log("Current state (login):", state)
            navigate('/dashboard')
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const submitHandler = (e)=>{
        // console.log("Attempting to login")
        e.preventDefault()
        axios.post('http://localhost:8000/api/users/login' ,input, {withCredentials:true})
        .then((res)=>{
            // console.log("Login: ", res.data)
            dispatch({
                type: "SET_USER",
                payload: res.data
            })
            setLoggedIn(true)
            setInput({})
            setErrors({})
            navigate('/dashboard')
        })
        .catch((err)=>{
            // console.log("Login errors: ", err.response.data)
            setErrors(err.response.data)
        })
    }

    const changeHandler=(e)=>{
        setInput({...input,[e.target.name]:e.target.value})
    }

    return (
        <div className="w-full min-h-screen overflow-hidden">
            <div className="p-6 m-auto mt-10 bg-white rounded-md shadow-xl shadow-rose-600/40 ring-2 ring-indigo-600 lg:max-w-lg">
                <h1 className="text-3xl font-semibold text-center text-indigo-700 underline uppercase decoration-wavy">
                    Login
                </h1>
                <form className="mt-6" onSubmit={submitHandler}>
                    <div className="mb-2">
                        <label
                            htmlFor="email"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Email:
                        </label>
                        <input
                            autoComplete="email"
                            value={input.email}
                            onChange={changeHandler}
                            type="email"
                            name="email"
                            className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Password:
                        </label>
                        <input
                            autoComplete="password"
                            value={input.password}
                            onChange={changeHandler}
                            type="password"
                            name="password"
                            className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                        { 
                            errors.message && (<p className="text-red-500 text-xs italic">{errors.message}</p>)
                        }
                    </div>
                    <div className="mt-6">
                        <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-indigo-700 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">
                            Login
                        </button>
                    </div>
                </form>

                <p className="mt-8 text-xs font-light text-center text-gray-700">
                    {" "}New to Kringle?{" "}
                </p>
                <p className="mt-2 text-xs font-light text-center text-gray-700">
                    <Link to="/register" className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 font-bold py-1 px-4 rounded-full">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Login