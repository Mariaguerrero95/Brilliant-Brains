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

//configurar el servidor para usar el motor de plantillas

server.set("view engine", "ejs");

const port = process.env.PORT;
server.listen(port, () => {
    console.log(`server is running in http://localhost:${port}`)
})
const urlPort = process.env.PORT;
const URL = process.env.PROD
    ? "https://brilliant-brains.onrender.com"
    : `http://localhost:${urlPort}`;
console.log(process.env);
server.listen(port, () => {
    console.log(`Server is running in http://localhost:${urlPort}`);
});



async function getBDConnection() {
    const connection = await mysql.createConnection({
        host: "sql7.freesqldatabase.com",
        user: process.env.USER_DB,
        password: process.env.PASSWORD_DB,
        database: "sql7752607",
        port: process.env.PORT_DB,
    });
    connection.connect();
    return connection;

}



//MOTOR DE PLANTILLAS
server.get("/projects/:idProject", async (req, res) => {
    /*
        Conectar con la base de datos
        Pedir la info a la base de datos
        Cerrar conexión con base de datos
        Enviar la respuesta a front

    */
    const projectId = req.params.idProject;
    const connection = await getBDConnection();
    const sqlQuery = "SELECT * FROM proyects INNER JOIN author ON proyects.fk_author = author.idAuthor WHERE proyects.idProyect = ?";
    //ejecutar la Query (como el rayito del workbench)
    const [result] = await connection.query(sqlQuery, [projectId]);
    //cerrar la conexión con la base de datos
    connection.end();
    //enviar la respuesta a frontend
    if (result.length === 0) {
        res.status(404).json({
            status: "fail",
            message: "No se ha encontrado ningún resultado",
        });
    } else {
        res.render("detailProject", { project: result[0] });
    }
});
//ENDPOINT PARA VER LOS PROYECTOS
server.get("/allProjects", async (req, res) => {
    const connection = await getBDConnection();
    const query = "SELECT * FROM author INNER JOIN proyects ON proyects.fk_author = author.idAuthor;";
    const [result] = await connection.query(query);
    connection.end();
    if (result.length === 0) {
        res.status(404).json({
            status: "error",
            message: "No hay ningún registro"
        });
    } else {
        res.status(200).json({
            status: "success",
            message: result
        })
    }
})


//ENDPOINT PARA RECOGER LA INFORMACIÓN DE FRONTEND Y AÑADIRLA A LA BASE DE DATOS


server.post("/api/projects", async (req, res) => {
    const authorData = req.body;
    console.log(authorData);
    const connection = await getBDConnection();
    const query = "INSERT INTO author (authorName, job, image) VALUES(?, ?, ?)";
    const [authorResult] = await connection.query(query, [
        authorData.authorName,
        authorData.job,
        authorData.image
    ]);

    //añadir proyecto a la tabla proyectos
    const queryProject = "INSERT INTO proyects (name, slogan, repo, demo, tech, description, photo, fk_author) VALUES(?, ?, ?, ?, ?, ?, ?, ?);";
    const [projectResult] = await connection.query(queryProject, [
        authorData.name,
        authorData.slogan,
        authorData.repo,
        authorData.demo,
        authorData.tech,
        authorData.description,
        authorData.photo,
        authorResult.insertId
    ])
    connection.end();
    res.status(201).json({
        success: true,
        cardURL: `${URL}/projects/${projectResult.insertId}`,

    });

});

const staticServerPath = "./web/dist";
server.use(express.static(staticServerPath));

const pathServerPublicStyles = './src/public-css';
server.use(express.static(pathServerPublicStyles));





