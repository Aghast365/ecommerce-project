import React from 'react';
import styled from 'styled-components';

import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import Logo from '../assets/logo192.png';

const Center = styled.div`
	margin: auto;
	width: fit-content;
`
const Title = styled.span`
	margin-left: 2rem;
	font-size: 64pt;
	vertical-align: middle;
`
const P = styled.p`
	text-align: center;
`
const ProductsLink = styled(Link).attrs({
	to: '/products'
})`
	margin: auto;
	display: block;
	width: fit-content;
`

const About = () => {
	return (
		<Center>
			<img src={Logo} />
			<Title> Equipment </Title>
			<hr />
			<P>
				VD Equipment, named after the famous V-Day of 1945, <br/> strives to provide the equipment you need to ensure your own victory in battle. 
			</P>
			<br/>
			<ProductsLink>
				<Button variant='secondary'>View Products</Button>
			</ProductsLink>
		</Center>
	);
}

export default About;