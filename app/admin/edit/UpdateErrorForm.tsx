"use client"

import toast, { Toaster } from 'react-hot-toast';
import { useState, useEffect } from 'react';

import 'firebase/compat/firestore';
import firestore from "../../../config/firebase_cs";
import { useRouter, useSearchParams } from 'next/navigation';



function UpdateErrorForm(){
	const searchParams = useSearchParams();
	const errorId = searchParams.get('errorID') || 'errorID' as string;
	const [description, setDescription] = useState('');
	const route = useRouter();

	const docRef = firestore.collection('error-explanations');

	// get description
	useEffect(() => {
		const fetchDescription = async () => {
			const fetchingDescription = toast.loading('fetching Description...');
			try {
				const docSnapshot = await docRef.doc(errorId).get();
				if (docSnapshot.exists) {
					const existingDescription = docSnapshot.data()?.description || '';
					setDescription(existingDescription);
					toast.dismiss(fetchingDescription);
				} else {
					console.error(`Document ID "${errorId}" does not exist.`);
				}
			} catch (error) {
				console.error('error fetching description\n' + error);
				toast.error('something went wrong 🙁', {id: fetchingDescription});
			}
		}
		fetchDescription();
	}, []);

	// update error
	const save = async(event: React.SyntheticEvent) => {
		event.preventDefault();
		const updatingToast = toast.loading('Updating...', {style:{minWidth: '250px'}});
		try {
			// update document
			await docRef.doc(errorId).update({
				description: description
			});
			toast.success('Error Updated', {id: updatingToast, style:{minWidth: '250px'}});
			route.push('/admin'); // reerect
		} catch (error) {
			console.error(error);
			toast.error('something went wrong 🙁', {id: updatingToast, style:{minWidth: '250px'}});
		}
	}

	const openDeleteModal = (event: React.SyntheticEvent) => {
		event.preventDefault();
		const modal = document.getElementById('deleteConfirmationModal');
		if (modal) {
			modal.setAttribute('open', 'true');
		}
	};
	const closeDeleteModal = () => {
		const modal = document.getElementById('deleteConfirmationModal');
		if (modal) {
			modal.removeAttribute('open');
		}
	};

	// Delete error
	const deleteError = async () => {
		closeDeleteModal();
		try {
			await docRef.doc(errorId).delete();
			toast.success('Error deleted successfully', { style: { minWidth: '250px' } });
			route.push('/admin');
		} catch (error) {
			console.error(error);
			toast.error('Failed to delete error', { style: { minWidth: '250px' } });
		}
	};
	

	return(
		<div className="2xl:container 2xl:mx-auto m-7">
			<Toaster />
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
					onClick={openDeleteModal} >
						Delete
					</button>
					<div className="flex space-x-4 justify-end items-center">
						<button className="btn btn-accent w-28" type='submit'>Update</button>
						<button className="btn btn-outline btn-error w-28"
						onClick={(e) => { e.preventDefault(); route.push('/admin') }} >
							Back
						</button>
					</div>
				</div>
			</form>

			{/* Delete Confirmation Modal */}
			<dialog id="deleteConfirmationModal" className="modal">
				<div className="modal-box bg-modal-red border-solid border border-red-600">
					<h3 className="font-bold text-lg">⚠️ Delete</h3>
					<p className="py-4">Are you sure you want to delete this error?</p>
					<div className="modal-action">
						<button className="btn bg-inherit hover:bg-red-600/50" 
						onClick={deleteError}>
							Yes
						</button>
						<button className="btn bg-inherit" 
						onClick={closeDeleteModal}>
							No
						</button>
					</div>
				</div>
			</dialog>
		</div>
	);
}

export default UpdateErrorForm;