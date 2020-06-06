//chama o express
const express = require("express")
//executa função express no server
const server = express()

//pegar o banco de dados
const db = require("./database/db.js")

// configurar pasta public
server.use(express.static("public"))

// habilitar uso do req.body na aplicação
// server use para fazer configurações no express
server.use(express.urlencoded({extended: true}))

// utilizando template engine
const nunjucks = require("nunjucks")
//qual pasta estão os htmls
nunjucks.configure("src/views", {
    express: server,
    //memoria cache, deixa mais rapido, porem, vc faz alteração no css por ex, ele manda uma versao antiga, por isso, deixar true enquanto está desenvolvendo
    noCache: true
})

//configurar caminhos da aplicação (rotas)
//req (requisição/pedido)
//res (resposta)
//estou enviando a / para o servidor
// rota index
server.get("/", (req, res) => {
    //envia arquivo index
    //dirname diretorio
    // res.sendFile(__dirname + "/views/index.html")
    // com nunjucks
    //envia para o index um dado setado no back-end (title)
    return res.render("index.html", { title: "Um título" })
})

// rota create-point (q recebe dados do formulario)
server.get("/create-point", (req, res) => {
    // req.query: query strings da url (pega oq está sendo enviado na url)
    // não funciona mais pois o formulario está usando o metodo post
    // console.log(req.query)
    return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {
    // req.body: o corpo do formulario (por padrão, é desabilitado no express, tem q habilitar)
    // console.log(req.body)
    // inserir dados no bd
    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]
    
    function afterInsertData(err){
        if(err){
            console.log(err)
            return res.render("create-point.html", {error: true})
        }
        console.log("Cadastrado com sucesso")
        console.log(this)

        return res.render("create-point.html", {saved: true})
    }

    db.run(query, values, afterInsertData)
})

// rota search-results
server.get("/search", (req, res) => {
    // se não for digitado nada na pesquisa
    const search = req.query.search

    if(search === ""){
        return res.render("search-results.html", {total: 0})
    }

    // pegar os dados do bd
    //se usar where city = , o digitado tem q ser exatamente igual ao q está cadastrado no banco, por isso usa LIKE, parecido, % q começa ou termina com o termo digitado
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows){
        if(err){
            return console.log(err)
        }
        // pega total de registros
        const total = rows.length
        // para renderizas os resultados da consulta na pag html search-results
        return res.render("search-results.html", {places: rows, total: total})
    })
})

//ligar o servidor
server.listen(3000)