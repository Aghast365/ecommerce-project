import React, {useState} from 'react';
import styled from 'styled-components';

import {Link} from 'react-router-dom';
import {logIn} from '../api/userAPI.js';

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

const LoginForm = ({setUser, setShowLoginForm, ...props}) => {
	const [emailValid, setEmailValid] = useState(0);
	const [emailFeedback, setEmailFeedback] = useState("Please enter a valid email.");
	const [passValid, setPassValid] = useState(0);
	const [passFeedback, setPassFeedback] = useState("Please enter a valid password");
	
	const validateForm = (e) => {
		e.preventDefault();
		const email = document.querySelector('#login-email');
		const pass = document.querySelector('#login-password');
		
		if (email.checkValidity() && pass.checkValidity()) {
			let response = logIn(email.value, pass.value);
			if (response == -1) {
				setEmailValid(-1);
				setEmailFeedback("No account associated with this email.");
				setPassValid(0);
			} else if (response == 0) {
				setEmailValid(1);
				setPassValid(-1);
				setPassFeedback("Incorrect password");
			} else {
				setEmailValid(1);
				setPassValid(1);
				setUser(response);
				setShowLoginForm(false);
			}
		} else {
			if (email.checkValidity())
				setEmailValid(1);
			else {
				setEmailValid(-1);
				setEmailFeedback("Please enter a valid email.");
			}
			
			if (pass.checkValidity())
				setPassValid(0);
			else {
				setPassValid(-1);
				setPassFeedback("Password is required.");
			}
		} 
	}
	
	return (
		<Popover {...props}>
			<Popover.Header as='h3'>Login</Popover.Header>
			<Popover.Body>
				<Form noValidate onSubmit={validateForm}>
					<InputGroup>
						<InputGroup.Text><IoIosMail /></InputGroup.Text>
						<Form.Control type='email' placeholder="Email" id='login-email' onInput={()=>setEmailValid(0)} isValid={emailValid==1} isInvalid={emailValid==-1} required />
						<Form.Control.Feedback type="invalid">
							{emailFeedback}
						</Form.Control.Feedback>
					</InputGroup>
					<InputGroup>
						<InputGroup.Text><IoIosKey /></InputGroup.Text>
						<Form.Control type='password' placeholder="Password" id='login-password' onInput={()=>setPassValid(0)} isValid={passValid==1} isInvalid={passValid==-1} required />
						<Form.Control.Feedback type="invalid">
							{passFeedback}
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