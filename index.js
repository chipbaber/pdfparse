import { PDFDocument, StandardFonts, rgb } from "pdf-lib"
//import * as fs from 'node:fs';

//inputbase 64 and get page  count
export async function pdfPageCount(base64In) {
  try {
    //This line is a polyfill for execution in the database on larger base64 arrays
    globalThis.setTimeout = (functionRef, delay, ...args) => {functionRef.apply(null, args);}
    const dataUri = 'data:application/pdf;base64,' + base64In;
    const pdfIn = await PDFDocument.load(dataUri);
    return await pdfIn.getPageCount();
  }
  catch (err) {
    console.log('Error inside pdfPageCount'+ err); 
  }
}

/*Test Casebase64
console.log('Testing Base64 encode');

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
*/


export async function pdfPageCountUnit8Array(pdfIn) {
  try {
  //This line is a polyfill for execution in the database on larger pdfs
  globalThis.setTimeout = (functionRef, delay, ...args) => {functionRef.apply(null, args);}
   /*Test Code to run pdf test case locally from test file*/
   //const pdfIn = fs.readFileSync('./input/2023_Annals_Contraception.pdf');   
    const pdfDoc = await PDFDocument.load(pdfIn);
    const pages = pdfDoc.getPageCount();
   // console.log("Document has " + pdfDoc.getPageCount());
    return pages;
  }
  catch (err) {
    console.log('Error inside pdfPageCountUnit8Array'+ err); 
  }
}

/*Test Case for  Base Test for pdfPageCountUnit8Array
pdfPageCountUnit8Array('Test');
*/

export async function extractPage(pdfIn, pageNumber) {
  try {

   /*Test Code to run local file test
    const pdfIn = fs.readFileSync('./input/2023_Annals_Contraception.pdf');  
   */

   //This line is a polyfill for execution in the database on larger pdfs
   globalThis.setTimeout = (functionRef, delay, ...args) => {functionRef.apply(null, args);}
    const pdfDoc = await PDFDocument.load(pdfIn);
    const pages = pdfDoc.getPageCount();
    const arr = [];
    //subtract 1 from page number to account for 0 array. 
    arr.push(pageNumber-1);

    //check to see if page in range of document
    if (pageNumber >= 0 && pageNumber <= pages) {
      //Create New PDF
      const newPdfDoc = await PDFDocument.create();
      //Copy the page
      const [currentPage] = await newPdfDoc.copyPages(pdfDoc, arr)
      //add copied page
      newPdfDoc.addPage(currentPage);

      /*Test Case local Code 
      console.log('Initial Page Count:'+newPdfDoc.getPageCount());
      // For local testing
      fs.writeFileSync('./output/'+'pdf_page_'+pageNumber+'.pdf', await newPdfDoc.save()); 
      console.log('Writing file: '+'./output/'+'pdf_page_'+pageNumber+'.pdf');
       */
       return await newPdfDoc.save();
    }
    else {
      throw new Error("Page number "+pageNumber+" not in range of document size. Current document has "+pages+" pages.");
    }



  }
  catch (err) {
    console.log('Error inside getPage'+ err); 
  }
}

/*Test Case for extractPage*/ 
//console.log('Base Test for getPage');
//Load the original document
//extractPage('Test',5);

/*Example Code for future use to extract all pages from a pdf as individual pages and save to a BLOB in the database. */
/**/
export async function splitPDFIntoPages(pdf, pdf_name) {
  try {
    globalThis.setTimeout = (functionRef, delay, ...args) => {
      functionRef.apply(null, args);
    };
    //console.log("Starting Split PDF");
    const pdfIn = await PDFDocument_default.load(pdf);
    for (let i = 0; i < pdfIn.getPageCount(); i++) {
      const newPdfDoc = await PDFDocument_default.create();
      const [currentPage] = await newPdfDoc.copyPages(pdfIn, [i]);
      newPdfDoc.addPage(currentPage);
      const pdfBytes = await newPdfDoc.save();

      const size = pdfBytes.length;
      const fileName = pdf_name.substring(0, pdf_name.length - 4) + "_page_" + i + ".pdf";
      console.log("Saving file: " + fileName+" Size: "+ size);
      let result = session.execute(
        "insert into documents (file_name, file_size, file_type, file_content) values (:pdfname, :pdfsize,'application/pdf',:pdf)",
        {
          pdfname: { dir: oracledb.BIND_IN, val: fileName, type: oracledb.STRING },
          pdfsize: { dir: oracledb.BIND_IN, val: size, type: oracledb.NUMBER },
          pdf: { dir: oracledb.BIND_IN, val: pdfBytes, type: oracledb.UINT8ARRAY }
        }
      );
      let rowsInserted = result.rowsAffected;
      console.log("Rows Inserted: " + rowsInserted);
    }
  } catch (err) {
    console.log("Error inside splitPDFIntoPages" + err);
  }
}

