const Desconto= require('../mvc/models/descontoModels')
const Database = require('../repository/database')

class DescontoDAO{
    #conexao

    constructor(){
        this.#conexao = new Database()
    }
    async consultarDesconto(){
        let list_desconto = []

        const descontos = await this.#conexao.selecionarDescontos()

        if (descontos) {
            for (const dessconto of descontos) {

            const desconto = new Desconto()

            desconto.id = dessconto.id_desconto
            desconto.valor = dessconto.valor_desconto
            

            list_desconto.push(desconto.toJson())     
        }
    }
        return list_desconto
    }
    async consultarDescontoId(id) {

        const desconto = await this.#conexao.selecionarDescontosId(id)
              
        const objDesconto = new Desconto()

        objDesconto.id=desconto[0].id_desconto
        objDesconto.valor = desconto[0].valor_desconto
       
      

        return objDesconto.toJson()
    }
    registrarDesconto(valor){

        const desconto = new Desconto()
    
        desconto.valor = valor
        
    
    
        this.#conexao.insertDesconto(desconto.valor)
        
    }
    async atualizarDesconto(id,valor){
    
        const desconto = new Desconto()
    
        desconto.id = id
        desconto.valor = valor
        
    
        const dt = await this.#conexao.updateDesconto(desconto.id,desconto.valor)
        return dt
    }
    
    async apagarDesconto(id){
     const dados =  await this.#conexao.deleteDesconto(id)
     return dados
    }


}
module.exports=DescontoDAO