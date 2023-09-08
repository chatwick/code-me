"use client"

import React, { useEffect, useState } from 'react';
import { collection, doc, getDoc, getFirestore } from 'firebase/firestore';
import { app, firestore, auth, functions, projectId } from '../../../config/firebase_config'
import { child, get, getDatabase, ref } from 'firebase/database';

const db = getFirestore(app);

// TODO: set this dynamically later
const errors = 'NullPointerException';


// Fetch data from Firestore

const docRef = doc(db, `error-explanations/${errors}`);


function ErrorList() {
	const [docData, setDocData] = useState({ name: '', explanation: '' });

	useEffect(() => {
		const fetchDocument = async () => {
			try {
				const docSnap = await getDoc(docRef);
				if (docSnap.exists()) {
					const data = docSnap.data();
					setDocData({ name: `${data.name}`, explanation: `${data.explanation}` }); // Update the state with the document data
				} else {
					console.log("No such document!");
				}
			} catch (error) {
				console.error("Error fetching document:", error);
			}
		};

		fetchDocument(); // Call the asynchronous function when the component mounts
	}, []); // Empty dependency array ensures it runs only once

	return (
		<div>
			{docData ? (
				<div>
					<h1>Name: {docData.name}</h1>
					<p>Explanation: {docData.explanation}</p>
				</div>
			) : (
				<p>Loading...</p>
			)}
		</div>
	);
}

export default ErrorList;
