const Skin = require('../mvc/models/skinsModel')
const Database = require('../repository/database')

class SkinDAO{

    #conexao

    constructor(){
        this.#conexao = new Database()
    }
   
    async consultarSkins() {

        const lista_skins = []
        const skins = await this.#conexao.selecionarSkins()

        if (skins) {
            for (const skin of skins) {
                const objSkin = new Skin()
                objSkin.id=skin.id_skin
                objSkin.valor=skin.valor_skin
                objSkin.nome = skin.nome_skin
                objSkin.categoria=skin.categoria_skin
                objSkin.descricao=skin.descr_skin
                objSkin.foto1=skin.foto1_skin
                objSkin.raridade=skin.raridade_skin
                objSkin.genero=skin.genero_skin
                objSkin.foto2=skin.foto2_skin
                objSkin.promocoes=skin.promocoes_id_promocao
                lista_skins.push(objSkin.toJson())
            }
        }

        return lista_skins
    }

    async consultarSkinsId(id) {

        const skin = await this.#conexao.selecionarSkinsId(id)
              
        const objSkin = new Skin()

        objSkin.id=skin[0].id_skin
        objSkin.nome = skin[0].nome_skin
        objSkin.valor=skin[0].valor_skin
        objSkin.categoria=skin[0].categoria_skin
        objSkin.descricao=skin[0].descr_skin
        objSkin.foto1=skin[0].foto1_skin
        objSkin.raridade=skin[0].raridade_skin
        objSkin.genero=skin[0].genero_skin
        objSkin.foto2=skin[0].foto2_skin
        objSkin.promocoes=skin.promocoes_id_promocao
      

        return objSkin.toJson()
    }

    

registrarSkin(categoria, nome, descricao, genero, valor, raridade, foto1,foto2,promocoes){

    const skin = new Skin()

    skin.nomeSkin = nome
    skin.categoriaSkin = categoria
    skin.descricaoSkin = descricao
    skin.generoSkin= genero
    skin.valorSkin = valor
    skin.raridade = raridade
    skin.foto1=foto1
    skin.foto2=foto2
    skin.promocoes=promocoes


    this.#conexao.insertSkin(skin.categoriaSkin,skin.nomeSkin,  skin.descricaoSkin ,  skin.generoSkin,skin.raridade,skin.valorSkin,skin.foto1,skin.foto2,skin.promocoes)
}
async atualizarSkin(id,categoria, nome, descricao, genero, valor, raridade, foto1,foto2,promocoes){

    const skin = new Skin()

    skin.id = id
    skin.nomeSkin = nome
    skin.categoriaSkin = categoria
    skin.descricaoSkin = descricao
    skin.generoSkin= genero
    skin.valorSkin = valor
    skin.raridade = raridade
    skin.foto1=foto1
    skin.foto2=foto2
    skin.promocoes=promocoes

    const dt = await this.#conexao.updateSkin(skin.categoriaSkin,skin.nomeSkin,  skin.descricaoSkin ,  skin.generoSkin,skin.valorSkin,skin.raridade,skin.foto1,skin.foto2,skin.id)
    return dt
}

async apagarSkin(id){
 const dados =  await this.#conexao.deleteSkin(id)
 return dados
}

}

module.exports = SkinDAO