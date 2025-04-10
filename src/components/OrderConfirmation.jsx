import React, {useContext} from 'react';
import styled from 'styled-components'

import {Link} from 'react-router-dom';
import PageContext from '../context/PageContext';

import Button from 'react-bootstrap/Button';

const OrderConfirmation = () => {
	const {loggedIn} = useContext(PageContext);
	let conf = Math.floor(Math.random()*10000000);
	return (
		<>
			<h1>Order Placed</h1>
			<hr />
			{loggedIn && 
				<p>A reciept for this transaction has been sent to your email.</p>
			}
			<p>Confirmation Number: {conf}</p>
			<Button variant='secondary' as={Link} to='/products'>Return to Store</Button>
		</>
	)
}

export default OrderConfirmation;