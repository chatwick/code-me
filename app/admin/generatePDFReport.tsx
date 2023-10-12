import pdfMake from 'pdfmake/build/pdfmake';
import vfsFonts from 'pdfmake/build/vfs_fonts';
import 'firebase/compat/firestore';
import firestore from "../../config/firebase_cs";

// Define the fonts for pdfmake
pdfMake.vfs = vfsFonts.pdfMake.vfs;

const generatePDFReport = async () => {
	const docRef = firestore.collection('error-explanations');
	const errors: { ErrorID: string, Description: string }[] = [];

	try {
		const querySnapshot = await docRef.get();
		querySnapshot.forEach((doc) => {
			const errorId = doc.id;
			const description = doc.data()?.description || '';
			errors.push({ ErrorID: errorId, Description: description });
		});

		const docDefinition = {
			content: [
				{ text: 'Error Report', style: 'header' },
				{ text: '\n' },
				{
					table: {
						headerRows: 1,
						widths: ['auto', '*'],
						body: [
							['Error ID', 'Description'],
							...errors.map((error) => [error.ErrorID, error.Description]),
						],
					},
				},
			],
			styles: {
				header: {
					fontSize: 18,
					bold: true,
				},
			},
		};

		pdfMake.createPdf(docDefinition).download('error_report.pdf');
	} catch (error) {
		console.error(error);
	}
};

export default generatePDFReport;
