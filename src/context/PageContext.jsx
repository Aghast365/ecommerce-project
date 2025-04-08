import React, {useEffect, useState, createContext} from 'react';

import { fetchUserData, postUserData } from '../api/userAPI.js';

const PageContext = createContext(null);
const currentUser = () => {return Number(localStorage.getItem('user')) || -1;};

const PageContextProvider = ({children}) => {
	const [user, setUser] = useState(currentUser());
	const [filters, setFilters] = useState({});
	const [searchHistory, setSearchHistory] = useState([]);
	const [cart, setCart] = useState([]);
	
	useEffect(() => {
		localStorage.setItem('user', user);
		
		setFilters(fetchUserData('filters', user));
		setSearchHistory(fetchUserData('searchHistory', user));
		setCart(fetchUserData('cart', user))
    }, [user]);
	
	useEffect(() => {
		postUserData('filters', filters, user);
    }, [filters]);
	useEffect(()=>{
		postUserData('searchHistory', searchHistory, user);
	}, [searchHistory]);
	useEffect(()=>{
		postUserData('cart', cart, user);
	}, [cart]);
	
	const loggedIn = () => {
		return user != -1;
	}
	
	return (
		<PageContext.Provider value={{user, setUser, loggedIn, filters, setFilters, searchHistory, setSearchHistory, cart, setCart}}>
			{children}
		</PageContext.Provider>
	);
}

export default PageContext;
export {PageContextProvider};