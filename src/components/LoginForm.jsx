import React, {useState} from 'react';
import styled from 'styled-components';

import {Link} from 'react-router-dom';
import Popover from 'react-bootstrap/Popover';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

import { IoIosMail, IoIosKey } from "react-icons/io";

const ForgotPasswordLink = styled(Link)`
	float: left;
`
const LoginButton = styled(Button)`
	float: right;
	margin-top: 5px;
`;
const ClearFix = styled.span`
	display:block;
	clear: both;
	line-height: 0;
	height: 0;
`

const validateForm = (e, setLoggedIn, setLoginFormShown, setEmailValid, setPassValid) => {
	e.preventDefault();
	const email = document.querySelector('#login-email');
	const pass = document.querySelector('#login-password');
	let emailValid = 0, passValid = 0;
	
	if (email.checkValidity()) emailValid = 1;
	else emailValid = 2;
	if (pass.checkValidity()) passValid = 1;
	else passValid = 2;
	
	if (emailValid == 1 && passValid == 1) {
		setLoggedIn(1);
		setLoginFormShown(false);
	} else {
		setEmailValid(emailValid);
		setPassValid(passValid);
	}
	
}

const LoginForm = ({setLoggedIn, setLoginFormShown, ...props}) => {
	const [emailValid, setEmailValid] = useState(0);
	const [passValid, setPassValid] = useState(0);
	
	return (
		<Popover {...props}>
			<Popover.Header as='h3'>Login</Popover.Header>
			<Popover.Body>
				<Form noValidate onSubmit={(e)=>{validateForm(e, setLoggedIn, setLoginFormShown, setEmailValid, setPassValid)}}>
					<InputGroup>
						<InputGroup.Text><IoIosMail /></InputGroup.Text>
						<Form.Control type='email' placeholder="Email" id='login-email' onInput={()=>setEmailValid(0)} isValid={emailValid==1} isInvalid={emailValid==2} required />
						<Form.Control.Feedback type="invalid">
							Please enter a valid email.
						</Form.Control.Feedback>
					</InputGroup>
					<InputGroup>
						<InputGroup.Text><IoIosKey /></InputGroup.Text>
						<Form.Control type='password' placeholder="Password" id='login-password' onInput={()=>setPassValid(0)} isValid={passValid==1} isInvalid={passValid==2} required />
						<Form.Control.Feedback type="invalid">
							Incorrect password.
						</Form.Control.Feedback>
					</InputGroup>
					<ForgotPasswordLink to='/forgot-password'>Forgot Password</ForgotPasswordLink>
					<LoginButton type='submit'>Login</LoginButton>
					<ClearFix />
				</Form>
			</Popover.Body>
		</Popover>
	)
}

export default LoginForm;