import React, {useEffect, useState, createContext} from 'react';

import { fetchUserData, postUserData } from '../api/userAPI.js';

const PageContext = createContext(null);
const currentUser = () => {return Number(localStorage.getItem('user')) || -1;};

const PageContextProvider = ({children}) => {
	const [user, setUser] = useState(currentUser());
	const [filters, setFilters] = useState(fetchUserData('filters', user));
	const [searchHistory, setSearchHistory] = useState(fetchUserData('searchHistory', user));
	const [cart, setCart] = useState(fetchUserData('cart', user));
	const [loggedIn, setLoggedIn] = useState(user != -1);
	
	useEffect(() => {
		localStorage.setItem('user', user);
		
		setFilters(fetchUserData('filters', user));
		setSearchHistory(fetchUserData('searchHistory', user));
		setCart(fetchUserData('cart', user));
		setLoggedIn(user != -1);
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

	const logOut = () => {
		setUser(-1);
	}
	
	return (
		<PageContext.Provider value={{user, setUser, loggedIn, logOut, filters, setFilters, searchHistory, setSearchHistory, cart, setCart}}>
			{children}
		</PageContext.Provider>
	);
}

export default PageContext;
export {PageContextProvider};