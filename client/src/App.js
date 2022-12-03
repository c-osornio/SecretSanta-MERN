import './App.css';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Home from "./views/Home";
import ViewLogin from './views/ViewLogin';



function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Home */}
          <Route path="/" element= {<Navigate to="/home" />} />
          {/* Create and Read */}
          <Route path="/home" element={<Home/>} />
          <Route path="/login" element={<ViewLogin/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
