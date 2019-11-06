const initialState = {
	isSignedIn: false,
	userID: '',
	name: '',
	isFranchiseOwner: false
}

const loginCustomerState = {
	isSignedIn: true,
	userID: 'HungrilyFan',
	name: 'Person',
	isFranchiseOwner: false,
	points: 5
}

const loginFranchiseState = {
	isSignedIn: true,
	userID: 'FishnCoFranchisorAccount',
	name: 'FishnCoFranchisorAccounts name',
	isFranchiseOwner: true,
}

const loginState = {
    logout: initialState,
    customer: loginCustomerState,
    franchiseOwner: loginFranchiseState
}

export default loginState;