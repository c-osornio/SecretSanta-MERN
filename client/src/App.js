import './App.css';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Home from "./views/Home";
import ViewRegister from './views/ViewRegister';
import Dashboard from "./views/Dashboard";
import {useState,useEffect,useContext} from 'react'
import axios from 'axios'
import {UserContext} from './context/UserContextProvider'
import ViewPartyForm from './views/ViewPartyForm';
import ViewParty from './views/ViewParty';
import ViewWishList from './views/ViewWishList';
import ViewUpdate from './views/ViewUpdate';
import ViewSecret from './views/ViewSecret';




function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const {state,dispatch} = useContext(UserContext)

  useEffect(()=>{
    axios.post('http://localhost:8000/api/users/isLoggedIn', {}, {withCredentials:true})
    .then((user)=>{
      // console.log(user.data)
      dispatch({
        type:"SET_USER",
        payload:user.data
      })
      setLoggedIn(true)
    })
    .catch((err)=>{
      // console.log(err.response.data)
      dispatch({
        type:"NULL_USER",
      })
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <>
      <BrowserRouter>
        <Routes>

          {/* Home */}
          <Route path="/" element= {<Navigate to="/home" />} />

          {/* Create and Read */}
          <Route path="/home" element={<Home setLoggedIn={setLoggedIn} loggedIn={loggedIn} state={state} dispatch={dispatch}/>} />
          <Route path="/register" element={<ViewRegister setLoggedIn={setLoggedIn} loggedIn={loggedIn} state={state} dispatch={dispatch}/>} />
          <Route path="/dashboard" element={<Dashboard setLoggedIn={setLoggedIn} state={state} dispatch={dispatch}/>} />
          <Route path="/party/new" element={<ViewPartyForm setLoggedIn={setLoggedIn} state={state} dispatch={dispatch}/>} />
          <Route path="/party/:id" element={<ViewParty setLoggedIn={setLoggedIn} state={state} dispatch={dispatch}/>}/>
          <Route path="/party/:id/:memberId" element={<ViewWishList setLoggedIn={setLoggedIn} state={state} dispatch={dispatch}/>}/>
          <Route path="/party/:id/:memberId/secret" element={<ViewSecret setLoggedIn={setLoggedIn} state={state} dispatch={dispatch}/>}/>
          {/* Update */}
          <Route path="/party/:id/edit" element={<ViewUpdate setLoggedIn={setLoggedIn} state={state} dispatch={dispatch}/>}/>

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
