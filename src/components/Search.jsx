import React, {useState, useEffect, useContext} from 'react';
import styled from 'styled-components';

import fetchProducts from '../assets/productAPI.js';
import PageContext from '../context/PageContext';

import Dropdown from 'react-bootstrap/Dropdown';
import {Link, useNavigate, useLocation} from 'react-router-dom';

import { IoMdSearch, IoMdClose } from "react-icons/io";
import { MdHistory } from "react-icons/md";

const Container = styled.div`
	display: inline-block;
	height: 2rem;
	margin: .5rem 1rem;
	position: relative;
`;

const Input = styled.input`
	display: inline-block;
	height: 2rem;
	width: 100%;
	border-radius: 2rem;
	border: 0;
	padding: 0 12pt;
	font-size: 12pt;
`;

const SearchButton = styled.button`
	height: 1.5rem;
	border-radius: 2rem;
	position: absolute;
	right: .25rem;
	top: .25rem;
	border: 1px solid #CCC;
	width: 10%;
	min-width: 2rem;
`;

const SearchIcon = styled(IoMdSearch)`
	height: 1rem;
	margin-top: .125rem;
	vertical-align: top;
`;

const Suggestion = ({product}) => {
	return (
		<Dropdown.Item as={Link} to={'/products/' + product.id} key={product.id}>
			{product.name}
		</Dropdown.Item>
	)
}

const Search = (attrs) => {
	const {filters, setFilters, searchHistory, setSearchHistory} = useContext(PageContext);
	const [search, setSearch] = useState('');
	const [suggestions, setSuggestions] = useState([]);
	const [hasFocus, setFocus] = useState(false);
	const [hover, setHover] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();
	
	const handleChange = (e) => {
		setSearch(e.target.value);
	}
	const onFocus = () => setFocus(true);
	const onBlur = () => {
		setFocus(false);
	};
	const onEnter = () => setHover(true);
	const onLeave = () => setHover(false);
	const onToggle = (nextShow) => {
		if (!nextShow) setHover(false);
	};
	const setSearchFilter = (filter) => {
		setSearchHistory([...new Set([filter].concat(searchHistory))].slice(0,5));
		
		setFilters({...filters, search: filter});
		if (location != '/products') navigate('/products');
		setSearch('');
	}
	const onKeyUp = (e) => {
		if (e.key === 'Enter') {
			setSearchFilter(search);
			e.target.blur();
		}
	}
	const onClick = () => {
		setSearchFilter(search);
	}
	
	const History = ({item}) => {
		const handleClose = (e) => {
			e.stopPropagation();
			setSearchHistory(searchHistory.filter(i=>i!=item));
		}
		const handleClick = () => {
			setSearchFilter(item);
		}
		return (
			<Dropdown.Item onClick={handleClick}>
				<div style={{width: '100%', display: 'flex', alignItems: 'center'}}>
					<MdHistory style={{marginRight:'1rem', height: '1.5rem', width: '1.5rem'}}/>
					{item}
					<IoMdClose style={{marginLeft:'auto', height: '1.5rem', width: '1.5rem'}} onClick={handleClose}/>
				</div>
			</Dropdown.Item>
		);
	}
	
	useEffect(() => {
		if(search) {
			const {totalResults, filteredProducts} = fetchProducts({searchName: search, perPage: 5});
			setSuggestions(filteredProducts);
		} else setSuggestions([]);
	}, [search]);
				

	return (
		<Container {...attrs}>
			<Input type='text' placeholder="Type here to search..." value={search || ''} onChange={handleChange} onFocus={onFocus} onBlur={onBlur} onKeyUp={onKeyUp}></Input>
			<SearchButton onClick={onClick}><SearchIcon /></SearchButton>
			<Dropdown autoClose={false} show={(hasFocus || hover) && (search || (searchHistory && searchHistory.length > 0))} onMouseEnter={onEnter} onMouseLeave={onLeave} onToggle={onToggle}>
				<Dropdown.Menu style={{width: '100%'}}>
					{!search && searchHistory && searchHistory.map && searchHistory.map(item=><History item={item}/>)}
					{suggestions && suggestions.map(product=><Suggestion product={product} />)}
				</Dropdown.Menu>
			</Dropdown>
		</Container>
	)
}

export default Search;