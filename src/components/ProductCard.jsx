import React from 'react';
import styled from 'styled-components';

import { Link } from 'react-router-dom';
import BootstrapCard from 'react-bootstrap/Card';
import BootstrapButton from 'react-bootstrap/Button';

const Card = styled(BootstrapCard)`
	width: 20rem;
	margin: 1rem;
	padding: .5rem 0;
	& .card-body {
		display: flex;
		flex-direction: column;
		justify-items: start;
		justify-content: start;
	}
`
const ProductImage = styled.img`
	display: block;
	width: 100%;
	height: 12rem;
	margin: 0 auto;
	margin-bottom: 5px;
	object-fit: contain;
`
const P = styled.p`
	margin: 0 10px;
	margin-bottom: 10px;
	padding: 0;
`


const Label = styled.h5`
	margin: 0;
	margin-top: 5px;
	padding: 0;
`;


const Lf = styled(Label)`
	margin-top: auto;
`

const Button = styled(BootstrapButton)`

	width: 100%;
	font-size: 16pt;
	font-weight: bold;
	
`

const ProductCard = ({product}) => {
	return (
		<Card body>
			<h3>{product.name}</h3>
			<ProductImage src={product.image}/>
			<P>{product.description}</P>
			<Lf>Dimensions</Lf>
			<P>{product.dimx}m x {product.dimy}m x {product.dimz}m</P>
			<Label>Materials</Label>
			<P>{product.materials.map((i)=>i.charAt(0).toUpperCase()+i.slice(1)).join(', ')}</P>
			<Link to={"/products/"+ product.id}><Button variant='warning'>Starting at ${product.price}</Button></Link>
		</Card>
	);
}

export default ProductCard;