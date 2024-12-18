const express = require("express");
const cors = require("cors");
const path = require("path");
const mysql = require("mysql2/promise");


//crear el servidor con express

const server = express();


// permitir peticiones

server.use(cors());
server.use(express.json({ limit: "25mb" }));

require("dotenv").config();
server.set("view engine", "ejs");

const port = 3001;
server.listen(port, () => {
    console.log(`server is running in http://localhost:${port}`)
})

const staticServerPath = "./web/dist";
server.use(express.static(staticServerPath));

async function getBDConnection() {
    const connection = await mysql.createConnection({
        host: "sql7.freesqldatabase.com",
        user: process.env.USER_DB,
        password: process.env.PASSWORD_DB,
        database: "sql7752607",
        port: process.env.PORT,
    });
    connection.connect();
    return connection;

}



//ENDPOINT PARA CONECTAR CON LA BASE DE DATOS
server.get("/projects/list", async (req, res) => {
    /*
        Conectar con la base de datos
        Pedir la info a la base de datos
        Cerrar conexión con base de datos
        Enviar la respuesta a front

    */
    const projectId = req.params.id;
    const connection = await getBDConnection();
    const sqlQuery = "SELECT * FROM proyects INNER JOIN author ON proyects.fk_author = author.idAuthor WHERE proyects.idProyect = ?";
    //ejecutar la Query (como el rayito del workbench)
    const result = await connection.query(sqlQuery, [projectId]);
    //cerrar la conexión con la base de datos
    connection.end();
    //enviar la respuesta a frontend
    if (result.length === 0) {
        res.status(404).json({
            status: "fail",
            message: "No se ha encontrado ningún resultado",
        });
    } else {
        res.status(200).json({
            status: "success",
            message: result
        });
    }
});
//ENDPOINT PARA RECOGER LA INFORMACIÓN DE FRONTEND Y AÑADIRLA A LA BASE DE DATOS

server.post("/api/projects", async (req, res) => {
    // //     /*
    // //         - Conectarme a la base de datos
    // //         - Recoger la información que me envía frontend --> body params, req.body
    // //         - Añadir la información a la tabla de estudiantes --> INSERT INTO
    // //             - escribir la query
    // //             - ejecutar la query
    // //         - Finalizar la conexión
    // //         - Responder al frontend

    // //     */
    const projectData = req.body; //recojo la info de frontend a través de body params
    const connection = await getBDConnection();

    console.log(projectData);
    const query = "INSERT INTO proyects (name, slogan, repo, demo, tech, description, photo, url) VALUES(?, ?, ?, ?, ?, ?, ?, ?)";//la interrogación representa los valores dinámicos que se introducirán
    const [result] = await connection.query(query, [
        projectData.name,
        projectData.slogan,
        projectData.repo,
        projectData.demo,
        projectData.tech,
        projectData.description,
        projectData.photo,
        projectData.url
    ]);
    console.log(result);
    connection.end();
    res.status(201).json({
        success: true,
        id: result.insertId

    });

})
server.post("/api/author", async (req, res) => {
    const authorData = req.body;
    const connection = await getBDConnection();
    const query = "INSERT INTO author (name, job, image) VALUES(?, ?, ?)";
    const [result] = await connection.query(query, [
        authorData.name,
        authorData.job,
        authorData.image
    ]);
    connection.end();
    res.status(201).json({
        success: true,
        id: result.insertId

    });

})







