import React from 'react';
import styled from 'styled-components';

const Bar = styled.footer`
	height: 3rem;
	width: 100%;
	background-color: #CCCCCC;
	margin: 0;
	padding: 0;
	position: absolute;
	bottom: 0;
	text-align: right;
	vertical-align: middle;
	color: #555;
	line-height: 3rem;
	padding-right: 2rem;
	box-sizing: border-box;
`;

const Padding = styled.div`
	width: 100%;
	height: 4rem;
	display: block;
`;

const Footer = () => {
	return (
		<>
			<Padding />
			<Bar>
				E-Commerce Project :: [[name hidden from public repository]]
			</Bar>
		</>
	)
};

export default Footer;