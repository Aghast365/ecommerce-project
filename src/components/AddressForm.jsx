import React, {useImperativeHandle, useState, useRef} from 'react';
import styled from 'styled-components';

import Form from 'react-bootstrap/Form';

const Row = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	margin: 1rem;
`
const Required = ({...attrs}) => {
	return (
		<div style={{flex: '1 1 auto'}}>
			<Form.Control type='text' {...attrs} required />
			<Form.Control.Feedback type="invalid">
				Required
			</Form.Control.Feedback>
		</div>
	)
}

const defaultValues = {
	firstname: '',
	lastname: '',
	street1: '',
	street2: '',
	city: '',
	state: '',
	zip: ''
	
}

const AddressForm = ({addressState, ref}) => {
	const formRef = useRef(null);
	const [address, setAddress] = addressState;
	const [validated, setValidated] = useState(false);
	
	const submit = () => {
		setValidated(true);
		if (formRef.current && formRef.current.checkValidity()) {
			let formData = new FormData(formRef.current);
			formData = Object.fromEntries(formData);
			formData = {...defaultValues, ...formData}
			setAddress(formData);
			return true;
		} else {
			return false;
		}
	}
	
	useImperativeHandle(ref, () => {
		return submit;
	}, []);
	
	
	
	
	return (
		<>
			<h1>Shipping Address</h1>
			<hr/>
			<Form noValidate validated={validated} ref={formRef}>
				<Row>
					<Required name='firstname' defaultValue={address.firstname} placeholder='First name' />
					<Required name='lastname' defaultValue={address.lastname} placeholder='Last name' />
				</Row>
				<Row>
					<Required name='street1' defaultValue={address.street1} placeholder='Street 1' />
				</Row>
				<Row>
					<Form.Control name='street2' defaultValue={address.street2} type='text' placeholder='Street 2' />
				</Row>
				<Row>
					<Required name='city' defaultValue={address.city} placeholder='City' />
					<Required name='state' defaultValue={address.state} placeholder='State' />
					<Required name='zip' defaultValue={address.zip} placeholder='Zip' />
				</Row>
			</Form>
		</>
	)
}

export default AddressForm;