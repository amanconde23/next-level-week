// importar dependência do sqlite3
// função dentro do objeto é método
// verbose é um método para lançar msgs no terminal
const sqlite3 = require("sqlite3").verbose()

//criar objeto que fará operações no banco de dados
// vai criar um bd nesse caminho ./src/database/database.db
const db = new sqlite3.Database("./src/database/database.db")

// permite usar o require em outros arquivos
module.exports = db
// utilizar o objeto de bd para as operações
//serialize roda uma sequencia de dados
// db.serialize(() => {
    // criar uma tabela
    // usa crase para poder fazer quebra de linha (template string)
    // db.run(`
    //     CREATE TABLE IF NOT EXISTS places (
    //         id INTEGER PRIMARY KEY AUTOINCREMENT,
    //         image TEXT,
    //         name TEXT,
    //         address TEXT,
    //         address2 TEXT,
    //         state TEXT,
    //         city TEXT,
    //         items TEXT
    //     );
    // `)
    // // inserir dados
    // const query = `
    //     INSERT INTO places (
    //         image,
    //         name,
    //         address,
    //         address2,
    //         state,
    //         city,
    //         items
    //     ) VALUES (?,?,?,?,?,?,?);
    // `
    // const values = [
    //     "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=801&q=80",
    //     "Papersider",
    //     "Guilherme Gemballa, Jardim América",
    //     "Número 260",
    //     "Santa Catarina",
    //     "Rio do Sul",
    //     "Papéis e Papelão"
    // ]
    
    // // err é erro
    // function afterInsertData(err){
    //     if(err){
    //         // se erro, return mata a função
    //         return console.log(err)
    //     }
    //     console.log("Cadastrado com sucesso")
    //     // this referencia a resposta
    //     // qdo usa this, não pode ser arrow function
    //     console.log(this)
    // }

    // // function callback: é chamada para ser executada depois de terem sido realizados as instruções anteriores
    // // dexei comentado pois já foi executado uma vez
    // db.run(query, values, afterInsertData)

    // consultar dados
    // db.all seleciona todos
    // primeiro argumento erro, segundo os dados (rows)
    // db.all(`SELECT * FROM places`, function(err, rows){
    //     if(err){
    //         // se erro, return mata a função
    //         return console.log(err)
    //     }
    //     console.log("Aqui estão seus registros: ")
    //     console.log(rows)
    // })

    // deletar um dado
//     db.run(`DELETE FROM places WHERE id = ?`, [3], function(err){
//         if(err){
//             // se erro, return mata a função
//             return console.log(err)
//         }
//         console.log("Registro deletado com sucesso!")
//     })

// })