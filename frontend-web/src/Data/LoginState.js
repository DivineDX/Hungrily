const initialState = {
	isSignedIn: false,
	userID: '',
	name: '',
	isFranchiseOwner: false
}

const loginCustomerState = {
	isSignedIn: true,
	userID: 'ArianaBlizzard0',
	name: 'Ariana Blizzard',
	isFranchiseOwner: false,
	points: 500
}

const loginFranchiseState = {
	isSignedIn: true,
	userID: 'AdahJunk-foodaccount',
	name: 'Adah Junk-food',
	isFranchiseOwner: true,
}

const loginState = {
    logout: initialState,
    customer: loginCustomerState,
    franchiseOwner: loginFranchiseState
}

export default loginState;