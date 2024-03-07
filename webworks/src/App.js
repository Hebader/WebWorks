import "./App.css";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Contact from "./Pages/Contact";
import Login from "./Pages/Login";
import Projects from "./Pages/Projects";
import { HashRouter as Router, Route, Routes } from 'react-router-dom';

export default function App () {
  return (
    <Router>
    <div className='site-container'>
      <header className='site-header'>
        <Navbar/>
      </header>
      <main className='site-content'>
        <Routes>
          <Route path="/Home" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/Contact" element={<Contact/>}/>
          <Route path="/Projects" element={<Projects/>}/>
        </Routes>
      </main>
    </div>
    </Router>
  );
}