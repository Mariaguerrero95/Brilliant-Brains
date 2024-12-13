const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

//crear el servidor con express

const server = express();
server.use(express.json());

// permitir peticiones

server.use(cors());

// correr el servidor en un puerto
const projects = [{
    "name": "BookLinker",
    "slogan": "Conecta lectores con historias inolvidables",
    "technologies": "JavaScript, React, Firebase",
    "repo": "https://github.com/autora/booklinker",
    "demo": "https://booklinker.demo.com",
    "desc": "Una plataforma que recomienda libros a los usuarios según sus lecturas pasadas y les permite registrar su progreso de lectura.",
    "job": "Desarrolladora Full Stack",
    "autor": "Lee Know",
    "image": "",
    "photo": "",
},
{
    "name": "InvitePro",
    "slogan": "Tus eventos, organizados y únicos",
    "technologies": "HTML, CSS, JavaScript, Node.js",
    "repo": "https://github.com/autora/invitepro",
    "demo": "https://invitepro.demo.com",
    "desc": "Un sitio web para crear invitaciones digitales personalizadas para eventos sociales y corporativos, con opciones para compartir fácilmente en redes.",
    "job": "Diseñadora de Interfaces y Desarrolladora Web",
    "autor": "Christopher Bahng",
    "image": "",
    "photo": "",
}
];

async function getBDConnection() {
    const connection = await mysql.createConnection({
        host: "iqi37.h.filess.io",
        user: "BrilliantBrains_signalfat",
        password: "b9990e8b796ee759b569deed45b1f8a236b630d1",
        database: "BrilliantBrains_signalfat",
        port: 3307
    })
    connection.connect();
    return connection;

}


const port = 3001;
server.listen(port, () => {
    console.log(`server is running in http://localhost:${port}`)
})

server.get("/projects/list", async (req, res) => {
    /*
        Conectar con la base de datos
        Pedir la info a la base de datos
        Cerrar conexión con base de datos
        Enviar la respuesta a front

    */
    res.status(200).json({
        success: true,
        message: projects
    })
    const connection = await getBDConnection();
    const info = req.body;
    connection.end();
    res.json({});
})

const staticServerPath = "./web/dist";
server.use(express.static(staticServerPath));



