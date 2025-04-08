import React, {useEffect, useState, useContext} from 'react';
import styled from 'styled-components';

import fetchProducts from '../assets/productAPI.js';
import PageContext from '../context/PageContext.jsx';

import ProductGrid from '../components/ProductGrid';
import Search from '../components/Search';
import FilterDisplay from '../components/FilterDisplay';
import Filters from '../components/Filters';

import BRow from 'react-bootstrap/Row';
import BCol from 'react-bootstrap/Col';
import BButton from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import { IoIosList, IoMdApps } from "react-icons/io";

const Row = styled(BRow)`
	margin:0;
	padding: 0;
	max-width: 100%;
`
const Col = styled(BCol)`
	margin: 0;
	padding: 0;
`
const Button = styled(BButton)`
	height: 2rem;
	line-height: 0;
`

const ListIcon = styled(IoIosList).attrs({alt: 'List View'})`
	width:1rem;
	height:1rem;
`
const GridIcon = styled(IoMdApps).attrs({alt: 'Grid View'})`
	width:1rem;
	height:1rem;
`

const ProductSearch = styled.div`
	max-width: 100%;
	background-color: #CCC;
	padding: 2px;
	border-radius: 3rem;
	margin-bottom: 2rem;
`

const ResultsTopNavigation = styled.div.attrs({id: 'results-top-navigation'})`
	display: flex;
	width: 100%;
	justify-content: space-between;
	align-content: center;
`

const Products = () => {
	
	const itemsPerPage = 9;
	const [page, setPage] = useState(1);
	const {filters, setFilters} = useContext(PageContext);
	const [products, setProducts] = useState(fetchProducts(filters).filteredProducts);
	const [results, setResults] = useState(0);
	
	
	useEffect(() => {
		const {totalResults, filteredProducts} = fetchProducts(filters);
		setProducts(filteredProducts);
		setResults(totalResults);
	}, [filters])
	
	
	return (
	<div style={{padding: '0 1rem'}}>
	<Row>
		<Col sm={3} style={{paddingTop: '5rem', minWidth: '200px'}}>
			<Filters filterState={[filters, setFilters]}/>
		</Col>
		<Col sm='auto' style={{width: '1rem'}} />
		<Col style={{paddingTop: '3rem'}}>
			<Row>
				<div id='search-and-filters'>
					<ProductSearch>
						<Search style={{width:'100%', margin: '0'}}/>
					</ProductSearch>
					<FilterDisplay filterState={[filters, setFilters]}/>
				</div>
				<hr/>
				<ResultsTopNavigation>
					<span>{(page-1)*itemsPerPage + Math.min(results,1)} - {Math.min((page)*itemsPerPage, results)} of {results} results</span>			
					<ButtonGroup style={{justifySelf: 'end'}}>
						<Button variant='secondary'><ListIcon /></Button>
						<Button variant='secondary'><GridIcon /></Button>
					</ButtonGroup>
				</ResultsTopNavigation>
			</Row>
			<Row>
				<ProductGrid products={products} />
			</Row>
		</Col>
	</Row>
	</div>
	);
}

export default Products;