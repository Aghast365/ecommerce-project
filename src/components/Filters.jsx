import React from 'react';
import styled from 'styled-components';

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const DimInput = styled(Form.Control).attrs({type: 'text', placeholder: 0})`
	width: 4rem;
	display: inline;
`
const PriceInput = ({name, value, onChange, ...attrs}) => {
	return (
		<InputGroup {...attrs} style={{width: '8rem', display: 'inline flex'}}>
			<InputGroup.Text>$</InputGroup.Text>
			<Form.Control type='text' placeholder='0' name={name} value={value} onChange={onChange} />
		</InputGroup>
	)
}

const FilterGroup = styled(Form.Group)`
	margin-left: 1rem;
	margin-bottom: 1rem;
`


const Filters = ({filterState}) => {
	const [filters, setFilters] = filterState;

	const handleChange = (e) => {
		let key = e.target.name;
		let value = e.target.value;
		let newFilters = structuredClone(filters);
		if (value) 
			newFilters[key] = value;
		else
			delete newFilters[key];
		setFilters(newFilters);
	}
	const handleCheck = (e) => {
		let key = e.target.name;
		let form = e.target.form;
		let values = (new FormData(form)).getAll(key);
		let newFilters = structuredClone(filters);
		if (values.length > 0)
			newFilters[key] = values;
		else
			delete newFilters[key];
		setFilters(newFilters);
	}
	
	return (
		<Card>
			<Card.Header as='h3'>
				Filters
			</Card.Header>
			<Card.Body>
			<Form id='filters'>
				<h4>Sort By</h4>
				<FilterGroup>
					<Form.Check inline name='sort' type='radio' label='Relevance' checked={filters.sort == 'relevance'} onChange={handleChange} value='relevance' />
					<Form.Check inline name='sort' type='radio' label='Price' checked={filters.sort == 'price'} onChange={handleChange} value='price'/>
					<br/>
					<Form.Check inline name='sortDir' type='radio' label='Ascending' checked={filters.sortDir == 'ascending'} onChange = {handleChange} value='ascending' />
					<Form.Check inline name='sortDir' type='radio' label='Descending' checked={filters.sortDir == 'descending'} onChange={handleChange} value='descending'/>
				</FilterGroup>
				<hr />
				<h4>Category</h4>
				<FilterGroup>	
					<Form.Select value={filters.category} onChange={handleChange} name='category'>
						<option value='' default>None</option>
						<option value='Ballista'>Ballista</option>
						<option value='Battering Ram'>Battering Ram</option>
						<option value='Catapult'>Catapult</option>
						<option value='Escalade'>Escalade</option>
						<option value='Siege Hook'>Siege Hook</option>
						<option value='Siege Tower'>Siege Tower</option>
					</Form.Select>
				</FilterGroup>
				<hr />
				<h4>Dimensions</h4>
				<FilterGroup>	
					<Form.Check name='dimType' value='over' type='radio' inline label='Over' checked={filters.dimType == 'over'} onChange={handleChange} />
					<Form.Check name='dimType' value='under' type='radio' inline label='Under' checked={filters.dimType == 'under'} onChange={handleChange} />
					<Form.Check name='dimType' value='exactly' type='radio' inline label='Exactly' checked={filters.dimType == 'exactly'} onChange={handleChange} />
					<br/>
					<DimInput name='dimx' value={filters.dimx || ''} onChange={handleChange} /> x <DimInput name='dimy' value={filters.dimy || ''} onChange={handleChange} /> x <DimInput name='dimz' value={filters.dimz || ''} onChange={handleChange} />
				</FilterGroup>
				<hr />
				<h4>Materials</h4>
				<FilterGroup>	
					<Form.Check name='materials' value='wood' type='checkbox' label='Wood' checked={(filters.materials || false) && filters.materials.includes('wood')} onChange={handleCheck}/>
					<Form.Check name='materials' value='iron' type='checkbox' label='Iron' checked={(filters.materials || false) && filters.materials.includes('iron')} onChange={handleCheck}/>
					<Form.Check name='materials' value='steel' type='checkbox' label='Steel' checked={(filters.materials || false) && filters.materials.includes('steel')} onChange={handleCheck}/>
					<Form.Check name='materials' value='packed mud' type='checkbox' label='Packed mud' checked={(filters.materials || false) && filters.materials.includes('packed mud')} onChange={handleCheck}/>
				</FilterGroup>	
				<hr />
				<h4>Price</h4>
				<FilterGroup>	
					<PriceInput name='priceFrom' value={filters.priceFrom || ''} onChange={handleChange}/> to <PriceInput name='priceTo' value={filters.priceTo||''} onChange={handleChange}/>
				</FilterGroup>
			</Form>
			</Card.Body>
		</Card>
	)
}

export default Filters;