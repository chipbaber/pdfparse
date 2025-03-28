import { PDFDocument, StandardFonts, rgb } from "pdf-lib"
//import * as fs from 'node:fs';

/*
export async function splitPDFIntoPages(pdf) {
  try {
  console.log('Starting Split PDF');
  //Load the original document
  const PdfBytes = fs.readFileSync(pdf);
  const pdfIn = await PDFDocument.load(PdfBytes);  

  console.log('Initial Page Count:'+pdfIn.getPageCount());
  //Loop through each page to chunk out each individual page. 
  for (let i = 0; i < pdfIn.getPageCount(); i++) {
    console.log('Extracting Page:'+i);
    //Create New PDF
    const newPdfDoc = await PDFDocument.create();
    //Copy the page
    const [currentPage] = await newPdfDoc.copyPages(pdfIn, [i])
    //add copied page
    newPdfDoc.addPage(currentPage);
    console.log('Initial Page Count:'+newPdfDoc.getPageCount());

    //for use in Autonomous leverage
  //  const newPdfBytes = await newPdfDoc.save();
    console.log('Writing file: '+'./output/'+pdf.substring(8,pdf.length -4)+'_'+i+'.pdf');

    // For local testing
    //fs.writeFileSync('./output/'+pdf.substring(8,pdf.length -4)+'_'+i+'.pdf', await newPdfDoc.save()); 
    }
    
}
catch (err) {
  console.log('Error inside splitPDFIntoPages'+ err); 
}

}
*/
//splitPDFIntoPages('./input/2019_JAMA_Egg-risk.pdf');

export async function pdfPageCount(pdf) {
  try {
  //  const PdfBytes = fs.readFileSync(pdf);
  //  const pdfIn = await PDFDocument.load(PdfBytes); 
  //Mapping in so we can pass in a blob
    const pdfIn = await PDFDocument.load(pdf);
    //console.log('Initial Page Count:'+pdfIn.getPageCount());
    return pdfIn.getPageCount();
  }
  catch (err) {
    console.log('Error inside pdfPageCount'+ err); 
  }
}

//pdfPageCount('./input/2019_JAMA_Egg-risk.pdf').then(data => {console.log(data)});