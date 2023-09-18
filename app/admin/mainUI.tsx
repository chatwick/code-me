"use client"

import { useEffect, useState } from 'react';
import firestore from '../../config/firebase_cs'
import { useRouter } from 'next/navigation';


function MainUI() {
	const [errorList, setErrorList] = useState<string[]>([]);
	const [searchTerm, setSearchTerm] = useState('');
	const route = useRouter();


	useEffect(() => {
		const fetchErrorList = async () => {
			try {
				const querySnapshot = await firestore.collection('error-explanations').get();
				const errors:string[] = [];
				querySnapshot.forEach((doc) => {errors.push(doc.id)});
				setErrorList(errors);
			} catch (error) {
				console.error('Error in "fetchErrorList": ', error);
			}
		}
		fetchErrorList();
	}, []);

	// search function
	const filteredErrors = () => {
		return errorList.filter((error) => {
			return error.toLowerCase().includes(searchTerm.trim().toLowerCase());
		});
	}


	return (
		<div className="p-8 max-w-screen-2xl mx-auto">
			{/* search input and new error button */}
			<div className="flex justify-between items-center">

				{/* search */}
				<div className="flex space-x-2">
					<label htmlFor="search" className='text-xl p-2.5'>🔍 </label>
					<input type="text" placeholder='Search errors...' value={searchTerm}
					className='input input-bordered w-full w-[300px]'
					id='search' onChange={(e) => setSearchTerm(e.target.value)}/>
				</div>

				{/* new error button */}
				<button className="btn btn-accent w-48"
				onClick={(e) => route.push('/admin/new')}>
					➕ add new error
				</button>
			</div>


			{/* error list */}
			<ul>
				{ filteredErrors().map((error, index) => (
					<li key={index}>
						<br />
						<div className="card min-w-96 max-w-[900px] bg-base-100 border-solid border border-slate-700">
							<div className="card-body">
								<h2 className="card-title">{error}</h2>
								<div className="card-actions justify-end">
									<button className="btn btn-outline btn-info w-28" 
									onClick={(e) => route.push('/admin/edit')} >Edit</button>
								</div>
							</div>
						</div>
					</li>
				)) }
			</ul>
		</div>
	);
}

export default MainUI;