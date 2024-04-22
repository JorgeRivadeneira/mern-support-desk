import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { Home } from './pages/Home.tsx';
import Login from './pages/Login.tsx';
import Register  from './pages/Register.tsx';
import Header from './components/Header.tsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return <>
    <Router>
      <div className='container'>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Register' element={<Register />} />
        </Routes>
      </div>
    </Router>
    <ToastContainer />
  </>;
}

export default App;
