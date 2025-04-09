import React, {useState, useContext, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import styled from 'styled-components';

import PageContext from '../context/PageContext';

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

const ForgotPassword = () => {
	const [validated1, setValidated1] = useState(false);
	const [validated2, setValidated2] = useState(false);
	const [page, setPage] = useState(0);
	const {user, setUser} = useContext(PageContext);
	const {passwordResetKey} = useParams()
	const navigate = useNavigate()
	
	useEffect(()=>{
		if (passwordResetKey) setPage(2)
	}, [passwordResetKey]);
	
	const validateForm1 = (e) => {
		
		let valid = e.target.checkValidity();
		e.preventDefault();
		if(valid) {
			setPage(1);
		}
		
		setValidated1(true);
	}
	
	const validateForm2 = (e) => {
		const pass = document.querySelector('#new-password');
		const conf = document.querySelector('#confirm-new-password');
		
		if(conf.value != pass.value) {
			conf.setCustomValidity("Passwords do not match.");
		} else {
			conf.setCustomValidity("");
		}
		let valid = e.target.checkValidity();
		e.preventDefault();
		if(valid) {
			setUser(user);
			navigate("/");
		}
		
		setValidated2(true);
	}
	
	return (
		<CenteredCard>
			<Header><h1>Forgot Password</h1></Header>
			<Body>
				{page == 0 &&
					<>
					<Card.Text>
						Enter the email associated with the account:
					</Card.Text>
					<Form noValidate validated={validated1} onSubmit={validateForm1}>
						<Group hasValidation>
							<Form.Control id='password-reset-email' type='email' placeholder='Email' required />
							<Form.Control.Feedback type='invalid'>
								Please enter a valid email.
							</Form.Control.Feedback>
						</Group>
						<SignUpButton type='submit'>Send</SignUpButton>
						<ClearFix />
					</Form>
					</>
				}
				{page == 1 &&
					<Card.Text>
						Check your email and follow the instructions to reset your password.
					</Card.Text>
				}
				{page == 2 &&
					<>
					<Card.Text>
						Set a new password for the account:
					</Card.Text>
					<Form noValidate validated={validated2} onSubmit={validateForm2}>
						<Group hasValidation>
							<Form.Control id='new-password' type='password' placeholder='Password' required />
							<Form.Control.Feedback type='invalid'>
								Password cannot be blank
							</Form.Control.Feedback>
						</Group>
						<Group hasValidation>
							<Form.Control id='confirm-new-password' type='password' placeholder='Confirm Password' />
							<Form.Control.Feedback type='invalid'>
								Passwords do not match.
							</Form.Control.Feedback>
						</Group>
						<SignUpButton type='submit'>Send</SignUpButton>
						<ClearFix />
					</Form>
					</>
				}
			</Body>
		</CenteredCard>
	);
}

export default ForgotPassword;