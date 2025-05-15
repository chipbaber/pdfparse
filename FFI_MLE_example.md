## Example Code for Oracle MLE Foriegn Function Interface in 23ai

In this video we will show how to easily call pl/sql procedures from javascript code in the Oracle 23ai Autonomous Database. 


- Simple function
```
CREATE or replace FUNCTION get_docCount RETURN NUMBER 
   IS docCount NUMBER(10);
   BEGIN 
      SELECT count(*) INTO docCount FROM documents; 
      RETURN (docCount); 
    END;
/
```

- Query
```
select get_docCount() from dual;
```

- Call from MLE FFI
```
const getTotalDocs = plsffi.resolveFunction('get_docCount');
const theAnswer = getTotalDocs();
console.log('The total number of documents is: '+theAnswer);
```

- Now lets create a more advanced example to show input and output variables. 
```
create or replace procedure myStats(atBats IN number, hits IN number, walks_hbp IN number, sac IN number, battingAvg OUT number, onBasePercentage out number) is
BEGIN
battingAvg := round(hits/(atBats),3);
onBasePercentage := round((hits+walks_hbp)/(atBats+walks_hbp+sac),3);
END myStats;
```

- Test in pl/sql
```
DECLARE
  myAvg number;
  myOBP number;
BEGIN
  myStats (15, 4, 3, 1, myAvg, myOBP);
  DBMS_OUTPUT.PUT_LINE ('I am batting, ' || myAvg || ' with a on base percentage of '|| myOBP );
END;
```

- Test in Javascript
```
//map the procedure
const getMyStats = plsffi.resolveProcedure('myStats');
//Set the output variables
const myAvg = plsffi.arg();
const myOBP = plsffi.arg();
//Run the procedure
getMyStats(15,4,3,1,myAvg,myOBP);
/*getMyStats({
atBats: 15,
hits: 4,
walks_hbp: 3,
sac: 1,
battingAvg: myAvg,
onBasePercentage: myOBP
});*/
console.log('I am batting, ' + myAvg.val + ' with a on base percentage of '+ myOBP.val);
```

- Create a procedure that inserts a row into your documents table. 

```
create or replace procedure insertPDFPage (fileName documents.FILE_NAME%TYPE, fileSize documents.FILE_SIZE%TYPE, fileContent documents.FILE_CONTENT%TYPE) IS
  PRAGMA AUTONOMOUS_TRANSACTION;
  BEGIN
  savepoint newDocInsert;
  insert into documents (file_name, file_size, file_type, file_content) values (fileName, fileSize,'application/pdf',fileContent);
  commit;
  exception
  when others then rollback to newDocInsert;
  RAISE;
END;
```

- MLE test insert all rows of document with session execute to table. 
```
const {pdfPageCountUnit8Array} = await import('pdflib-module');
const {extractPage} = await import('pdflib-module');
const {splitPDFIntoPages} = await import('pdflib-module');

//Lets query the document    
const result = session.execute(
    'SELECT ID, FILE_NAME, FILE_CONTENT FROM DOCUMENTS where id = 3',
    [],{fetchInfo:{
            ID: {type: oracledb.STRING},
            FILE_NAME: {type: oracledb.STRING},
            FILE_CONTENT :{type: oracledb.UINT8ARRAY}
        },
    outFormat: oracledb.OUT_FORMAT_OBJECT});

for (let row of result.rows) {
    const pages = await pdfPageCountUnit8Array(row.FILE_CONTENT);
    console.log('ID: '+ row.ID + ' Filename: '+ row.FILE_NAME + ' Page Count: '+  pages);
    splitPDFIntoPages(row.FILE_CONTENT,row.FILE_NAME);
}
```

- Show results of all documents
```
select * from documents

delete documents where ID  >= <add id>
```