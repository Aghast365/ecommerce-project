import React from 'react';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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

const Container = styled.div`
	margin: 0;
	padding: 0;
	display: flex;
	flex-direction: column;
	min-height: 100%;
	width: 100%;
	height: 100%;
	overflow: auto;
`

const Content = styled.div`
	flex: 1 0 fit-content;
	display: flex;
`

const App = () => {
	return (
		<PageContextProvider>
			<Router>
				<Container id='page-root'>
				<Navbar />
					<Content id='page-content'>
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
					</Content>
					<Footer />
				</Container>
			</Router>
		</PageContextProvider>
	);
};

export default App;
