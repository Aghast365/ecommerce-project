import React, {useContext} from 'react';
import styled from 'styled-components';

import PageContext from '../context/PageContext';
import fetchProducts from '../api/productAPI.js';

import Alert from 'react-bootstrap/Alert';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

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

const OrderSummary = ({placeOrder}) => {
	
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