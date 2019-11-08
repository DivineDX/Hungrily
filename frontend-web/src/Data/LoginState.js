const initialState = {
	isSignedIn: false,
	userID: '',
	name: '',
	isFranchiseOwner: false
}

const loginCustomerState = {
	isSignedIn: true,
	userID: 'AdahArpin48',
	name: 'Adah Arpin',
	isFranchiseOwner: false,
	points: 500
}

const loginFranchiseState = {
	isSignedIn: true,
	userID: 'BlizzardSoul-foodaccount',
	name: 'Blizzard Soul-food',
	isFranchiseOwner: true,
}

const loginState = {
    logout: initialState,
    customer: loginCustomerState,
    franchiseOwner: loginFranchiseState
}

export default loginState;