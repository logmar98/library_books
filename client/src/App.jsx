import { Routes, Route } from 'react-router-dom';
import Navbar from './Pages/Navbar/Navbar.jsx';
import Footer from './Pages/Footer/Footer.jsx';
import Register from './Pages/Register/Register.jsx';
import Login from './Pages/Login/Login.jsx';
import "./App.css";

const App = () => {
 return (
    <div className='app'>
      <Navbar />
      <div className='app-content'>
        <Routes>
          <Route path='/signup' Component={Register} />
          <Route path='/login' Component={Login} />
        </Routes>
      </div>
      <Footer />
    </div>
 );
};

export default App;