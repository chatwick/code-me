"use client"

import { Alert } from '../../components/Alert'
import { useState } from 'react';

import 'firebase/compat/firestore';
import firestore from "../../../config/firebase_cs";
import { useRouter } from 'next/navigation';



function UpdateErrorForm(){
	const errorId = 'errorID';
	const [description, setDescription] = useState('');
	const route = useRouter();

	const docRef = firestore.collection('error-explanations');

	// create new error
	const save = async(event: React.SyntheticEvent) => {
		event.preventDefault();
		try {
			// create new document
			await docRef.doc(errorId).update({
				description: description
			});

			// reerect
			route.push('/admin');
		} catch (error) {
			console.error(error);
			Alert({message:"something went wrong :(", type:'error'});
		}
	}

	return(
		<div className="2xl:container 2xl:mx-auto m-7">
			<br />
			<form action="" method="post" className="form-control w-full max-w-[100%]" onSubmit={save}>
				{/* error name/ID */}
				<label htmlFor="errorName" className="label label-text">Error name (ID): </label>
				<input type="text" name="errorName" id="errorName" 
				className="input input-bordered w-full max-w-[100%]"
				value={errorId} disabled /> <br />

				{/* error description */}
				<label htmlFor="description" className="label label-text">Description </label>
				<textarea name="description" id="description" 
				className="textarea textarea-bordered textarea-lg w-full max-w-[100%] h-96 text-base"
				value={description} onChange={(e) => setDescription(e.target.value)} >
				</textarea> <br />

				{/* buttons */}
				<div className='flex justify-between items-center'>
					<button className="btn btn-outline btn-error w-28"
					onClick={() => route.push('/admin')} >
						Delete
					</button>
					<div className="flex space-x-4 justify-end items-center">
						<button className="btn btn-accent w-28" type='submit'>Save</button>
						<button className="btn btn-outline btn-error w-28"
						onClick={() => route.push('/admin')} >
							Cancel
						</button>
					</div>
				</div>
			</form>
		</div>
	);
}

export default UpdateErrorForm;