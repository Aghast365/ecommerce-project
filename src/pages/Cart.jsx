import React, {useContext} from 'react';
import styled from 'styled-components';

import PageContext from '../context/PageContext';
import fetchProducts from '../assets/productAPI.js';

import Alert from 'react-bootstrap/Alert';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import QuantitySelector from '../components/QuantitySelector';

const P = styled.p`
	font-size: 14pt;
	margin: 0;
	padding: 0;
`

const CartItem = ({id, quantity, cartItemState}) => {
	const [cartItem, setCartItem] = cartItemState;
	
	let product = fetchProducts({id: id}).filteredProducts;
	product = product.length>0 ? product[0] : null;
	let pricePer = product.price;
	let discount = 1; 
	for (let i in product.discounts) {
		if (quantity>=Number(i)) {
			discount = product.discounts[i]
		}
	}
	
	
	
	return (
		<Alert variant='secondary' key={id}>
		<Row>
			<Col sm='auto'>
				<Image thumbnail style={{width: '8rem', height: '8rem', objectFit: 'contain'}} src={product.image}/>
			</Col>
			<Col>
				<Row>
					<h3>{product.name}</h3>
				</Row>
				<Row>
					<Col sm={2}><P>Price Per Item:</P></Col> <Col>${pricePer}</Col>
					{ discount < 1 &&
						<><Col sm={2}><P>Bulk Discount:</P></Col> <Col>{Math.round((1-discount)*100, 2)}%</Col></>
					}
					<Col sm={2}><P>Quantity:</P></Col> <Col>{quantity}</Col>
				</Row>
				<Row>
					
					<Col sm={2}><P>Total:</P></Col> <Col>${pricePer*discount*quantity}</Col>
				</Row>
			</Col>
			<Col sm='auto'><div className='vr' style={{height: '100%'}} /></Col>
			<Col sm='auto' style={{display:'flex'}}>
				<Button variant='secondary' style={{alignSelf: 'center'}} onClick={()=>setCartItem(null)}>X</Button>
			</Col>
		</Row>
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
	
	const CartItems = cart.map((item, i)=><CartItem id={item.id} quantity={item.quantity} cartItemState={[cartItem(i), setCartItem(i)]} />)
	
	return (
		<div style={{margin: '2rem', marginTop: '2rem'}}>
			<Row>
				<h2>Cart</h2>
				<hr />
			</Row>
			<Row>
				<Col>
					
					{CartItems}
				</Col>
				<Col sm={3}></Col>
			</Row>
		</div>
	);
}

export default Cart;