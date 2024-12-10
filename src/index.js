const express = require("express");
const cors = require ("cors");

//crear el servidor con express

const server = express ();

// permitir peticiones

server.use(cors());

// correr el servidor en un puerto

const port = 3001;
server.listen(port, () => {
    console.log(`server is running in http://localhost:${port}` )
})