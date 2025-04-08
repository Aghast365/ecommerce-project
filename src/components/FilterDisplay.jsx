import React, {useState} from 'react';
import styled from 'styled-components';

import BStack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button'

import { IoIosCloseCircleOutline, IoIosCloseCircle } from "react-icons/io";

const Stack = styled(BStack)`
	flex-wrap: wrap;
`

const CloseIcon = ({onClick}) => {
	const [icon, setIcon] = useState(<IoIosCloseCircleOutline />);
	
	const handleLeave = () => {
		setIcon(<IoIosCloseCircleOutline />)
	}
	const handleEnter = () => {
		setIcon(<IoIosCloseCircle />)
	}
	
	return (
		<span onClick={onClick} onMouseEnter={handleEnter} onMouseLeave={handleLeave} style={{cursor: 'pointer'}}>
			{icon}
		</span>
	)
}

const FilterItem = ({type, value, onClose, filters}) => {
	if (type == "length" || type == "height" || type == "width") {
		value = `${filters.dimType || "exactly"} ${value}m`
	} else if (type == "priced over") {
		type = "price"
		value = `over $${value}`
	} else if (type == "priced under") {
		type = "price"
		value = `under $${value}`
	} else if (type == "materials") {
		value = value.join(", ");
		if(!value) return;
	}
	let text = `${type.charAt(0).toUpperCase() + type.slice(1)}: ${value}`
	
	return (
		<Button variant='outline-primary' style={{cursor: 'pointer', marginLeft: '5px', marginBottom: '5px'}}>{text} <CloseIcon onClick={onClose}/></Button>
	)
}



const FilterDisplay = ({filterState}) => {
	const [filters, setFilters] = filterState;
	const filterTypes = {
		search: "search",
		sort: "sort by", 
		sortDir: "sort direction", 
		category: "category", 
		dimx: "length", 
		dimy: "height", 
		dimz: "width", 
		materials: "materials", 
		priceFrom: "priced over", 
		priceTo: "priced under", 
	}
	
	const removeFilter = (filter) => {
		let newFilters = structuredClone(filters);
		delete newFilters[filter]
		setFilters(newFilters);
	}
	
	const removeAllFilters = () => {
		let newFilters = structuredClone(filters);
		for (let i in filterTypes)
			delete newFilters[i]
		setFilters(newFilters)
	}
	
	
	let FilterItems = [];
	for (let i in filters) {
		if (Object.keys(filterTypes).includes(i) && filters[i]) {
			FilterItems.push(
				<FilterItem key={i} type={filterTypes[i]} value={filters[i]} filters={filters} onClose={()=>{removeFilter(i)}} />
			)
		}
	}
	
	
	
	return (
		<div>
			<Stack direction='horizontal'>
				{FilterItems}
			</Stack>
			{FilterItems.length>0 && 
				<Button variant='link' style={{padding: '0', margin: '0'}} onClick={removeAllFilters}>Clear all</Button>
			}
		</div>
	)
}

export default FilterDisplay;