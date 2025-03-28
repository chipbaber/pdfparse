

------------
const {PDFDocument} = require('pdf-lib');
const fs = require('fs');

/**/
//Simple example to test pdf creation
async function test() {
  //initialize doc
  const pdfDoc = await PDFDocument.create();
  //add page 
  pdfDoc.addPage()
  console.log('Page Count:'+pdfDoc.getPageCount());
  //save document
  //fs.writeFileSync("./output.pdf", await pdfDoc.save())
}
test();


async function trimPDF(filepath,arr) {
    const existingPdfBytes = fs.readFileSync(filepath);
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    console.log('Initial Page Count:'+pdfDoc.getPageCount());
    //sort array highest to lowest to cut highest to lowest.
    arr.sort(function(a, b) {return b - a;});
    //console.log(arr);
    //Remove a Pages listed in array
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] >= 0 && arr[i] < pdfDoc.getPageCount()) {
         pdfDoc.removePage(arr[i]);
        }
    } 
    console.log('Second Page Count:'+pdfDoc.getPageCount());
    fs.writeFileSync("./output_trimmed.pdf", await pdfDoc.save())
  }



// Core Code to launch 
//trimPDF('./2023_Atria-Fib-Overview.pdf',[2,3,4,9,5])


//Example to pull from URL
async function trimPDFURL(url,arr) {
  console.log('Attempting to get the file: '+ url);
  try {
  const arrayBuffer = await fetch(url).then(res => res.arrayBuffer());
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  console.log('Initial Page Count:'+ pdfDoc.getPageCount());
  }
  catch (err)  {
   console.log('Error retrieving pdf from url.'+err); 
  }
 
  /*
  //sort array highest to lowest to cut highest to lowest.
  arr.sort(function(a, b) {return b - a;});
  //console.log(arr);
  //Remove a Pages listed in array
  for (let i = 0; i < arr.length; i++) {
      if (arr[i] >= 0 && arr[i] < pdfDoc.getPageCount()) {
       pdfDoc.removePage(arr[i]);
      }
  } 
  console.log('Second Page Count:'+pdfDoc.getPageCount());
  */
}

//trimPDFURL('https://pdf-lib.js.org/assets/with_update_sections.pdf',[1]);

