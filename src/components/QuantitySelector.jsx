import React from 'react';
import styled from 'styled-components'

import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


const QuantityButton = styled(Button)`
	padding:0;
	width: 2rem;
	font-size: 16pt;
	font-weight: bold;
`

const QuantitySelector = ({quantityState, style, ...props}) => {
	const [amt, setAmt] = quantityState;
	
	const handleInc = () => setAmt(amt+1);
	const handleDec = () => setAmt(Math.max(amt-1, 1));
	const handleScroll = (e) => {
		e.deltaY > 0 ? handleDec() : handleInc();
	}
	const handleChange = (e) => setAmt(e.target.value);
	const handleBlur = () => setAmt(Math.max(amt, 1));
	
	return (
	<InputGroup onWheel={handleScroll} style={{width: '8rem', ...style}}>
		<QuantityButton variant='secondary' onClick={handleDec}>-</QuantityButton>
		<Form.Control onChange={handleChange} onBlur={handleBlur} type='text' value={amt} style={{width: '4rem', textAlign:'center'}}></Form.Control>
		<QuantityButton onClick={handleInc}>+</QuantityButton>
	</InputGroup>
	)
}

export default QuantitySelector;