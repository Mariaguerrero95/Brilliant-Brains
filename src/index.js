const express = require("express");
const cors = require("cors");

//crear el servidor con express

const server = express();

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
server.get("/projects/list", (req, res) => {
    res.status(200).json({
        success: true,
        message: projects
    })
})

const port = 3001;
server.listen(port, () => {
    console.log(`server is running in http://localhost:${port}`)
})

const staticServerPath = "./web/dist";
server.use(express.static(staticServerPath));

