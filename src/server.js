//chama o express
const express = require("express")
//executa função express no server
const server = express()

// configurar pasta public
server.use(express.static("public"))

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

// rota create-point
server.get("/create-point", (req, res) => {
    return res.render("create-point.html")
})

// rota search-results
server.get("/search", (req, res) => {
    return res.render("search-results.html")
})

//ligar o servidor
server.listen(3000)