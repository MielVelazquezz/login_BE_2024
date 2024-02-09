const Atrativo = require("../mvc/models/atrativoModel");
const Database = require("../repository/database");

class AtrativoDAO {

    #conexao

    constructor() {
        this.#conexao = new Database();
    }

    async consultarAtrativo() {

        const list_atrativos = []
        const query = await this.#conexao.selectAtrativos()

        for (let index = 0; index < query.length; index++) {

            const atrativo = new Atrativo()

            atrativo.id = query[index].id_atrativo
            atrativo.nome = query[index].nome_atrativo
            atrativo.latitude = query[index].lat_atrativo
            atrativo.longitude = query[index].long_atrativo
            atrativo.descricao = query[index].desc_atrativo
            atrativo.imagem = query[index].image_atrativo

            list_atrativos.push(atrativo.toJson())
        }
        return list_atrativos
    }

    async consultarUm(id) {
        const query = await this.#conexao.selectAtrativosId(id)
        const atrativo = new Atrativo()

        
            atrativo.id = query[0].id_atrativo
            atrativo.nome = query[0].nome_atrativo
            atrativo.latitude = query[0].lat_atrativo
            atrativo.longitude = query[0].long_atrativo
            atrativo.descricao = query[0].desc_atrativo
            atrativo.imagem = query[0].image_atrativo
        return atrativo.toJson()
    }
    async cadastrar(nome, latitude, longitude, descricao, imagem) {
        const atrativo = new Atrativo(nome, latitude, longitude, descricao, imagem)

        // atrativo.nome = nome
        // atrativo.latitude = latitude
        // atrativo.longitude = longitude
        // atrativo.imagem = imagem
        // atrativo.descricao = descricao
        const sql = await this.#conexao.insertAtrativo(atrativo.toJson())
        return sql.insertId;
    }
    async apagar(id) {
        const linhasAfetadas = await this.#conexao.deleteAtrativo(id)
        return linhasAfetadas.affectedRows
    }

    
    async atualizar(nome, lat, long, descricao,  imagem, id) {
        const atrativo = new Atrativo(nome, lat, long, descricao, imagem)        
        atrativo.id = id
        
        const r = await this.#conexao.updateAtrativo(
            atrativo.nome,
            atrativo.latitude,
            atrativo.longitude,
            atrativo.descricao,
            atrativo.imagem,            
            atrativo.id
        )
        return r
    }
}

module.exports = AtrativoDAO

