# Sample Code To parse out PDFs into Pages or Subsets of Pages 
Notes on steps to get code to run. 

-- Initialize json package
```
npm init -y
```

- List packages
```
npm list
```

- Install libraries
```
npm install pdf-lib
npm install node-fetch
```

- Deinstall libraries
```
npm uninstall node-fetch
```

--Add Type Node Module to the package.json
```
"type":"module",
```

If you hit the error on installing then run:
```
Get-ExecutionPolicy
```
Then
```
Set-ExecutionPolicy -Scope CurrentUser
```
Set to 
```
RemoteSigned
```

![](assets/2025-03-24-10-16-00.png)

-- Create a index.js file

-- For the MLE Module grab the npm library paths.

```
https://cdn.jsdelivr.net/npm/pdf-lib/dist/pdf-lib.min.js
```

-- Grant the following to your schema

```
grant execute dynamic mle to vector;
grant execute on javascript to vector;
grant create mle to vector;
grant db_developer_role to vector;
```

-- On local machine bundle up all the libraries required to execute the .js module. 
```
npx esbuild index.js --bundle --outfile=./pdf-transform-bundle.js --format=esm
```

-- Query to check mle_env
```
SELECT ENV_NAME, LANGUAGE_OPTIONS FROM USER_MLE_ENVS WHERE ENV_NAME='PDF_TRANSFORM'
```

--base64function
```
SELECT apex_web_service.blob2clobbase64(FILE_CONTENT) FROM DOCUMENTS
```

-- Code to run it in SQL Worksheet MLE
```
const {createPDFInJavaScript} = await import('pdflib-module');
createPDFInJavaScript();
```

-- Building your function ex. 23ai typescript syntax
```
create or replace function  pdfPageCount(inPDF in blob) return number
as mle module PDFLIB_MODULE env PDF_TRANSFORM signature 'pdfPageCount(Uint8Array)';
```

-- Query with function
```
select pdfPageCount(FILE_CONTENT) from documents;
```

-- Example MLE function with query WIP
```
const {pdfPageCount} = await import('pdflib-module');
const{oracledb} = await import ('mle-js-oracledb');

try {
const result = session.execute(
    `SELECT ID, FILE_NAME, FILE_CONTENT FROM DOCUMENTS`,
    [],{fetchInfo:{
            ID: {type: oracledb.STRING},
            FILE_NAME: {type: oracledb.STRING},
            FILE_CONTENT :{type: oracledb.UINT8ARRAY}
        },
    outFormat: oracledb.OUT_FORMAT_OBJECT});

for (let row of result.rows) {
    const ID = row.ID;
    //console.log(typeof ID);
    const FILE_NAME = row.FILE_NAME;
    //console.log(typeof FILE_NAME);
    const PDFBytes = row.FILE_CONTENT;
    console.log('File_Content has a type of: '+typeof PDFBytes);
    console.log('File_Content has a length of file: '+ PDFBytes.length);
    console.log(PDFBytes instanceof Uint8Array);
    
   // const PAGES = await pdfPageCount(PDFBytes);
   // console.log(`ID: ${ID} - filename: ${FILE_NAME} - Page Count: ${PAGES}`);
}
}
catch (err) {
    return err.errorNum + " " + err.message;
}
```