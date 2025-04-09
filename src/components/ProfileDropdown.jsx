import React, {useState, useContext} from 'react';
import styled from 'styled-components';

import { Link } from 'react-router-dom';
import PageContext from '../context/PageContext';

import Dropdown from 'react-bootstrap/Dropdown';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

import LoginForm from './LoginForm';

import {  IoIosPerson  } from "react-icons/io";

const ProfileIcon = styled(IoIosPerson)`
	width: 2rem; 
	height: 2rem;
	margin-top: .5em;
	vertical-align: top;
`

const NavItem = styled.div`
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
	cursor: pointer;
	
	.aligned-right & {
		border-right: 0;
		border-left: 1px solid #555;
	}
`

const ProfileMenuToggle = React.forwardRef(({ children, onClick, profileMenuState }, ref) => {
	const [show, setShow] = profileMenuState;
	return (
		<NavItem
			ref={ref}
			onClick={(e) => {
				e.preventDefault();
				onClick(e);
				setShow(!show);
			}}
		>
			<ProfileIcon alt='Profile' />
		</NavItem>
	);
});

const ProfileMenu = styled(Dropdown)`
	display: inline-block;
	vertical-align: top;
`
const ProfileDropdown = () => {

	const { loggedIn, logOut, setUser } = useContext(PageContext);
	const [showProfileMenu, setShowProfileMenu] = useState(false);
	const [showLoginForm, setShowLoginForm] = useState(false);
	
	const LoginWithState = <LoginForm setUser={setUser} setShowLoginForm={setShowLoginForm} />;

	return (
		<ProfileMenu 
			autoClose='outside' 
			onToggle={(nextShow)=>{
				if(!showLoginForm && !nextShow) {  
					setShowProfileMenu(false);
				}
			}} 
			show={showProfileMenu}
		>
			<Dropdown.Toggle as={ProfileMenuToggle} profileMenuState={[showProfileMenu, setShowProfileMenu]} />
			<Dropdown.Menu>
				{loggedIn &&
					<div>
						<Dropdown.Item as={Link} to='/profile' onClick={() => setShowProfileMenu(false)}>My Info</Dropdown.Item>
						<Dropdown.Item onClick={logOut}>Log Out</Dropdown.Item>
					</div>
				}
				{!loggedIn &&
					<div>
						<Dropdown.Item as={Link} to='/register' onClick={() => setShowProfileMenu(false)}>Sign Up</Dropdown.Item>
						<OverlayTrigger rootClose='true' trigger='click' placement='left' overlay={LoginWithState} onToggle={(nextShow)=>setShowLoginForm(nextShow)} show={showLoginForm}>
							<Dropdown.Item>Log In</Dropdown.Item>
						</OverlayTrigger>
					</div>
				}
			</Dropdown.Menu>
		</ProfileMenu>
	)
}

export default ProfileDropdown;