// ############### CRUD IN FIREBASE FIRESTORE DB ##################

import { initializeApp } from "firebase/app"
import {
  getFirestore, collection, getDocs, getDoc, doc, addDoc, updateDoc, deleteDoc, onSnapshot, query, where, orderBy
} from 'firebase/firestore'

// ######### INITAILIZE DATABASE

const firebaseConfig = {
  // your firebase configurations here
}
initializeApp(firebaseConfig)
const database = getFirestore()
const collection_reference = collection(database, 'Collection_name')

// ######### INSERT A DOCUMENT (CREATE)

const newDocument = {
  name: 'myMame',
  address: 'xyz, city, country',
  profession: 'web developer'
}
addDoc(collection_reference, newDocument)
  .then(() => {
    console.log('Added successfully')
  })
  .catch(err => {
    console.log(err.message)
  })

// ######### FETCH ALL DOCUMENTS FROM DATABASE (READ)

getDocs(collection_reference)
  .then(response => {
    let dataArray = []
    response.docs.forEach(doc => {
      dataArray.push({ ...doc.data(), id: doc.id })
    })
    console.log(dataArray)
  })

// ######### FETCH A SINGLE DOCUMENT BY ID FROM DATABASE (READ)

const document_reference = doc(database, 'Collection_name', 'ID_of_document')
getDoc(document_reference)
  .then(res => {
    console.log(res.data())
  })
  .catch(err => {
    console.log(err.message)
  })

// ######### UPDATE A DOCUMENT (UPDATE)

const document_reference_2 = doc(database, 'Collection_name', 'ID_of_document')
const updatedData = {
  name: 'Helloworld',
  profession: 'mobile developer'
}

updateDoc(document_reference_2, updatedData)
  .then(() => {
    console.log('Updated Successfully')
  })
  .catch(err => {
    console.log(err.message)
  })

// ######### DELETE A DOCUMENT (DELETE)

const document_reference_3 = doc(database, 'Collection_name', 'ID_of_document')
deleteDoc(document_reference_3)
  .then(() => {
    console.log('Deletion Successful')
  })
  .catch(err => {
    console.log(err.message)
  })

// ######### onSnapshot FUNCTION

// DESCRIPTION: When a change in data occurs in database (due to CRUD etc), it runs automatically and sends the updated form of data. onSnapshot function should be invoked once in the project so that it can run automatically whenever change occurs

onSnapshot(collection_reference, (res) => {
  let newDataArray = []
  res.docs.forEach(doc => {
    newDataArray.push({ ...doc.data(), id: doc.id })
  })
  console.log(newDataArray)
})

// ######### FETCH DATA BY RUNNING A QUERY

const q = query(collection_reference, where('AttributeName', '==', 'value'))
onSnapshot(q, (res) => {
  let newDataArray = []
  res.docs.forEach(doc => {
    newDataArray.push({ ...doc.data(), id: doc.id })
  })
  console.log(newDataArray)
})

// ######### ORDERING DATA IN DESC or ASC

const q1 = query(collection_reference, where('AttributeName', '==', 'value'), orderBy('AttributeName', 'asc'))
onSnapshot(q, (res) => {
  let newDataArray = []
  res.docs.forEach(doc => {
    newDataArray.push({ ...doc.data(), id: doc.id })
  })
  console.log(newDataArray)
})

