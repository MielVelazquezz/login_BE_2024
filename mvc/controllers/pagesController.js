const path = require('path')

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
app.get("/", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin","*")

    res.sendFile(path.resolve('mvc/views/public/principal.html'));
});
app.get("/sobre",verificarAutenticacao, (req, res) => {
    res.setHeader("Access-Control-Allow-Origin","*")

    res.sendFile(path.resolve('mvc/views/public/sobre.html'));
});
app.get("/politica",verificarAutenticacao, (req, res) => {
    res.setHeader("Access-Control-Allow-Origin","*")

    res.sendFile(path.resolve('mvc/views/public/politica-privacidade.html'));
});
// app.get("/index", (req, res) => {
//     res.setHeader("Access-Control-Allow-Origin","*")

//     res.sendFile(path.resolve('mvc/views/public/index.html'));
// });
app.get("/equipe",verificarAutenticacao, (req, res) => {
    res.setHeader("Access-Control-Allow-Origin","*")

    res.sendFile(path.resolve('mvc/views/public/equipe_de_desenvolvimento.html'));
});
app.get("/contato",verificarAutenticacao, (req, res) => {
    res.setHeader("Access-Control-Allow-Origin","*")

    res.sendFile(path.resolve('mvc/views/public/contato.html'));
});
app.get("/Pindex",verificarAutenticacao, (req, res) => {
    res.setHeader("Access-Control-Allow-Origin","*")

    res.sendFile(path.resolve('mvc/views/public/produtos/index.html'));

});
app.get("/detalhes",verificarAutenticacao, (req, res) => {
    res.setHeader("Access-Control-Allow-Origin","*")

    res.sendFile(path.resolve('mvc/views/public/produtos/productDetail.html'));

});
app.get("/produtos",verificarAutenticacao, (req, res) => {
    res.setHeader("Access-Control-Allow-Origin","*")

    res.sendFile(path.resolve('mvc/views/public/produtos/produtos.html'));

});
app.get("/logincadastro",verificarAutenticacao, (req, res) => {
    res.setHeader("Access-Control-Allow-Origin","*")

    res.sendFile(path.resolve('mvc/views/public/senha/logincadastro.html'));

});
app.get("/recuperarsenha",verificarAutenticacao, (req, res) => {
    res.setHeader("Access-Control-Allow-Origin","*")

    res.sendFile(path.resolve('mvc/views/public/senha/recuperarsenha.html'));

});
app.get("/redefinirsenha",verificarAutenticacao, (req, res) => {
    res.setHeader("Access-Control-Allow-Origin","*")

    res.sendFile(path.resolve('mvc/views/public/senha/redefinirsenha.html'));

});
}


