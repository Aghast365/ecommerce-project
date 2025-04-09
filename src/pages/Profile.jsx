import React, {useState, useContext} from 'react';
import styled from 'styled-components';

import PageContext from '../context/PageContext';
import {deleteUser, fetchUserData} from '../api/userAPI.js';

import {Link, useNavigate} from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';

import Visa from '../assets/visa.png';

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
	max-width: 35rem;
	margin: auto;
`

const Right = styled.div`
	display: table;
	position: absolute;
	height: 100%;
	top: 0;
	bottom: 0;
	right:15px;
	
	& span {
		display: table-cell;
		vertical-align: middle;
	}
	& span a {
		margin-left: 10px;
	}
`
const ClearFix = styled.span`
	display:block;
	clear:both;
	line-height:0;
	height:0;
`

const Box = styled(Container)`
	position:relative;
	background-color: #fff;
	display:block;
	padding: 10px 15px;
`

const InfoBox = ({children}) => {
	return (
	<Box>
		{children}
		<Right>
		<span>
			<a href="#">Edit</a><a href="#">Remove</a>
		</span>
		</Right>
		<ClearFix />
	</Box>
	);
};

const P = styled.p`
	margin:0;
	padding:0;
`

const Gap = styled.span`
	display: inline-block;
	width:1rem;
`

const Address = ({name, street1, street2, city, state, zip}) => {
	return (
		<div>
			<P>{name}</P>
			<P>{street1}</P>
			<P>{street2}</P>
			<P>
				<span>{city}, </span>
				<span>{state}</span>
				<Gap/>
				<span>{zip}</span>
			</P>
		</div>
	);
}

const CardType = styled(Col)`
	& div {
		height: 100%;
		display: table;
	}
	& div span {
		display: table-cell;
		vertical-align: middle;
		baseline: middle;
	}
`

const Billing = ({type, name, number, zip}) => {
	return (
		<Row>
			<CardType md='auto'>
				<div><span><img src={Visa} height="20" /></span></div>
			</CardType>
			<Col md='auto'>
				<P>{name}</P>
				<P>{number}</P>
				<P>Zip: {zip}</P>
			</Col>
		</Row>
	)
}

const FRight = styled.div`
	float:right;
`

const Check = styled(Form.Check)`
	margin-top:5px;
`

const Profile = () => {
	const {user, setUser, loggedIn} = useContext(PageContext);
	const [showDeleteDialog, setShowDeleteDialog] = useState(false);
	const navigate = useNavigate();
	
	const handleClose = () => setShowDeleteDialog(false);
	const handleShow = () => setShowDeleteDialog(true);
	const handleDelete = () => {
		setShowDeleteDialog(false);
		setUser(deleteUser(user));
		navigate('/');
	}
	
	return (
		<CenteredCard>
			<Header><h1>My Information</h1></Header>
			<Body>
			{!loggedIn &&
				<Card.Text>Not logged in, nothing to display.</Card.Text>
			}
			{loggedIn && <>
				<h2>Address</h2>
				<InfoBox>
					<Address name="Joe Smith" street1="759 Walabee Ln" street2="Apt 754C" city="Centerville" state="CA" zip="94126"/>
				</InfoBox>
				<hr/>
				<h2>Billing</h2>
				<InfoBox>
					<Billing type="Visa" name="Joe Smith" number="XXXX-XXXX-7834" zip="94126" />
				</InfoBox>
				<hr/>
				<h2>Account</h2>
				<Link to='/change-password'><Button>Change Password</Button></Link>
				<Check label="Allow marketing emails" />
				<ClearFix/>
				<hr />
				<FRight>
					<Button variant='danger' onClick={handleShow}>Delete Account</Button>
				</FRight>
				<ClearFix/>
				
				<Modal show={showDeleteDialog} onHide={handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Delete Account</Modal.Title>
					</Modal.Header>
					<Modal.Body>Are you sure you want to delete your account?</Modal.Body>
					<Modal.Footer>
						<Button variant="danger" onClick={handleDelete}>
							Delete
						</Button>
						<Button variant="primary" onClick={handleClose}>
							Cancel
						</Button>
					</Modal.Footer>
				</Modal>
				
			</>}
			</Body>
		</CenteredCard>
	);
}

export default Profile;