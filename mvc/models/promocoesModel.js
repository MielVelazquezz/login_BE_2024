class Promo{

    #id

    get id() {
        return this.#id
    }
    set id(value) {
        this.#id = value
    }

   #nome
    get nome() {
        return this.#nome
    }
    set nome(value) {
        this.#nome = value
    }
   #start
    get start() {
        return this.#start
    }
    set start(value) {
        this.#start = value
    }
   #end
    get end() {
        return this.#end
    }
    set end(value) {
        this.#end = value
    }
   #desc    
    get desc() {
        return this.#desc
    }
    set desc(value) {
        this.#desc = value
    }
    #desconto    
    get desconto() {
        return this.#desconto
    }
    set desconto(value) {
        this.#desconto = value
    }
    #ativa    
    get ativa() {
        return this.#ativa
    }
    set ativa(value) {
        this.#ativa = value
    }
    #valorDesconto    
    get valorDesconto() {
        return this.#valorDesconto
    }
    set valorDesconto(value) {
        this.#valorDesconto = value
    }

    constructor(id, nome, start, end, desc, ativa, desconto, valorDesconto){
        this.#id = id
        this.#nome = nome
        this.#start = start
        this.#end = end
        this.#desc = desc 
        this.#ativa = ativa 
        this.#desconto = desconto
        this.#valorDesconto = valorDesconto
      
    }

     
    toJson(){
        return {
            "id": this.#id,
            "nome_promo": this.#nome,
            "dt_start": this.#start,
            "dt_end": this.#end,
            "descr_promo": this.#desc,
            "ativa": this.#ativa,
            "desconto": this.#desconto,
            "valorDesconto": this.#valorDesconto
           
        }
    }
}


module.exports = Promo