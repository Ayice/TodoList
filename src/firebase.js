import firebase from 'firebase'
const firebaseApp = firebase.initializeApp({
	apiKey: 'AIzaSyADbXRzsM3ik6rGok_wGi-8b3xh9ZcuWdw',
	authDomain: 'angular-test-4eb98.firebaseapp.com',
	databaseURL: 'https://angular-test-4eb98.firebaseio.com',
	projectId: 'angular-test-4eb98',
	storageBucket: 'angular-test-4eb98.appspot.com',
	messagingSenderId: '197303368326',
	appId: '1:197303368326:web:3064d982a22e7c430baf07',
	measurementId: 'G-XF0HGMC763'
})

const db = firebaseApp.firestore()

export default db
