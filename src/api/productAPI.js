/*
	Stand-in for an actual products API, to come in Project 2
	Usage:
		fetchProducts({id, search, searchName, sort, sortDir, category, dimType, dimx, dimy, dimz, materials, priceFrom, priceTo, perPage, page})
		
		returns an object {
			totalResults: Number
			filteredProducts: [{
				id, category, image, description, dimx, dimy, dimz, materials: [], price, discounts: {}
			}]
		}
		---parameters---
		id				 - if set, skips all other filters and returns products matching the give id
		search			 - only include products matching one or more search terms
		searchName		 - only include products with names matching one or more of these terms
		sort 			 - property to sort by. default is 'relevance'
		sortDir			 - order in which products are returned
		category 		 - only returns products matching specified category
		dimType 		 - may be 'over', 'under', or 'exactly', only returns products
						   which meet the specified criteria for dimensions
						   requires one or more of dimx, dimy dimz
		dimx, dimy, dimz - size of product, behavior determined by dimType
		materials 		 - array of material names, only returns products having 
						   one or more of the listed materials
		priceFrom		 - only returns products at or above this price
		priceTo			 - only returns products at or below this price
		perPage			 - number of results to return
		page			 - returns results starting at page*perPage
*/

import products from '../assets/database.js';

const fetchProducts = ({id, search, searchName, sort, sortDir, category, dimType, dimx, dimy, dimz, materials, priceFrom, priceTo, perPage, page}={}) => {
	let filteredProducts = products;
	if (id)
		filteredProducts = filteredProducts.filter(item=>item.id==id);
	if (category)
		filteredProducts = filteredProducts.filter((item) => item.category == category);
	if (dimType) {
		dimx = dimx && Number(dimx);
		dimy = dimy && Number(dimy);
		dimz = dimz && Number(dimz);
		if (dimType == 'under') {
			if (dimx && dimz) {
				filteredProducts = filteredProducts.filter((item) => 
					(item.dimx <= dimx && item.dimz <= dimz) || 
					(item.dimz <= dimx && item.dimx <= dimz));
			} else {
				if (dimx)
					filteredProducts = filteredProducts.filter((item) => item.dimx <= dimx||item.dimz <= dimx);
				if (dimz)
					filteredProducts = filteredProducts.filter((item) => item.dimz <= dimz||item.dimx <= dimz);
			}
			if (dimy)
				filteredProducts = filteredProducts.filter((item) => item.dimy <= dimy);
			
		}
		if (dimType == 'over') {
			if (dimx && dimz) {
				filteredProducts = filteredProducts.filter((item) => 
					(item.dimx >= dimx && item.dimz >= dimz) || 
					(item.dimz >= dimx && item.dimx >= dimz));
			} else {
				if (dimx)
					filteredProducts = filteredProducts.filter((item) => item.dimx >= dimx||item.dimz >= dimx);
				if (dimz)
					filteredProducts = filteredProducts.filter((item) => item.dimz >= dimz||item.dimx >= dimz);
			}
			if (dimy)
				filteredProducts = filteredProducts.filter((item) => item.dimy >= dimy);
			
		}
		if (dimType == 'exactly') {
			if (dimx)
				filteredProducts = filteredProducts.filter((item) => item.dimx == dimx || item.dimz == dimx);
			if (dimy)
				filteredProducts = filteredProducts.filter((item) => item.dimy == dimy);
			if (dimz)
				filteredProducts = filteredProducts.filter((item) => item.dimz == dimz || item.dimx == dimz);
		}
	}
	if (materials && materials.length>0)
		filteredProducts = filteredProducts.filter((item) => {
			for (let i in materials) {
				if(item.materials.includes(materials[i]))
					return true;
			}
			return false;
		});
	if (priceFrom) {
		priceFrom = Number(priceFrom);
		filteredProducts = filteredProducts.filter((item) => item.price >= priceFrom);
	}
	if (priceTo) {
		priceTo = Number(priceTo);
		filteredProducts = filteredProducts.filter((item) => item.price <= priceTo);
	}
	
	let searchTerms;
	if (search || searchName) {
		searchTerms = search || searchName;
		searchTerms = searchTerms.toLowerCase().split(" ");
		if (searchName) {
			filteredProducts.forEach((item) => {
				item.matches = 0;
				for (let i in searchTerms)
					if (item.name.toLowerCase().includes(searchTerms[i]))
						item.matches++;
			});
			filteredProducts.sort((a,b)=>{
				let idxA=-1,idxB=-1;
				for (let i in searchTerms) {
					let idx = a.name.toLowerCase().indexOf(searchTerms[i]);
					idxA = idxA==-1 ? idx : Math.min(idx, idxA);
					idx = b.name.toLowerCase().indexOf(searchTerms[i]);
					idxB = idxB == -1 ? idx : Math.min(idx, idxB);
				}
				if (idxA == -1) return -1;
				else if (idxB == -1) return 1;
				else return idxA-idxB;
			});
			
		}
		if (search) {
			filteredProducts.forEach((item) => {
				item.matches = 0;
				for(let i in searchTerms)
					if (
						item.name.toLowerCase().includes(searchTerms[i]) ||
						item.materials.includes(searchTerms[i]) ||
						item.description.toLowerCase().includes(searchTerms[i]) ||
						item.category.toLowerCase().includes(searchTerms[i])
						)
						item.matches++;
			});
		}
		filteredProducts = filteredProducts.filter((item)=>item.matches > 0);
	}

	if (!sort) sort = 'relevance';
	if (!sortDir) {
		if (sort == 'price') sortDir = 'ascending';
		if (sort == 'relevance') sortDir = 'descending';
	}
	
	if (sort == 'price' && sortDir == 'ascending')
		filteredProducts.sort((a,b) => a.price - b.price)
	if (sort == 'price' && sortDir == 'descending')
		filteredProducts.sort((a,b) => b.price - a.price)
	
	if (sort == 'relevance' && searchTerms) {
		if (sortDir == 'descending') {
			filteredProducts.sort((a,b) => {
				return b.matches-a.matches;
			});
		}
		if (sortDir == 'ascending') {
			filteredProducts.sort((a,b) => {
				return a.matches-b.matches;
			});
		}
	}
	
	let totalResults = filteredProducts.length;
	if (perPage) {
		perPage = Number(perPage);
		if (!page||page<1) page=1;
		page = Number(page);
		filteredProducts = filteredProducts.slice((page-1)*perPage, page*perPage);
	}
	
	return {totalResults, filteredProducts};
}

export default fetchProducts;