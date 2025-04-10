import React, {useContext} from 'react';
import styled from 'styled-components';

import PageContext from '../context/PageContext';
import fetchProducts from '../api/productAPI.js';

import Alert from 'react-bootstrap/Alert';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
	background-color: #eee;
	display:block;
	padding: 10px 15px;
`

const InfoBox = ({children}) => {
	return (
	<Box>
		{children}
	</Box>
	);
};

const P = styled.p`
	font-size: 14pt;
	margin: 0;
	padding: 0;
`
const FlexRow = styled.div`
	display: block flex;
	justify-content: space-between;
	flex-wrap: wrap;
`


const Gap = styled.span`
	display: inline-block;
	width:.25rem;
`

const Address = ({address}) => {
	const {firstname, lastname, street1, street2, city, state, zip} = address;
	const P = styled.p`
		margin:0;
		padding:0;
	`
	return (
		<>
		<InfoBox>
			<div>
				<P>{firstname} {lastname}</P>
				<P>{street1}</P>
				<P>{street2}</P>
				<P>
					<span>{city}, </span>
					<span>{state}</span>
					<Gap/>
					<span>{zip}</span>
				</P>
			</div>
		</InfoBox>
		</>
	);
}

const CardType = styled(Col)`
	& div {
		height: 100%;
		display: table;
		margin-right: 12px;
	}
	& div span {
		display: table-cell;
		vertical-align: middle;
		baseline: middle;
	}
`

const Billing = ({billing}) => {
	const {useshipping, firstname, lastname, street1, street2, city, state, zip, paymenttype, cardfirstname, cardlastname, cardnumber, cv} = billing;
	const P = styled.p`
		margin:0;
		padding:0;
	`
	return (
		<>
		{useshipping !== 'true' &&
			<Address address={{firstname, lastname, street1, street2, city, state, zip}} />
		}
		<InfoBox>
			<Row>
				<Col md='auto'>
					<P style={{fontWeight: 'bold'}}>{paymenttype.charAt(0).toUpperCase() + paymenttype.slice(1)}</P>
					<P>{cardfirstname} {cardlastname}</P>
					<P>{cardnumber}</P>
					<P>CV: {cv}</P>
				</Col>
			</Row>
		</InfoBox>
		</>
	)
}



const CartItem = ({product, pricePer, discount, cartItem}) => {
	let quantity = cartItem.quantity;
	let discountPercent = discount < 1 ? Math.round((1-discount)*100*100)/100 + '%' : 'None';
	let discountPricePer = pricePer*discount;
	let total = pricePer*discount*quantity;
	
	return (
		<Alert variant='secondary' key={cartItem.id}>
		<FlexRow>
			<Image thumbnail style={{width: '8rem', height: '8rem', objectFit: 'contain'}} src={product.image}/>
			
			
			<div className='vr' style={{margin: '0 12px'}}/>
			
			<div style={{display: 'flex', flexDirection: 'column'}}>
				<FlexRow>
					<h3>{product.name}</h3>
				</FlexRow>
				<FlexRow style={{marginTop: 'auto'}}>
					<span style={{verticalAlign: 'middle', display: 'inline', marginRight: '12px'}}> Amount: {cartItem.quantity}</span>
				</FlexRow>
			</div>
			
			<div className='vr' style={{margin: '0 12px'}}/>
			
			<div style={{display: 'flex', flexDirection: 'column'}}>
				<FlexRow>
					<span style={{marginRight: '24px'}}>Price per item: </span>
					<span>${pricePer}</span>
				</FlexRow>
				<FlexRow>
					<span style={{marginRight: '24px'}}>Bulk discount: </span>
					<span>{discountPercent}</span>
				</FlexRow>
				<FlexRow>
					<span style={{marginRight: '24px'}}>Discounted price per: </span> 
					<span>${discountPricePer}</span>
				</FlexRow>
				<FlexRow style={{marginTop: 'auto', }}>
					<span style={{marginRight: '24px', fontSize: '16pt'}}>Total:</span> 
					<span style={{fontSize: '16pt'}}>${total}</span>
				</FlexRow>
			</div>
		</FlexRow>
		</Alert>
	)
}

const OrderSummary = ({placeOrder, address, billing}) => {
	
	const {cart, setCart} = useContext(PageContext);
	
	const cartItem = (i) => structuredClone(cart[i]);
	
	let CartItems = [];
	let subTotal = 0;
	
	for (let i in cart) {
		let product = fetchProducts({id: cart[i].id}).filteredProducts;
		product = product.length>0 ? product[0] : null;
		let pricePer = product.price;
		let discount = 1; 
		let quantity = cart[i].quantity;
		for (let i in product.discounts) {
			if (quantity>=Number(i)) {
				discount = product.discounts[i]
			}
		}
		
		subTotal += pricePer*discount*quantity;
		
		CartItems.push(
			<CartItem 
				product={product}
				pricePer={pricePer}
				discount={discount}
				cartItem={cartItem(i)} 
			/>
		);
	}
	
	let tax = Math.round(subTotal*.02*100)/100;
	let total = subTotal+tax;
	
	return (
		<div style={{flex: '1 1 auto', flexWrap: 'wrap'}}>
			<FlexRow>
				<h2>Order Summary</h2>
			</FlexRow>
			<hr />
			<FlexRow>
				<div style={{display: 'flex', flexDirection: 'column'}}>
					{CartItems}	
				</div>
				<Card>
					<Card.Header as='h3'>Cart Summary</Card.Header>
					<Card.Body style={{display: 'flex', flexDirection: 'column'}}>
						<h4>Address</h4>
						<Address address={address} />
						<hr />
						<h4>Billing</h4>
						<Billing billing={billing}/>
						<hr />
						<FlexRow><span>Subtotal:</span> <span>${subTotal}</span></FlexRow>
						<FlexRow><span>Tax:</span> <span>${tax}</span></FlexRow>
						<FlexRow><span>Total:</span> <span>${total}</span></FlexRow>
						<hr/>
						<Button style={{marginLeft: 'auto'}} onClick={placeOrder} variant='warning'>Place Order</Button>
					</Card.Body>
				</Card>
			</FlexRow>
		</div>
	);
	
}

export default OrderSummary;