/*
	stand-in for an actual user api, coming in project 2
*/

const defaultValues = {
	marketingConsent: false,
	filters: {},
	searchHistory: [],
	cart: []
}

const fetchUserData = (key, user) => {
	let response = localStorage.getItem(key+'-'+user);
	if (response != undefined) return JSON.parse(response);
	else if (defaultValues[key] != undefined) return defaultValues[key];
	else return -1;
}

const postUserData = (key, data, user) => {
	localStorage.setItem(key+'-'+user, JSON.stringify(data));
}

const deleteUserData = (key, user) => {
	localStorage.removeItem(key+'-'+user);
}

const logIn = (email, password) => {
	email = email.toLowerCase().trim();
	const userDB = JSON.parse(localStorage.getItem('userDB')) || [];
	for (let i in userDB) {
		if (userDB[i].email === email) {
			if (userDB[i].password === password) {
				return userDB[i].sessionKey;
			} else return 0;
		}
	}
	return -1;
}

const signUp = (email, password, consent) => {
	let userDB = JSON.parse(localStorage.getItem('userDB')) || [];
	let highestKey = 1;
	for (let i in userDB) {
		if (userDB[i].email === email) {
			return 0;
		}
		if (userDB[i].sessionKey > highestKey) {
			highestKey = userDB[i].sessionKey;
		}
	}
	
	let newUser = {
		email: email.toLowerCase().trim(),
		password: password,
		sessionKey: highestKey+1
	}
	userDB.push(newUser);
	localStorage.setItem('userDB', JSON.stringify(userDB));
	postUserData('marketingConsent', consent, newUser.sessionKey);
	return newUser.sessionKey;
}

const deleteUser = (user) => {
	let userDB = JSON.parse(localStorage.getItem('userDB')) || [];
	for (let i in userDB) {
		if (userDB[i].sessionKey == user) {
			userDB.splice(i, 1);
			let toDelete = Object.keys(defaultValues);
			for (let j in toDelete) {
				deleteUserData(toDelete[i], user);
			}
			localStorage.setItem('userDB', JSON.stringify(userDB));
			return -1;
		}
	}
	return user;
	
	
}

const changePassword = (old, newPw, user) => {
	let userDB = JSON.parse(localStorage.getItem('userDB')) || [];
	for (let i in userDB) {
		if (userDB[i].sessionKey == user) {
			if (old == userDB[i].password) {
				userDB[i].password = newPw;
				localStorage.setItem('userDB', JSON.stringify(userDB));
				return user;
			} else return 0;
		}
	}
	return -1;
}


export { fetchUserData, postUserData, deleteUserData, logIn, signUp, deleteUser, changePassword };