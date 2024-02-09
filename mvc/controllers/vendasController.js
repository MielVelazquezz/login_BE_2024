const path = require('path');
const VendaDAO = require('../../DAO/vendasDAO'); 
const CupomDAO = require('../../DAO/cupomDAO')
const SkinDAO = require('../../DAO/skinDAO')

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

    app.get("/venda",verificarAutenticacao, async (req, res) => {
        res.setHeader("Access-Control-Allow-Origin", "*");

        const cupom = new CupomDAO()
        
        let lista_cupoms = await cupom.consultarCupons()
        console.log(lista_cupoms)

        const skin = new SkinDAO()
        
        let lista_skins = await skin.consultarSkins()
        console.log(lista_skins)

        res.render('venda/addvenda', { cupoms: lista_cupoms, skins: lista_skins})
    });

    app.get("/venda/lista",verificarAutenticacao, async (req, res) => {
        res.setHeader("Access-Control-Allow-Origin", "*");

        const vendaDAO = new VendaDAO();
        const lista_vendas = await vendaDAO.consultarVendas();

        res.render("venda/listvenda", { vendas: lista_vendas });
    });

    app.get("/vendas",verificarAutenticacao, async (req, res) => {
        const vendaDAO = new VendaDAO();
        res.setHeader("Access-Control-Allow-Origin", "*");

        res.status(201).json(await vendaDAO.consultarVendas());
    });

    app.post("/registrarvenda", (req, res) => {
        const vendaDAO = new VendaDAO();
        res.setHeader("Access-Control-Allow-Origin", "*");
        const { horavenda, diavenda, inserircupom, selecioneskin} = req.body;

        vendaDAO.registrarVenda(horavenda, diavenda, inserircupom, selecioneskin);

        res.status(201).json({ 
            msg: "ok"
        });
    });

    app.get("/venda/alterar/:id", async (req, res) => {
        const vendaDAO = new VendaDAO()
        const cupom = new CupomDAO()

        const skin = new SkinDAO()
        
        let lista_skins = await skin.consultarSkins()
        console.log(lista_skins)

        
        const lista_cupoms = await cupom.consultarCupons()

        const dtvenda = await vendaDAO.consultarVendaId(req.params.id)

        res.render("venda/upvenda", { cupoms: lista_cupoms, venda: dtvenda, skins: lista_skins})
    })

    app.put("/venda/alterar", async (req, res) => {
        const vendaDAO = new VendaDAO();
        res.setHeader("Access-Control-Allow-Origin","*")

        //Destructuring
        const {id, hora, dia, cupons, skins} = req.body

        const r = await vendaDAO.atualizarVenda(id, hora, dia, cupons, skins)

        res.json({r})

    })

    app.delete("/venda/apagar/:id", async (req, res) => {
        const vendaDAO = new VendaDAO();
        res.setHeader("Access-Control-Allow-Origin", "*");
    
        res.json(await vendaDAO.apagarVenda(req.params.id));
    });
};
