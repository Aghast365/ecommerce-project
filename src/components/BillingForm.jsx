import React, {useState, useRef, useImperativeHandle} from 'react';
import styled from 'styled-components';

import Form from 'react-bootstrap/Form';

const Row = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	margin: 1rem;
`
const Required = ({style, ...attrs}) => {
	return (
		<div style={{flex: '1 1 auto', ...style}}>
			<Form.Control type='text' {...attrs} required />
			<Form.Control.Feedback type="invalid">
				Required
			</Form.Control.Feedback>
		</div>
	)
}

const LargeRadioContainer = styled.div`
	flex: 0 1 auto;
	padding-top: 1rem;
	padding-bottom: 1rem;
	padding-left: 1rem;
	padding-right: 1.5rem;
	margin-right: 1rem;
	border-radius: .5rem;
	border: 1px solid grey;
	
	&:hover {
		background-color: #EEE;
	}
`

const LargeRadio = ({...attrs}) => {
	const radioRef = useRef(null);
	const handleClick = () => {
		radioRef.current.checked = true;
	}
	return (
		<div style={{flex: '0 1 auto'}}>
			<LargeRadioContainer onClick={handleClick}>
				<Form.Check type='radio' {...attrs} ref={radioRef} />
			</LargeRadioContainer>
			{attrs.required &&
				<Form.Control.Feedback type="invalid">
					Required
				</Form.Control.Feedback>
			}
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
	zip: '',
	useshipping: 'false',
	cardfirstname: '',
	cardlastname: '',
	cardnumber: '',
	cv: ''
	
}

const BillingForm = ({billingState, ref}) => {
	const [billing, setBilling] = billingState;
	const [validated, setValidated] = useState(false);

	const [disableAddressInput, setDisableAddressInput] = useState(billing.useshipping==='true');
	const shippingRef = useRef(null);
	const addressFormRef = useRef(null);
	const paymentFormRef = useRef(null);
	
	const handleShippingCheck = (e) => {
		if (shippingRef.current.checked)
			setDisableAddressInput("disabled");
		else 
			setDisableAddressInput(null);
	}
	
	const submit = () => {
		setValidated(true);
		if (addressFormRef.current && addressFormRef.current.checkValidity() 
			&& paymentFormRef.current && paymentFormRef.current.checkValidity()) {
			let addressFormData = new FormData(addressFormRef.current);
			addressFormData = Object.fromEntries(addressFormData);
			let paymentFormData = new FormData(paymentFormRef.current);
			paymentFormData = Object.fromEntries(paymentFormData);
			let formData = {...defaultValues, ...addressFormData, ...paymentFormData}
			setBilling(formData);
			return true;
		} else {
			return false
		}
	}
	
	useImperativeHandle(ref, () => {
		return submit;
	}, []);
	
	return (
		<>
			<h1>Billing</h1>
			<hr/>
			<h2>Address</h2>
			<hr />
			<Form noValidate validated={validated} ref={addressFormRef}>
				<Row>
					<Form.Check ref={shippingRef} name='useshipping' label='Same as shipping' defaultChecked={billing.useshipping === 'true'} value='true' onInput={handleShippingCheck}/>
				</Row>
				<Row>
					<Required name='firstname' disabled={disableAddressInput} defaultValue={billing.firstname} placeholder='First name' />
					<Required name='lastname' disabled={disableAddressInput} defaultValue={billing.lastname} placeholder='Last name' />
				</Row>
				<Row>
					<Required name='street1' disabled={disableAddressInput} defaultValue={billing.street1} placeholder='Street 1' />
				</Row>
				<Row>
					<Form.Control name='street2' disabled={disableAddressInput} defaultValue={billing.street2} type='text' placeholder='Street 2' />
				</Row>
				<Row>
					<Required name='city' disabled={disableAddressInput} defaultValue={billing.city} placeholder='City' />
					<Required name='state' disabled={disableAddressInput} defaultValue={billing.state} placeholder='State' />
					<Required name='zip' disabled={disableAddressInput} defaultValue={billing.zip} placeholder='Zip' />
				</Row>
			</Form>
			<h2>Payment</h2>
			<hr />
			<Form noValidate validated={validated} ref={paymentFormRef}>
				<Row style={{justifyContent: 'start'}}>
					<LargeRadio label='Credit' name='paymenttype' defaultChecked={billing.paymenttype==='credit'} value='credit' required/> <LargeRadio label='Debit' name='paymenttype'defaultChecked={billing.paymenttype==='debit'} value='debit' required/> 
				</Row>
				<Row>
					<Required name='cardfirstname' placeholder='Cardholder first name' defaultValue={billing.cardfirstname} />
					<Required name='cardlastname' placeholder='Cardholder last name' defaultValue={billing.cardlastname} />
				</Row>
				<Row>
					<Required name='cardnumber' placeholder='Card number' defaultValue={billing.cardnumber} />
					<Required name='cv' placeholder='CV' defaultValue={billing.cv} style={{flexGrow: '.2'}}/>
				</Row>
			</Form>
		</>
	)
}

export default BillingForm;