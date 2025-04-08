import React, {useState, useContext} from 'react';
import styled from 'styled-components';

import { UserContext } from '../context/UserContextProvider.jsx';

import { Link } from 'react-router-dom';
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
	const [shown, setShown] = profileMenuState;
	return (
		<NavItem
			ref={ref}
			onClick={(e) => {
				e.preventDefault();
				onClick(e);
				setShown(!shown);
			}}
		>
			{children}
		</NavItem>
	);
});

const ProfileMenu = styled(Dropdown)`
	display: inline-block;
	vertical-align: top;
`
const ProfileDropdown = () => {

	const [user, setUser] = useContext(UserContext);
	const [loggedIn, setLoggedIn] = [user, setUser]
	const profileMenuState = useState(false);
	const [profileMenuShown, setProfileMenuShown] = profileMenuState;
	const [loginFormShown, setLoginFormShown] = useState(false);
	
	const LoginWithState = <LoginForm setLoggedIn={setLoggedIn} setLoginFormShown={setLoginFormShown} />;

	return (
		<ProfileMenu 
			autoClose='outside' 
			onToggle={
				(nextShow)=>{
					if(!loginFormShown && !nextShow) {  
						setProfileMenuShown(false)
					}
				}
			} 
			show={profileMenuShown}
		>
			<Dropdown.Toggle as={ProfileMenuToggle} profileMenuState={profileMenuState}>
				<ProfileIcon alt='Profile' />
			</Dropdown.Toggle>
			<Dropdown.Menu>
				{user != null &&
					<div>
						<Dropdown.Item as={Link} to='/profile' onClick={() => setProfileMenuShown(false)}>My Info</Dropdown.Item>
						<Dropdown.Item onClick={() => {setLoggedIn(null)}}>Log Out</Dropdown.Item>
					</div>
				}
				{user == null &&
					<div>
						<Dropdown.Item as={Link} to='/register' onClick={() => setProfileMenuShown(false)}>Sign Up</Dropdown.Item>
						<OverlayTrigger rootClose='true' trigger='click' placement='left' overlay={LoginWithState} onToggle={(nextShow)=>setLoginFormShown(nextShow)} show={loginFormShown}>
							<Dropdown.Item>Log In</Dropdown.Item>
						</OverlayTrigger>
					</div>
				}
			</Dropdown.Menu>
		</ProfileMenu>
	)
}

export default ProfileDropdown;