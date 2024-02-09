const AtrativoDAO = require('../../DAO/atrativoDAO');
const path = require('path');
const multer = require('multer');
const crypto = require('crypto');
const fs = require('fs').promises;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', 'views', 'public', 'images', 'upload'));
  },
  filename: function (req, file, cb) {
    const extensao = path.extname(file.originalname);

    const nomeArquivo = crypto.createHash('md5').update(file.originalname + Date.now().toString()).digest('hex') + extensao;
    cb(null, nomeArquivo);
  },
});

const atrativoDAO = new AtrativoDAO();
const upload = multer({ storage: storage });
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
  app.post('/atrativos', upload.single('imagem'), async (req, res) => {

    try {
      const extensao = path.extname(req.file.originalname);
      const nomeArquivo = crypto.createHash('md5').update(req.file.originalname + Date.now().toString()).digest('hex') + extensao;

      const caminhoDestino = path.join(__dirname, '..', 'views', 'public', 'images', 'upload', nomeArquivo);

      await fs.rename(req.file.path, caminhoDestino);

      console.log('Upload bem-sucedido');

      const {
        txtid: id,
        txtnomeatrat: nome,
        txtlatrat: latitude,
        txtlongatrat: longitude,
        txtdescatrat: descricao
      } = req.body;


      let status;

      if (!id) {
        status = await atrativoDAO.cadastrar( nome, latitude, longitude, descricao, nomeArquivo);
      } else {
        status = await atrativoDAO.atualizar(nome, latitude, longitude, descricao, nomeArquivo, id);
      
      }
      res.json({ status });
    } catch (error) {
      console.error(error);
      
      res.status(500).send('Erro ao realizar o upload. É necessário selecionar uma imagem');
    }
  });

  app.get("/atrativos",verificarAutenticacao, async (req, res) => {
    const atrativoDAO = new AtrativoDAO()

    //Resolve problemas de cors
    res.setHeader("Access-Control-Allow-Origin", "*")
    //Retorna no formato Json
    res.json(await atrativoDAO.consultarAtrativo())
  });

  app.delete("/atrativo/:id", async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    const atrativoDAO = new AtrativoDAO()

    const status = await atrativoDAO.apagar(req.params.id)

    res.json({
      status
    })
  })

  //:id é o parâmetro
  // app.put("/atrativo", upload.single('imagem'), async (req, res) => {
  //   const atrativoDAO = new AtrativoDAO();

  //   console.log('>>>>'+req.file)
  //   res.setHeader("Access-Control-Allow-Origin", "*");
  
  //   const extensao = path.extname(req.file.originalname);
  //   const nomeArquivo = crypto.createHash('md5').update(req.file.originalname + Date.now().toString()).digest('hex') + extensao;

  //   const caminhoDestino = path.join(__dirname, '..', 'views', 'public', 'images', 'upload', nomeArquivo);

  //   await fs.rename(req.file.path, caminhoDestino);
   


  //   const {
  //     nome,
  //     lat,
  //     long,
  //     descricao,
  //     id
  //   } = req.body;

    
  
    
   
  //   await fs.rename(req.file.path, caminhoImagem);

  //   const r = await atrativoDAO.atualizar(nome, lat, long, descricao, nomeArquivo, id);
  //   res.json({ r });
  // });

  app.get("/pagina/listatrativos",verificarAutenticacao, async (req, res) => {
    const atrativo = new AtrativoDAO()
    const r = await atrativo.consultarAtrativo()
    res.render('atrativo/listatrativo.ejs', { r })
  })

  app.get("/pagina/alteratrativo/:id", async (req, res) => {

    const atrativo = new AtrativoDAO()
    const r = await atrativo.consultarUm(req.params.id)
    res.render('atrativo/alteratrativo', { r })

  })
  

  app.get("/pagina/addatrativo",verificarAutenticacao, (req, res) => {
    res.sendFile(path.resolve('mvc/views/ctrldev/atrativo/addatrativo.html'))
  })

}
