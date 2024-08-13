import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { Home } from './pages/Home.tsx';
import Login from './pages/Login.tsx';
import Register  from './pages/Register.tsx';
import Header from './components/Header.tsx';
import { ToastContainer } from 'react-toastify';
import NewTicket from './pages/NewTicket.jsx';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './components/PrivateRoute.tsx';
import Tickets from './pages/Tickets.jsx'
import Ticket from './pages/Ticket.jsx'

function App() {
  return <>
    <Router>
      <div className='container'>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Register' element={<Register />} />
          <Route path='/new-ticket' element={<PrivateRoute />}>
            <Route path='/new-ticket' element={<NewTicket />} />
          </Route>
          <Route path='/tickets' element={<PrivateRoute />}>
            <Route path='/tickets' element={<Tickets />} />
          </Route>
          <Route path='/ticket/:ticketId' element={<PrivateRoute />}>
            <Route path='/ticket/:ticketId' element={<Ticket />} />
          </Route>                    
        </Routes>
      </div>
    </Router>
    <ToastContainer />
  </>;
}

export default App;
