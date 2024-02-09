//pacotinho pra você trabalhar com caminho de arquivos, como ele você pode chegar
//em qualquer diretório ou arquivo de boa, você vai ver ali embaixo.
const path = require('path')
const CupomDAO = require('../../DAO/cupomDAO')

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
//Lembra que você usou o consign no startup? Então, nem tudo é mamão com acucar
//Você precisa fazer isso para usar o app do startup. O app é exatamente o app de lá
module.exports = (app) => {   

   
    app.get("/cupom",verificarAutenticacao, (req, res) => {
        res.setHeader("Access-Control-Allow-Origin","*")
        
        res.sendFile(path.resolve("mvc/views/ctrldev/cupom/addcupons.html"))
    })

    app.get("/cupom/lista",verificarAutenticacao, async (req, res) => {
        res.setHeader("Access-Control-Allow-Origin","*")

        const cupomDAO = new CupomDAO()
        const lista_cupons = await cupomDAO.consultarCupons()
   
        res.render("cupom/listcupons", { cupom: lista_cupons })
    })

    app.get("/cupons",verificarAutenticacao, async (req, res) => {
        
        const cupomDAO = new CupomDAO();
        res.setHeader("Access-Control-Allow-Origin","*")

        res.status(201).json(await cupomDAO.consultarCupons())

    })


    app.post("/registrarcupom", (req, res) => {
        
        const cupomDAO = new CupomDAO();
        res.setHeader("Access-Control-Allow-Origin","*")
        const {txtnomecupom, txtcodcupom, dtval, txtvalorcupom } = req.body

        cupomDAO.registrarCupom(txtnomecupom, txtcodcupom, dtval, txtvalorcupom)

        res.status(201).json({ 
            msg: "ok"
        })

    })
    app.delete("/cupom/apagar/:id", async (req,res) =>{
        const cupomDAO = new CupomDAO();
        res.setHeader("Access-Control-Allow-Origin","*")
    
        res.json(await cupomDAO.apagarCupom(req.params.id))

    })

    app.get("/cupom/alterar/:id", async (req, res) => {
        const cupomDAO = new CupomDAO()

        const dtcupom = await cupomDAO.consultarCuponId(req.params.id)
        

        res.render("cupom/upcupons", { cupom: dtcupom  })
    })

    app.put("/cupom/alterar", async (req, res) => {
        const cupomDAO = new CupomDAO();
        res.setHeader("Access-Control-Allow-Origin","*")

        //Destructuring
        const {nome, codigo, validade, valor, id } = req.body

        const r = await cupomDAO.atualizarCupom(id, nome, codigo, validade,valor)

        res.json({r})
        

    })
}