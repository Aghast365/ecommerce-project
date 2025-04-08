import React, {useContext, useState} from 'react';
import styled from 'styled-components';

import {useParams} from 'react-router-dom';
import fetchProducts from '../assets/productAPI.js';
import PageContext from '../context/PageContext';

import QuantitySelector from '../components/QuantitySelector';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const P = styled.p`
	font-size: 16pt;
`


const VR = () => <Col sm='auto'> <div className='vr' style={{height: '100%'}}></div> </Col>;

const Product = () => {
	const {productID} = useParams();
	const {cart, setCart} = useContext(PageContext);
	
	const [amt, setAmt] = useState(1);
	
	const {totalResults, filteredProducts} = fetchProducts({id: productID});
	
	let product; 
	if (filteredProducts && filteredProducts.length>0) product = filteredProducts[0];
	
	const addToCart = () => {
		let q = Math.floor(Math.max(amt, 1));
		let id = product.id;
		let newCart = structuredClone(cart);
		let hasItem = false;
		for (let i in newCart) {
			if (newCart[i].id === id) {
				newCart[i].quantity = newCart[i].quantity + amt;
				hasItem = true;
			}
		}
		if (!hasItem) newCart.push({id: product.id, quantity: amt});
		setCart(newCart);
	}
	
	let BulkPrices = [];
	for (let quantity in product.discounts) {
		BulkPrices.push(<VR key={'d'+quantity}/>);
		BulkPrices.push(
			<Col key={quantity}>
				<h3>{quantity}+ Units</h3>
				<P>${Math.round(product.price*product.discounts[quantity],2)} each</P>
			</Col>
		);
	}
	
	return (
	<div style={{margin: '2rem', marginTop:'5rem'}}>
		<Row>
			<Col sm={3}>
				<Image src={product.image} fluid />
				<hr />
				<h1 style={{margin: 'auto', display: 'block', width: 'fit-content'}}>{product.name}</h1>
			</Col>
			<VR/>
			<Col>
				<h2>Product Information</h2>
				<hr/>
				<P>{product.description}</P>
				
				<Alert variant='secondary'>
					<Row>
						<Col>
							<h3>Dimensions</h3>
							<P>{product.dimx}m x {product.dimy}m x {product.dimz}</P>
						</Col>
						<VR/>
						<Col>
							<h3>Materials</h3>
							<P>{product.materials.map(m=>m.charAt(0).toUpperCase()+m.slice(1)).join(", ")}</P>
						</Col>
					</Row>
				</Alert>
				<hr />
				<h2>Pricing</h2>
				<Alert variant='secondary'>
					<Row>
						<Col>
							<h3>Base Price</h3>
							<P>${product.price} each</P>
						</Col>
						{BulkPrices}
					</Row>
				</Alert>
			</Col>
			<VR/>
			<Col sm='auto'>
				<Card style={{width: '15rem', padding: '0'}}>
					<Card.Body>
					<h2 >Purchase</h2>
					<hr />
					<P>Quantity</P>
						<QuantitySelector quantityState={[amt, setAmt]} style={{marginLeft: 'auto'}} />
					<P>Total Price</P>
					<P style={{marginLeft: 'auto', width:'fit-content'}}>
						${
							Math.round(product.price * Math.max(Math.floor(amt), 1) * (()=>{let discount = 1; for (let i in product.discounts) {if (Math.max(Math.floor(amt),1)>=Number(i)) {discount = product.discounts[i]}} return discount;})(), 2)
						}
					</P>
					<Button variant='warning' style={{width:'100%'}} onClick={addToCart}>Add To Cart</Button>
					</Card.Body>
				</Card>
			</Col>
		</Row>
	</div>
	);
}

export default Product;