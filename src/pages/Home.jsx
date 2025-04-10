import React from 'react';
import styled from 'styled-components';

import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';

import Logo from '../assets/logo192.png';

const Center = styled.div`
	margin: auto;
	width: fit-content;
	text-align:center;
	
`
const Title = styled.span`
	margin-left: 2rem;
	font-size: max(5vw, 24pt);
	vertical-align: middle;
`
const ProductsLink = styled(Link).attrs({
	to: '/products'
})`
	
	display: inline;
	width: fit-content;
`


const Home = () => {
	return (
		<Center>
			<img src={Logo} style={{width: '30%'}}/>
			<Title>Equipment</Title>
			<br />
			<ProductsLink>
				<Button variant='secondary'>View Products</Button>
			</ProductsLink>
		</Center>
	);
}

export default Home;