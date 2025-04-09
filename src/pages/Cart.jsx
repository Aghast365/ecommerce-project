import React, {useContext} from 'react';
import styled from 'styled-components';

import {Link} from 'react-router-dom';
import PageContext from '../context/PageContext';
import fetchProducts from '../api/productAPI.js';

import Alert from 'react-bootstrap/Alert';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import QuantitySelector from '../components/QuantitySelector';

import {IoIosTrash} from 'react-icons/io';

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
const TrashIcon = styled(IoIosTrash )`
	width: 1.5rem;
	height: 1.5rem;
`

const CartItem = ({product, pricePer, discount, cartItemState}) => {
	const [cartItem, setCartItem] = cartItemState;

	let quantity = cartItem.quantity;
	let discountPercent = discount < 1 ? Math.round((1-discount)*100*100)/100 + '%' : 'None';
	let discountPricePer = pricePer*discount;
	let total = pricePer*discount*quantity;
	
	let amt = cartItem.quantity;
	let setAmt = (amt) => {setCartItem({...cartItem, quantity: amt})};
	
	
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
					<span style={{verticalAlign: 'middle', display: 'inline', marginRight: '12px'}}> Amount: </span><QuantitySelector style={{marginTop: 'auto'}} quantityState={[amt, setAmt]} />
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
			
			<div className='vr' style={{margin: '0 12px'}}/>
			
			<div style={{display: 'flex', flexDirection: 'column'}}>
				<Button variant='secondary' style={{margin: 'auto'}} onClick={()=>setCartItem(null)}><TrashIcon /></Button>
			</div>
		</FlexRow>
		</Alert>
	)
}

const Cart = () => {
	const {cart, setCart} = useContext(PageContext);
	
	const cartItem = (i) => structuredClone(cart[i]);
	const setCartItem = (i) => {
		return (newCartItem) => {
			let newCart = structuredClone(cart);
			if (!newCartItem) newCart.splice(i, 1);
			else newCart[i] = newCartItem;
			setCart(newCart);
		}
	}
	
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
				cartItemState={[cartItem(i), setCartItem(i)]} 
			/>
		);
	}
	
	let tax = Math.round(subTotal*.02*100)/100;
	let total = subTotal+tax;
	
	return (
		<div style={{padding: '2rem', width:'100%'}}>
			<FlexRow>
				<h2>Cart</h2>
			</FlexRow>
			<hr />
			<FlexRow>
				<div style={{display: 'flex', flexDirection: 'column'}}>
					{CartItems}	
				</div>
				<Card>
					<Card.Header as='h3'>Cart Summary</Card.Header>
					<Card.Body>
						<FlexRow><span>Subtotal:</span> <span>${subTotal}</span></FlexRow>
						<FlexRow><span>Tax:</span> <span>${tax}</span></FlexRow>
						<FlexRow><span>Total:</span> <span>${total}</span></FlexRow>
						<hr/>
						<Button variant='warning' as={Link} to='/checkout'>Proceed to Checkout</Button>
					</Card.Body>
				</Card>
			</FlexRow>
		</div>
	);
}

export default Cart;