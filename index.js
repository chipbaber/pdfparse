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

export async function pdfPageCount(base64In) {
  try {
    console.log('Initializing Page Count');
    const dataUri = 'data:application/pdf;base64,' + base64In;
    const pdfIn = await PDFDocument.load(dataUri);
   // console.log('Initial Page Count:'+pdfIn.getPageCount());
    return pdfIn.getPageCount();
  }
  catch (err) {
    console.log('Error inside pdfPageCount'+ err); 
  }
}


//Testing
console.log('Testing');

const base64 =
 'JVBERi0xLjcKJYGBgYEKCjUgMCBvYmoKPDwKL0ZpbHRlciAvRmxhdGVEZWNvZGUKL0xlbm' +
 'd0aCAxMDQKPj4Kc3RyZWFtCniccwrhMlAAwaJ0Ln2P1Jyy1JLM5ERdc0MjCwUjE4WQNC4Q' +
 '6cNlCFZkqGCqYGSqEJLLZWNuYGZiZmbkYuZsZmlmZGRgZmluDCQNzc3NTM2NzdzMXMxMjQ' +
 'ztFEKyuEK0uFxDuAAOERdVCmVuZHN0cmVhbQplbmRvYmoKCjYgMCBvYmoKPDwKL0ZpbHRl' +
 'ciAvRmxhdGVEZWNvZGUKL1R5cGUgL09ialN0bQovTiA0Ci9GaXJzdCAyMAovTGVuZ3RoID' +
 'IxNQo+PgpzdHJlYW0KeJxVj9GqwjAMhu/zFHkBzTo3nCCCiiKIHPEICuJF3cKoSCu2E8/b' +
 '20wPIr1p8v9/8kVhgilmGfawX2CGaVrgcAi0/bsy0lrX7IGWpvJ4iJYEN3gEmrrGBlQwGs' +
 'HHO9VBX1wNrxAqMX87RBD5xpJuddqwd82tjAHxzV1U5LPgy52DKXWnr1Lheg+j/c/pzGVr' +
 'iqV0VlwZPXGPCJjElw/ybkwUmeoWgxesDXGhHJC/D/iikp1Av80ptKU0FdBEe25pPihAM1' +
 'u6ytgaaWfs2Hrz35CJT1+EWmAKZW5kc3RyZWFtCmVuZG9iagoKNyAwIG9iago8PAovU2l6' +
 'ZSA4Ci9Sb290IDIgMCBSCi9GaWx0ZXIgL0ZsYXRlRGVjb2RlCi9UeXBlIC9YUmVmCi9MZW' +
 '5ndGggMzgKL1cgWyAxIDIgMiBdCi9JbmRleCBbIDAgOCBdCj4+CnN0cmVhbQp4nBXEwREA' +
 'EBAEsCwz3vrvRmOOyyOoGhZdutHN2MT55fIAVocD+AplbmRzdHJlYW0KZW5kb2JqCgpzdG' +
 'FydHhyZWYKNTEwCiUlRU9G';

 const page_count = await pdfPageCount(base64);
 console.log('Total Pages is: '+ page_count);

