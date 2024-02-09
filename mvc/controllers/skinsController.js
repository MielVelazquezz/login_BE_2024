const SkinDAO = require("../../DAO/skinDAO.js")
const PromocaoDAO = require("../../DAO/promocoesDAO.js")
const path = require("path")
const Skin = require("../models/skinsModel.js")
const multer = require('multer');
const crypto = require('crypto');
const fs = require('fs').promises


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', 'views', 'public', 'images', 'upload'));
    },
    filename: function (req, file, cb) {
        const extensao = path.extname(file.originalname);

        const nomeArquivo = crypto.createHash('md5').update(file.originalname + Date.now().toString()).digest('hex') + extensao
        cb(null, nomeArquivo)

    }
});
    const upload = multer({ storage: storage });
    const skinDAO = new SkinDAO()
    
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

    app.get("/getSkins", async (req, res) => {
   
            
        res.setHeader("Access-Control-Allow-Origin","*")
        res.sendFile(path.resolve("mvc/views/"))
    })
    app.get("/skins",verificarAutenticacao, async (req, res) => {
        res.setHeader("Access-Control-Allow-Origin","*")
      
 
        //Você tem que fazer isso para os outros conseguirem acessar sua aplicação.
        //Repita essa configuração para as rotas que você quer liberar para ser acessada
        //por outras pessoas.
        const promocaoDAO = new PromocaoDAO()
        const lista_promocoes = await promocaoDAO.consultarPromos()
        res.render("skin/addskin", { promocoes: lista_promocoes })
        //Retorna os dados
      
     })
     app.post("/registrarskin", upload.fields([{ name: 'photo1', maxCount: 1 }, { name: 'photo2', maxCount: 1 }]), async (req, res) => {
        console.log(req);
        try {
            const extensao1 = path.extname(req.files['photo1'][0].originalname);
            const extensao2 = path.extname(req.files['photo2'][0].originalname);
    
            const nomeArquivo1 = crypto.createHash('md5').update(req.files['photo1'][0].originalname + Date.now().toString()).digest('hex') + extensao1;
            const nomeArquivo2 = crypto.createHash('md5').update(req.files['photo2'][0].originalname + Date.now().toString()).digest('hex') + extensao2;
    
            const caminhoDestino1 = path.join(__dirname, '..', 'views', 'public', 'images', 'upload', nomeArquivo1);
            const caminhoDestino2 = path.join(__dirname, '..', 'views', 'public', 'images', 'upload', nomeArquivo2);
    
            await fs.rename(req.files['photo1'][0].path, caminhoDestino1);
            await fs.rename(req.files['photo2'][0].path, caminhoDestino2);
    
            console.log('Upload bem-sucedido');
    
            const {
                txtid: id,
                selcatskin: categoria,
                txtnomeskin : nome,
                txtdescskin : descricao,
                selgenskin : genero,
                txtvalorskin : valor,
                selrarskin : raridade,
                selproskin : promocoes
            } = req.body;
    
           
            const nomeArquivo1SemPath = path.basename(caminhoDestino1);
            const nomeArquivo2SemPath = path.basename(caminhoDestino2);
    
                let status;
                if(!id){
                    status = await skinDAO.registrarSkin(categoria, nome, descricao, genero, valor, raridade, nomeArquivo1, nomeArquivo2,promocoes);
                } else{
                    status = await skinDAO.atualizarSkin(id,categoria, nome, descricao, genero, valor, raridade, nomeArquivo1,nomeArquivo2,promocoes)
                }
    
            res.json({ status });
        } catch (error) {
            console.error(error);
            res.status(500).send('Erro ao realizar o upload.');
        }
    });
     app.get("/pagina/skin",verificarAutenticacao, (req, res) => {
         res.setHeader("Access-Control-Allow-Origin","*")
         
         res.sendFile(path.resolve("mvc/views/ctrldev/skin/addskin.html"))
     })
 
     //Diferente do Get, o post é pra receber dados. Aqui você em vez de enviar
     // vai receber, lembra do formulario do Ze da Manga que eu fiz na sala?
     
 
    app.get("/getDescontos", async (req, res) => {
        const skinDAO = new SkinDAO()       
            
        res.setHeader("Access-Control-Allow-Origin","*")
        res.json(await skinDAO.consultarDesconto())
    })
    
    
    app.get("/skin",verificarAutenticacao,(req,res)=>{
        res.setHeader("Acess-control-Allow-Origin","*")
        res.sendFile(path.resolve("mvc/views/ctrldev/skin/addskin.html"))
    })
    
    app.get("/skin/lista",verificarAutenticacao, async (req, res) => {
        res.setHeader("Access-Control-Allow-Origin","*")
        const skinDAO = new SkinDAO()
        const lista_skins = await skinDAO.consultarSkins()
        res.render("skin/listskin", { skins: lista_skins })
    })
    app.get("/skin/alterar/:id", async (req, res) => {
        const skinDAO = new SkinDAO()

        const dtskin = await skinDAO.consultarSkinsId(req.params.id)

        res.render("skin/upskin", { skin: dtskin  })
    })
    app.get("/skin/bruno",verificarAutenticacao, async (req, res) => {
        const skinDAO = new SkinDAO()
        const lista_skins = await skinDAO.consultarSkins()

        res.render("../views/public/produtos/index.ejs", { skins: lista_skins  })
    })
    app.get("/skin/brunaldo/:id", async (req, res) => {
        const skinDAO = new SkinDAO()

        const dtskin = await skinDAO.consultarSkinsId(req.params.id)

        res.render("../views/public/produtos/detalhes.ejs", { skins: dtskin  })
    })
    app.delete("/skin/apagar/:id", async (req,res) =>{
        const skinDAO = new SkinDAO();
        res.setHeader("Access-Control-Allow-Origin","*")
    
        res.json(await skinDAO.apagarSkin(req.params.id))

    })

    // app.put("/skin/alterar", async (req, res) => {
    //     const skinDAO = new SkinDAO();
    //     res.setHeader("Access-Control-Allow-Origin","*")

    //     //Destructuring
    //     const {id,categoria, nome, descricao, genero, valor, raridade, foto1,foto2 } = req.body

    //     const r = await skinDAO.atualizarSkin(id, nome, descricao, genero,valor,categoria,raridade,foto1,foto2)

    //     res.json({r})

    // })
}

