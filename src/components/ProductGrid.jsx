import React from 'react';
import styled from 'styled-components';

import ProductCard from '../components/ProductCard';

import BRow from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const rowWidth = 3;

const Row = styled(BRow)`
	max-width: 100%;
	padding: 0;
	margin: 0;
	justify-content: space-evenly;
`

const ProductGrid = ({products}) => {
	
	let ProductCards = products.map((product) => <ProductCard product={product} key={product.id}/>);

	return (
		<Row>
			{ProductCards}
		</Row>
	)
	
}

export default ProductGrid;