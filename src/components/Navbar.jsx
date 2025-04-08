import React, {useState, useContext} from 'react';
import styled from 'styled-components';

import { Link } from 'react-router-dom';
import Search from './Search';
import ProfileDropdown from './ProfileDropdown';
import PageContext from '../context/PageContext';

import siteLogo from '../assets/logo192.png';
import { IoIosCart  } from "react-icons/io";

const Nav = styled.nav`
	z-index: 3;
	height: fit-content;
	width: 100%;
	background-color: #CCCCCC;
	margin: 0;
	padding: 0;
	position: fixed;
	top: 0;
	display: flex;
	flex-wrap: wrap;
	
`;

const Padding = styled.div`
	width: 100%;
	height: 3rem;
	display: block;
	@media (max-width: 746px) {
		height: 6rem;
	}
`;

const Logo = styled.img`
	width: 3rem;
	height: 3rem; 
	display: inline-block;
	vertical-align:top;
`;

const NavLink = styled(Link)`
	height: 3rem;
	width: 5rem;
	text-align: center;
	line-height: 3rem;
	background-color: #EEEEEE;
	display: inline-block;
	text-decoration: none;
	color: #555;
	vertical-align: top;
	border-right: 1px solid #555;
	
	flex-shrink: 0;
	
	.aligned-right & {
		border-right: 0;
		border-left: 1px solid #555;
	}
`;

const Right = styled.div.attrs(({ className }) => ({
	className: (className || "") + " aligned-right"	
}))`
	flex-grow: 1;
	justify-self: end;
	display: flex;
	justify-content: end;
`
const ClearFix = styled.span`
	clear: both;
	display: block;
`

const CartContainer = styled.div`
	display: inline-block;
	width: 3rem;
	height: 3rem;
	position: relative;
`

const CartIcon = styled(IoIosCart)`
	width: 2rem; 
	height: 2rem;
	margin-top: .5rem;
	vertical-align:top;
`

const CartItemNumber = styled.span`
	display: inline-flex;
	position: absolute;
	top: .25rem;
	right: 0;
	background-color: #7C7;
	width: fit-content;
	padding: 0 4pt;
	height: 1rem;
	border-radius: .5rem;
	font-size: 10pt;
	line-height: 1rem;
	vertical-align: center;
	text-align: center;
	font-weight: bold;
	color: #EEE;
	align-items: center;
	dominant-baseline: mathematical;
`
const CartWithNumber = () => {
	const {cart} = useContext(PageContext);
	return (		
		<CartContainer>
			<CartItemNumber>{cart.length}</CartItemNumber>
			<CartIcon alt='Cart'/>
		</CartContainer>
	)
}

const NavSearch = styled(Search)`
	max-width: 40rem;
	flex-grow: 2;
`



const Navbar = () => {
	return (
		<>
			<Nav>
				<NavLink to="/"><Logo src={siteLogo} alt='VD Logo' /></NavLink>
				<NavLink to="/">Home</NavLink>
				<NavLink to="/products">Products</NavLink>
				<NavLink to="/about">About</NavLink>
				<Right>
					<NavSearch />
					<NavLink to="/cart"> <CartWithNumber /></NavLink>
					<ProfileDropdown />
				</Right>
				<ClearFix />
			</Nav>
			<Padding />
		</>
	);
};


export default Navbar;