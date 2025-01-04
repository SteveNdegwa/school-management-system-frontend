import { BrowserRouter as Router, Routes, Route} from 'react-router';
import { store } from './store';
import { Provider } from 'react-redux';
import { Login } from './pages/Login';
import { VerifyOTP } from './pages/VerifyOTP';
import { Home } from './pages/Home';
import { ForgotPassword } from './pages/ForgotPassword';
import { Students } from './pages/Students';

export default function App() {
  return(
    <div className='app'>
      <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/verify-otp' element={<VerifyOTP/>}/>
          <Route path='/forgot-password' element={<ForgotPassword/>}/>
          <Route path='/students' element={<Students/>}/>
        </Routes>
      </Router>
      </Provider> 
    </div>
  );
};
