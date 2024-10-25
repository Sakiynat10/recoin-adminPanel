import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import DashboardPage from './pages/admin/dashboard';
import LoginPage from './pages/auth/login';
import AdminLayout from './components/layout/admin';
import RegisterPage from './pages/auth/register';
import UserPage from './pages/admin/users';
import AccountPage from './pages/admin/profile';
import AuthPage from './pages/auth/page';
import BillingPage from './pages/admin/billing';
import SettingsPage from './pages/admin/settings';
import { useContext } from 'react';
import { AuthContext } from './context/auth';
import OrdersPage from './pages/admin/orders';
import ProductsPage from './pages/admin/products';

function App() {
  const {isAuth} = useContext(AuthContext)
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="auth" >
          <Route index element={<AuthPage/>}/>
          <Route path='register' element={<RegisterPage/>}/>
          <Route path='login' element={<LoginPage/>}/>
        </Route>
        <Route path='admin' element={ isAuth ? <AdminLayout/>: <Navigate to="/auth/login" />}>
          <Route path="dashboard" element={<DashboardPage/>}/>
          <Route path="users" element={isAuth ? <UserPage/>  : <Navigate to="/auth/login" />}/>
          <Route path="orders" element={isAuth ? <OrdersPage/>  : <Navigate to="/auth/login" />}/>
          <Route path="products" element={isAuth ? <ProductsPage/>  : <Navigate to="/auth/login" />}/>
          <Route path="profile" element={isAuth ? <AccountPage/>  : <Navigate to="/auth/login" />}/>
          <Route path="billing" element={isAuth ? <BillingPage/>  : <Navigate to="/auth/login" />}/>
          <Route path="settings" element={isAuth ? <SettingsPage/>  : <Navigate to="/auth/login" />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
