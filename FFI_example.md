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


```

- MLE test
```
const{testing} = await import ('mle-js-plsql-ffi');

try {
const insertPDF = resolveProcedure('testing');
insertPDF('chipcoolness.pdf');
}
catch (err) {
    return err.errorNum + " " + err.message;
}
```


- Create a procedure that inserts a row into your documents table. 

```
create or replace procedure insertPDF (fileName documents.FILE_NAME%TYPE, fileSize documents.FILE_SIZE%TYPE, fileContent documents.FILE_CONTENT%TYPE) IS
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