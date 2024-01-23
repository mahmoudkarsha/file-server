const http = require('http')

http.createServer((req,res)=>{res.end("Hi")}).listen(3030, ()=>{console.log("Server Running")})