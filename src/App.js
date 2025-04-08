import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserContextProvider } from './context/UserContextProvider.jsx';
import { PageContextProvider } from './context/PageContext.jsx';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import About from './pages/About';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import Register from './pages/Register';
import ChangePassword from './pages/ChangePassword';
import ForgotPassword from './pages/ForgotPassword';
import Checkout from './pages/Checkout';



const App = () => {
	return (
		<UserContextProvider>
		<PageContextProvider>
			<Router>
				<Navbar />
				<Routes>
					<Route path="/" Component={Home} />
					<Route path="/products" Component={Products} />
					<Route path="/about" Component={About} />
					<Route path="/products/:productID" Component={Product} />
					<Route path="/cart" Component={Cart} />
					<Route path="/profile" Component={Profile} />
					<Route path="/register" Component={Register} />
					<Route path="/change-password" Component={ChangePassword} />
					<Route path="/forgot-password" Component={ForgotPassword} />
					<Route path="/forgot-password/:passwordResetKey" Component={ForgotPassword} />
					<Route path="/checkout" Component={Checkout} />
				</Routes>
				<Footer />
			</Router>
		</PageContextProvider>
		</UserContextProvider>
	);
};

export default App;
