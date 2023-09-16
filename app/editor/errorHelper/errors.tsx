"use client"

import React, { useEffect, useState } from 'react';
import { collection, doc, getDoc, getFirestore } from 'firebase/firestore';
import { app, firestore, auth, functions, projectId } from '../../../config/firebase_config'
import { child, get, getDatabase, ref } from 'firebase/database';

const db = getFirestore(app);

// TODO: set this dynamically later
// const errors = ['NullPointerException', 'ArithmeticException'];
const errors = [{error:'NullPointerException', lineNo:'12'}, {error:'ArithmeticException', lineNo:'24'}];



// Fetch data from Firestore
function ErrorList() {
	const [docData, setDocData] = useState<{ name: string; explanation: string; lineNo: string }[]>([]);

	useEffect(() => {
		const fetchDocuments = async () => {
			const dataPromises = errors.map(async (errors) => {
				const docRef = doc(db, `error-explanations/${errors.error}`);

				try {
					const docSnap = await getDoc(docRef);
					if (docSnap.exists()) {
						const data = docSnap.data();
						return { name: data.name, explanation: data.explanation, lineNo: errors.lineNo };
					} else {
						console.log(`No document found for error: ${errors.error}`);
						return { name: '', explanation: '', lineNo: errors.lineNo }; // default data
					}
				} catch (error) {
					console.error(`Error fetching document for error ${errors.error}:`, error);
					return { name: '', explanation: '', lineNo: errors.lineNo };
				}
			});

			const results = await Promise.all(dataPromises);
			// filter out null results
			setDocData(results.filter((data) => data !== null) as { name: string; explanation: string; lineNo: string }[]);
		};

		// Call the asynchronous function when the component mounts
		fetchDocuments();
	}, []); // Empty dependency array ensures it runs only once

	return (
		<div>
			{docData.length > 0 ? (
				docData.map((data, index) => (
					<div className='hero' key={index}>
						<div className='hero-content text-left'>
							<h1 className='text-2xl'>{data.name}</h1> <br />
							<p className='py-6'>
								<i>At line number {data.lineNo} </i> <br />
								<i>Explanation:</i> {data.explanation}
							</p>
						</div>
					</div>
				))
			) : (
				<p>Loading...</p>
			)}
		</div>
	);
}

export default ErrorList;