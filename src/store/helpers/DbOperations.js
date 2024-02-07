import firebaseDB from '@/firebase-config'
import { doc, collection, getDocs, getDoc, addDoc, deleteDoc, updateDoc, query, where } from 'firebase/firestore/lite'

class DbOperations {
    constructor(collectionTitle) {
        this.dbCollection = collection(firebaseDB, `/${collectionTitle}`)
    }
    getListFromSnapshot(snapshot) {
        const list = []
        snapshot.docs.forEach((doc) => {
            list.push({
                id: doc.id,
                ...doc.data(),
            })
        })
        return list
    }
    loadItemsList() {
        return new Promise((resolve, reject) => {
            getDocs(this.dbCollection)
                .then((querySnapshot) => {
                    resolve(this.getListFromSnapshot(querySnapshot))
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }

    addItem(item) {
        return new Promise((resolve, reject) => {
            addDoc(this.dbCollection, item)
                .then(() => {
                    resolve(true)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }

    deleteItem(id) {
        return new Promise((resolve, reject) => {
            deleteDoc(doc(this.dbCollection, id))
                .then(() => {
                    resolve(true)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }

    updateItem(itemId, data) {
        return new Promise((resolve, reject) => {
            const oldDocRef = doc(this.dbCollection, itemId)
            updateDoc(oldDocRef, data)
                .then(() => {
                    resolve(true)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }
    getItemById(itemId) {
        return new Promise((resolve, reject) => {
            const docRef = doc(this.dbCollection, itemId)
            getDoc(docRef)
                .then((docSnap) => {
                    if (docSnap.exists()) resolve(docSnap.data())
                    else resolve({})
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }
    loadFilteredData(fieldTitle, compareOperator, valueToCompare) {
			console.log('valueToCompare');
			console.log(valueToCompare);
			console.log('fieldTitle');
			console.log(fieldTitle);
			console.log('compareOperator');
			console.log(compareOperator);
			console.log('Filtering Data:', fieldTitle, compareOperator, valueToCompare);
        // const q = query(this.dbCollection, where(fieldTitle, compareOperator, valueToCompare))
				const valuesToCompareArray = [...valueToCompare]
				console.log('valuesToCompareArray');
				console.log(valuesToCompareArray);
				// const q = Array.isArray(valueToCompare)
        // ? query(this.dbCollection, where(fieldTitle, 'array-contains-any', valueToCompare))
        // : query(this.dbCollection, where(fieldTitle, compareOperator, valueToCompare));
				const q = query(this.dbCollection, where(fieldTitle, 'array-contains-any', valuesToCompareArray))
				console.log('	const q ');
				console.log( q );
        return new Promise((resolve, reject) => {
            getDocs(q)
                .then((querySnapshot) => {
									console.log('this.getListFromSnapshot');
									console.log(this.getListFromSnapshot(querySnapshot));
                    resolve(this.getListFromSnapshot(querySnapshot))
							
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }

		
}

export default DbOperations
