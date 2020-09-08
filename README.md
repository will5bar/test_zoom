# Set Up

 1. Clone o Projeto 
 2. execute **npm i**

# DB

no arquivo lib/config,js tem que atualizar

> DB: {
> nameDB:  "XXX",
> url:  "XXX"
> }

# TEST 

com o comando 

> **npm run test**

# API 

## Add Estado

> POST /addEstado HTTP/1.1 Host: XXXX
> Content-Type: application/json Cache-Control: no-cache 
> Postman-Token: XXX
> 
> { 	"estado" : "SP", 	"id" : "XXX" }


## Get Estado

> GET /getEstado/_id HTTP/1.1 Host: XXX
> Cache-Control: no-cache 
> Postman-Token:XXX


## Get All Estados

> GET /getAllEstado HTTP/1.1 Host: XXX 
> Cache-Control: no-cache
> Postman-Token: XXX


## Update Estado

> PUT /updateEstado/_id  HTTP/1.1 Host:XXX
>  Content-Type: application/json
> Cache-Control: no-cache 
> Postman-Token:XXX
> 
> { 	"estado": "RJ", 	"id": "3" }

## Delete a Estado

> DELETE /deleteEstado/_id HTTP/1.1 Host:XXX 
> Cache-Control: no-cache Postman-Token:XXX
>  Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryXXXX


