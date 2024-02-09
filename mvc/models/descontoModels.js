class Desconto{
    #id

    get id() {
        return this.#id
    }
    set id(value) {
        this.#id = value
    }

    valor
    get valor() {
        return this.valor
    }
    set valor(value) {
        this.valor = value
    }
    constructor(valor){
        this.valor=valor
    }

    toJson(){

        return{
            "id":this.#id,
            "valor":this.valor
        }
       
        
    }
}
module.exports=Desconto