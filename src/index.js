const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

//crear el servidor con express

const server = express();


// permitir peticiones

server.use(cors());
server.use(express.json({ limit: "25mb" }));

// // correr el servidor en un puerto
// const projects = [{
//     "name": "BookLinker",
//     "slogan": "Conecta lectores con historias inolvidables",
//     "technologies": "JavaScript, React, Firebase",
//     "repo": "https://github.com/autora/booklinker",
//     "demo": "https://booklinker.demo.com",
//     "desc": "Una plataforma que recomienda libros a los usuarios según sus lecturas pasadas y les permite registrar su progreso de lectura.",
//     "job": "Desarrolladora Full Stack",
//     "autor": "Lee Know",
//     "image": "",
//     "photo": "",
// },
// {
//     "name": "InvitePro",
//     "slogan": "Tus eventos, organizados y únicos",
//     "technologies": "HTML, CSS, JavaScript, Node.js",
//     "repo": "https://github.com/autora/invitepro",
//     "demo": "https://invitepro.demo.com",
//     "desc": "Un sitio web para crear invitaciones digitales personalizadas para eventos sociales y corporativos, con opciones para compartir fácilmente en redes.",
//     "job": "Diseñadora de Interfaces y Desarrolladora Web",
//     "autor": "Christopher Bahng",
//     "image": "",
//     "photo": "",
// }
// ];

async function getBDConnection() {
    const connection = await mysql.createConnection({
        host: "iqi37.h.filess.io",
        user: "BrilliantBrains_signalfat",
        password: "b9990e8b796ee759b569deed45b1f8a236b630d1",
        database: "BrilliantBrains_signalfat",
        port: 3307,
    });
    connection.connect();
    return connection;

}


const port = 3001;
server.listen(port, () => {
    console.log(`server is running in http://localhost:${port}`)
})
//ENDPOINT PARA CONECTAR CON LA BASE DE DATOS
server.get("/projects/list", async (req, res) => {
    /*
        Conectar con la base de datos
        Pedir la info a la base de datos
        Cerrar conexión con base de datos
        Enviar la respuesta a front

    */
    const connection = await getBDConnection();
    const sqlQuery = "SELECT * FROM author";
    //ejecutar la Query (como el rayito del workbench)
    const result = await connection.query(sqlQuery);
    //cerrar la conexión con la base de datos
    connection.end();
    //enviar la respuesta a frontend
    if (result.lenght === 0) {
        res.status(404).json({
            status: "fail",
            message: "No se ha encontrado ningún resultado",
        });
    } else {
        res.status(200).json({
            status: "success",
            message: result[0]
        });
    }
});
// ENDPOINT PARA RECOGER LA INFORMACIÓN DE FRONTEND Y AÑADIRLA A LA BASE DE DATOS

server.post("/api/projects", async () => {
    /*
        - Conectarme a la base de datos 
        - Recoger la información que me envía frontend --> body params, req.body
        - Añadir la información a la tabla de estudiantes --> INSERT INTO
            - escribir la query
            - ejecutar la query
        - Finalizar la conexión
        - Responder al frontend

    */
    const connection = await getBDConnection();
    const authorData = req.body; //recojo la info de frontend a través de body params
    console.log(projectData);
    const query = "INSERT INTO author (name, job, image) VALUES(?, ?, ?)";//la interrogación representa los valores dinámicos que se introducirán 
    const [result] = await connection.query(query, [
        authorData.name,
        authorData.job,
        authorData.image
    ]);
    console.log(result);


    res.json({});

})



const staticServerPath = "./web/dist";
server.use(express.static(staticServerPath));



