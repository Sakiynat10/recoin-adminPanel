import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import DashboardPage from './pages/admin/dashboard';
import LoginPage from './pages/auth/login';
import AdminLayout from './components/layout/admin';
import RegisterPage from './pages/auth/register';
import UserPage from './pages/admin/users';
import ProductPage from './pages/admin/products';
import AccountPage from './pages/admin/profile';
import AuthPage from './pages/auth/page';
import BillingPage from './pages/admin/billing';
import SettingsPage from './pages/admin/settings';
import Cookies from 'js-cookie';
import { TOKEN } from './constants';
import { useContext } from 'react';
import { AuthContext } from './context/auth';

function App() {
  // const [authToken, setAuthToken] = useState(null);
  const {isAuth} = useContext(AuthContext)
   
  // useEffect(() => {
  //   const token = Cookies.get(TOKEN);
  //   setAuthToken(token);
  //   console.log(token);
  // }, []);
  
  console.log(Cookies.get(TOKEN));
  console.log(isAuth);
  const token = Cookies.get(TOKEN)
  console.log(Boolean(token));
  console.log(token);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="auth" >
          <Route index element={<AuthPage/>}/>
          <Route path='register' element={<RegisterPage/>}/>
          <Route path='login' element={<LoginPage/>}/>
        </Route>
        <Route path='admin' element={ Boolean(token) ? <AdminLayout/>: <Navigate to="/auth/login" />}>
          <Route path="dashboard" element={<DashboardPage/>}/>
          <Route path="user" element={isAuth ? <UserPage/>  : <Navigate to="/auth/login" />}/>
          <Route path="product" element={isAuth ? <ProductPage/>  : <Navigate to="/auth/login" />}/>
          <Route path="profile" element={isAuth ? <AccountPage/>  : <Navigate to="/auth/login" />}/>
          <Route path="billing" element={isAuth ? <BillingPage/>  : <Navigate to="/auth/login" />}/>
          <Route path="settings" element={isAuth ? <SettingsPage/>  : <Navigate to="/auth/login" />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
