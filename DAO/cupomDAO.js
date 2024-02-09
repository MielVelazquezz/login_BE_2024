const Cupom = require("../mvc/models/cupomModel");
const Database = require("../repository/database");

class CupomDAO {

    #conexao

    constructor() {
        this.#conexao = new Database();
    }

    async consultarCupons() {

        const lista_cupom = []
        const cupoms = await this.#conexao.selecionarCupons()

        if (cupoms) {
            for (const cupom of cupoms) {
                const objcupom = new Cupom()

                objcupom.id = cupom.id_cupom
                objcupom.codCupom = cupom.codigo_cupom
                objcupom.nomeCupom = cupom.nome_cupom
                objcupom.validadeCupom = cupom.validade_cupom
                objcupom.valorCupom = cupom.valor_cupom


                lista_cupom.push(objcupom.toJson())
            }
        }

        return lista_cupom
    }

    registrarCupom(nome, codigo, validade, valor){

        const cupom = new Cupom()

        cupom.nomeCupom = nome
        cupom.codCupom = codigo
        cupom.validadeCupom = validade
        cupom.valorCupom = valor

        this.#conexao.insertCupom(cupom.nomeCupom, cupom.codCupom, cupom.validadeCupom, cupom.valorCupom)
    }
    
    async consultarCuponId(id) {

        const cupom = await this.#conexao.selecionarCuponId(id)
              
        const objcupom = new Cupom()

        objcupom.id = cupom[0].id_cupom
        objcupom.codCupom = cupom[0].codigo_cupom
        objcupom.nomeCupom = cupom[0].nome_cupom
        objcupom.validadeCupom = cupom[0].validade_cupom
        objcupom.valorCupom = cupom[0].valor_cupom
      

        return objcupom.toJson()
    }

    async atualizarCupom(id, nome, codigo, validade, valor){

        const cupom = new Cupom()

        cupom.id = id
        cupom.nomeCupom = nome
        cupom.codCupom = codigo
        cupom.validadeCupom = validade
        cupom.valorCupom = valor

        const dt = await this.#conexao.updateCupom(cupom.codCupom, cupom.nomeCupom, cupom.validadeCupom, cupom.valorCupom, cupom.id)
        return dt
    }


    async apagarCupom(id){
     const dados =  await this.#conexao.deleteCupom(id)
     return dados
    }
}

module.exports = CupomDAO