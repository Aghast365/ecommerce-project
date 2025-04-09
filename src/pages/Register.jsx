import React, {useState, useContext} from 'react';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';

import PageContext from '../context/PageContext';
import {signUp} from '../api/userAPI.js';

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const CenteredCard = styled(Card)`
	width: 75vw;
	max-width: 40rem;
	margin: auto;
	margin-top: 40px;
	background-color: #EEE;
`

const Header = styled(Card.Header)`
	background-color: #DDD;
`

const Body = styled(Card.Body)`
	width: 70vw;
	max-width: 30rem;
	margin: auto;
`

const Group = styled(InputGroup)`
	margin: 1rem 0;
`

const SignUpButton = styled(Button)`
	float:right;
`
const ClearFix = styled.span`
	display:block;
	clear:both;
	line-height:0;
	height:0;
	
`

const Register = () => {
	const [validated, setValidated] = useState(false);
	const [emailMessage, setEmailMessage] = useState("Please enter a valid email.");
	const {user, setUser} = useContext(PageContext);
	const navigate = useNavigate();
	
	const validateForm = (e) => {
		const email = document.querySelector('#signup-email');
		const pass = document.querySelector('#signup-password');
		const conf = document.querySelector('#signup-confirm-password');
		const marketing = document.querySelector('#allow-marketing');
		if (conf.value != pass.value) {
			conf.setCustomValidity("Passwords do not match.");
		} else {
			conf.setCustomValidity("");
		}
		
		email.setCustomValidity("");
		if (!email.checkValidity()) {
			setEmailMessage("Please enter a valid email.");
		}
		
		let valid = e.target.checkValidity();
		
		e.preventDefault();
		if(valid) {
			let response = signUp(email.value, pass.value);
			if (response == 0) {
				setEmailMessage("An account already exists using this email.");
				email.setCustomValidity("An account already exists using this email.");
			} else {
				email.setCustomValidity("");
				setUser(response);
				navigate('/');
			}
		}
		
		setValidated(true);
	}
	
	return (
		<CenteredCard>
			<Header><h1>Create an Account</h1></Header>
			<Body>
				<Form noValidate validated={validated} onSubmit={validateForm}>
					<Group hasValidation>
						<Form.Control id='signup-email' type='email' placeholder='Email' required />
						<Form.Control.Feedback type='invalid'>
							{emailMessage}
						</Form.Control.Feedback>
					</Group>
					<Group hasValidation>
						<Form.Control id='signup-password' type='password' placeholder='Password' required />
						<Form.Control.Feedback type='invalid'>
							Password cannot be blank.
						</Form.Control.Feedback>
					</Group>
					<hr/>
					<Group hasValidation>
						<Form.Control id='signup-confirm-password' type='password' placeholder='Confirm password' />
						<Form.Control.Feedback type='invalid'>
							Passwords do not match.
						</Form.Control.Feedback>
					</Group>
					<Group>
						<Form.Check id='allow-marketing' label='Opt-in to recieve news of exciting deals and promotions at this address'/>
					</Group>
					<SignUpButton type='submit'>Sign Up</SignUpButton>
					<ClearFix />
				</Form>
			</Body>
		</CenteredCard>
	);
}

export default Register;