import React, {useState, useContext} from 'react';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';

import PageContext from '../context/PageContext';
import {changePassword} from '../api/userAPI.js';

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

const ChangePassword = () => {
	const [validated, setValidated] = useState(false);
	const {user, setUser} = useContext(PageContext);
	const navigate = useNavigate();
	
	const validateForm = (e) => {
		const old = document.querySelector('#old-password');
		const pass = document.querySelector('#new-password');
		const conf = document.querySelector('#confirm-password');
		if (conf.value != pass.value) {
			conf.setCustomValidity("Passwords do not match.");
		} else {
			conf.setCustomValidity("");
		}
		let valid = e.target.checkValidity();
		
		old.setCustomValidity("");
		e.preventDefault();
		if(valid) {
			let response = changePassword(old.value, pass.value, user);
			if (response == 0) {
				old.setCustomValidity("incorrect password");
			}
			else {
				navigate("/profile");
			}
		}
		
		setValidated(true);
	}
	
	return (
		<CenteredCard>
			<Header><h1>Change Password</h1></Header>
			<Body>
				<Form noValidate validated={validated} onSubmit={validateForm}>
					<Group hasValidation>
						<Form.Control id='old-password' type='password' placeholder='Old password' required />
						<Form.Control.Feedback type='invalid'>
							Please enter your current password.
						</Form.Control.Feedback>
					</Group>
					<Group hasValidation>
						<Form.Control id='new-password' type='password' placeholder='New password' required />
						<Form.Control.Feedback type='invalid'>
							Please enter a valid password.
						</Form.Control.Feedback>
					</Group>
					<hr/>
					<Group hasValidation>
						<Form.Control id='confirm-password' type='password' placeholder='Confirm password' />
						<Form.Control.Feedback type='invalid'>
							Passwords do not match.
						</Form.Control.Feedback>
					</Group>
					<SignUpButton type='submit'>Change</SignUpButton>
					<ClearFix />
				</Form>
			</Body>
		</CenteredCard>
	);
}

export default ChangePassword;