import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import NotFoundPage from './pages/NotFoundPage';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import SellerRegisterForm from './components/SellerRegisterForm';
import StorePage from './pages/StorePage';
// import CreateStore from './pages/CreateStore';
// import UpdateStore from './pages/UpdateStore';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/registration" element={<RegistrationForm />} />
          <Route path="/seller" element={<SellerRegisterForm />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/my-store" element={<StorePage />} />
          {/* <Route path="/create-store" element={<CreateStore />} />
          <Route path="/update-store" element={<UpdateStore />} /> */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
