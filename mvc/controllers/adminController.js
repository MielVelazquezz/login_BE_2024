// const express = require('express');
// const path = require('path');
// const mysql = require('mysql2');
// const bodyParser = require('body-parser');


// const app = express();

// // Configuração do Body Parser
// app.use(bodyParser.urlencoded({ extended: true }));

// // Configurando o diretório para servir arquivos estáticos
//  app.use(express.static(path.resolve(__dirname, '../views/ctrldev')));

// module.exports = (app) => {
// // Rota para a página inicial
//     app.get("/admin", async (req, res) => {
//         res.setHeader("Access-Control-Allow-Origin", "*");

//         // Corrija o caminho do arquivo index.html
//         res.sendFile(path.resolve(__dirname, '../views/ctrldev', 'index.html'));
//     });

  
// // Rota para processar o formulário de login
// app.post('/login', (req, res) => {
//     const email = req.body.txtctrllogin;
//     const senha = req.body.txtctrlpass;
  
//     // Consulta SQL para verificar o login
//     const sql = 'SELECT * FROM gamers WHERE email_gamer = ? AND senha_gamer = ?';
//     db.query(sql, [email, senha], (err, result) => {
//       if (err) throw err;
  
//       if (result.length > 0) {
//         // Se o login for bem-sucedido, redirecione para home.html
//         res.redirect('/home');
//       } else {
//         // Se o login falhar, redirecione para error.html
//         res.redirect('/error');
//       }
//     });
//   });


//    // Rota para a página home
//    app.get("/home", async (req, res) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");

//     // Corrija o caminho do arquivo index.html
//     res.sendFile(path.resolve(__dirname, '../views/ctrldev', 'home.html'));
// });

  
//   // Rota para a página de erro
//   app.get("/error", async (req, res) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");

//     // Corrija o caminho do arquivo index.html
//     res.sendFile(path.resolve(__dirname, '../views/ctrldev', 'error.html'));
// });

// };
