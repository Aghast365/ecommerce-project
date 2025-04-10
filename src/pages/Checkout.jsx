import React, {useState, useRef, useContext} from 'react';
import styled from 'styled-components';

import PageContext from '../context/PageContext';

import AddressForm from '../components/AddressForm';
import BillingForm from '../components/BillingForm';
import OrderSummary from '../components/OrderSummary';
import OrderConfirmation from '../components/OrderConfirmation';

import Button from 'react-bootstrap/Button';

const Col = styled.div`
	margin: 2rem auto;
	width: 70%; 
	display: flex; 
	flex-direction: column;
`
const Row = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	margin: 1rem;
`

const Checkout = () => {
	const {cart, setCart} = useContext(PageContext);

	const addressRef = useRef(null);
	const [address, setAddress] = useState({});
	
	const billingRef = useRef(null);
	const [billing, setBilling] = useState({});
	
	const [page, setPage] = useState(1);
	
	const back = () => {
		setPage(page-1>0 ? page-1 : 1);
	}
	
	const submitAddress = () => {
		let addressValid = addressRef.current();
		if (addressValid) {
			setPage(2);
		}
	}
	
	const submitBilling = () => {
		let billingValid = billingRef.current();
		if (billingValid) {
			setPage(3);
		}
		
	}
	
	const placeOrder = () => {
		setCart([]);
		setPage(4);
	}
	
	return (
		<Col>
			{page==1&&	
				<>
					<AddressForm addressState={[address, setAddress]} ref={addressRef} />
			
					<Button variant='warning' onClick={submitAddress} style={{marginLeft: 'auto'}}> Next ></Button>
				</>
			}
			{page==2&&
				<>
					<BillingForm billingState={[billing, setBilling]} ref={billingRef} />
					
					<Row>
						<Button variant='warning' onClick={back} style={{marginRight: 'auto'}}>&lt; Previous </Button>
						<Button variant='warning' onClick={submitBilling} style={{marginLeft: 'auto'}}> Next ></Button>
					</Row>
				</>
			}
			{page==3 &&
				<>
					<OrderSummary placeOrder={placeOrder} address={address} billing={billing}/>
					<Button variant='warning' onClick={back} style={{marginRight: 'auto'}}>&lt; Previous </Button>
				</>
			}
			{page == 4 &&
				<OrderConfirmation/>
			}
		</Col>
	);
}

export default Checkout;