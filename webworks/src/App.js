import './App.css';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import Contact from './Pages/Contact';
import Login from './Pages/Login';
import Projects from './Pages/Projects';
import Employees from './Pages/Employees';
import Timereports from './Pages/Timereports';
import Timelogging from './Pages/Timelogging';
import Footer from './Components/Footer';
import MyData from './Pages/Mydata';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';

export default function App() {
  return (
    <Router>
      <div className="site-container">
        <header className="site-header">
          <Navbar />
        </header>
        <main className="site-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/Projects" element={<Projects />} />
            <Route path="/Employees" element={<Employees />} />
            <Route path="/Timereports" element={<Timereports />} />

            <Route path="/MyData" element={<MyData />} />

            <Route path="/Timelogging" element={<Timelogging />} />

          </Routes>
        </main>
        <footer className="site-footer">
          <Footer />
        </footer>
      </div>
    </Router>
  );
}
