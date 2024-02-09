const DescontoDAO = require("../../DAO/descontoDAO.js")
const path = require("path")
const Desconto = require("../models/descontoModels.js")

function verificarAutenticacao(req, res, next) {
    // Verifica se o usuário está autenticado
    if (req.session.user && req.session.user.email) {
        // Se estiver autenticado, prossiga para a próxima middleware
        next();
    } else {
        // Se não estiver autenticado, redirecione para a página de login
        res.redirect('/admin');
    }
}

module.exports = (app) => {

    app.get("/descontos",verificarAutenticacao, async (req, res) => {
        res.setHeader("Access-Control-Allow-Origin","*")
      
 
        //Você tem que fazer isso para os outros conseguirem acessar sua aplicação.
        //Repita essa configuração para as rotas que você quer liberar para ser acessada
        //por outras pessoas.
        
        res.sendFile(path.resolve("mvc/views/ctrldev/desconto/adddescontos.html"))
        //Retorna os dados
      
     })
     app.get("/getDesconto",verificarAutenticacao, async (req, res) => {
        const descontoDAO = new DescontoDAO()       
            
        res.setHeader("Access-Control-Allow-Origin","*")
        res.json(await descontoDAO.consultarDesconto())
    })
     app.post("/registrardesconto",(req,res) =>{
        const descontoDAO = new DescontoDAO();
        res.setHeader("Acess-Control-Allow-Origin","*")
        const {txtvalordesconto} = req.body

        descontoDAO.registrarDesconto(txtvalordesconto)

        res.status(201).json({ 
            msg: "ok"
        })
    })
    app.get("/descontos/lista",verificarAutenticacao, async (req, res) => {
        res.setHeader("Access-Control-Allow-Origin","*")
        const descontoDAO = new DescontoDAO()
        const lista_descontos = await descontoDAO.consultarDesconto()
        res.render("desconto/listdescontos", { descontos: lista_descontos })
    })
    app.delete("/descontos/apagar/:id", async (req,res) =>{
        const descontoDAO = new DescontoDAO();
        res.setHeader("Access-Control-Allow-Origin","*")
    
        res.json(await descontoDAO.apagarDesconto(req.params.id))

    })
     app.get("/descontos/alterar/:id", async (req, res) => {
        const descontoDAO = new DescontoDAO()

        const dtdesconto = await descontoDAO.consultarDescontoId(req.params.id)

        res.render("desconto/updescontos", { desconto: dtdesconto  })
    })
    app.put("/desconto/alterar", async (req, res) => {
        const descontoDAO = new DescontoDAO();
        res.setHeader("Access-Control-Allow-Origin","*")

        //Destructuring
        const {valor, id } = req.body

        const r = await descontoDAO.atualizarDesconto(id,valor)

        res.json({r})

    })
   
}