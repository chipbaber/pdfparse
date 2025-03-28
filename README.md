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
npx esbuild index.js --bundle --outfile=./pdf-transform.js --format=esm
```

-- Query to check mle_env
```
SELECT ENV_NAME, LANGUAGE_OPTIONS FROM USER_MLE_ENVS WHERE ENV_NAME='PDF_TRANSFORM'
```

-- Code to run it in SQL Worksheet MLE
```
const {createPDFInJavaScript} = await import('pdflib-module');
createPDFInJavaScript();
```

