/*
	stand-in for an actual user api, coming in project 2
*/

const fetchUserData = (key, user) => {
	if (key === 'filters') {
		return JSON.parse(localStorage.getItem('filters-'+user)) || {};
	} else if (key === 'searchHistory') {
		return JSON.parse(localStorage.getItem('searchHistory-'+user)) || [];
	} else if (key === 'cart') {
		return JSON.parse(localStorage.getItem('cart-')+user) || [];
	}
}

const postUserData = (key, data, user) => {
	if (key === 'filters') {
		localStorage.setItem('filters-'+user, JSON.stringify(data));
	} else if (key === 'searchHistory') {
		localStorage.setItem('searchHistory-'+user, JSON.stringify(data));
	} else if (key === 'cart') {
		localStorage.setItem('cart-'+user, JSON.stringify(data));
	}
}

const logIn = (email, password) => {
	const userDB = JSON.parse(localStorage.getItem('userDB') || [];
}

export { fetchUserData, postUserData };