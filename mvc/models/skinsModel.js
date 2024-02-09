//Representa uma skin do mundo real, concorda?
class Skin{

    #id

    get id() {
        return this.#id
    }
    set id(value) {
        this.#id = value
    }

    nome 
    get nome(){
        return this.nome;
    }

    set nome(valor){
        this.nome = valor;
    }
    descricao 
    get descricao(){
        return this.descricao;
    }

    set descricao(valor){
        this.descricao = valor;
    }
    raridade     
    get raridade(){
        return this.raridade;
    }

    set raridade(valor){
        this.raridade = valor;
    }
    valor
    get valor(){
        return this.valor;
    }

    set valor(valor){
        this.valor = valor;
    }
    categoria
    get categoria(){
        return this.categoria;
    }

    set categoria(valor){
        this.categoria = valor;
    }
    genero
    get genero(){
        return this.genero;
    }

    set genero(valor){
        this.genero = valor;
    }
    foto1
    get foto1(){
        return this.foto1;
    }

    set foto1(valor){
        this.foto1 = valor;
    }
    foto2
    get foto2(){
        return this.foto2;
    }
    set foto2(valor){
        this.foto2=valor
    }
    promocoes
    get promocoes(){
        return this.promocoes;
    }
    set promocoes(valor){
        this.promocoes=valor
    }
    //é um tipo de método padrão. Ele é invocado
    //quando o objeto é criado, ou seja, ele vai te
    //acompanhar e obrigar a passar os parametros declarados, se tiver.
    //exemplo const a = new Skin("Batata","Frita",100)
    constructor(nome, descricao, raridade, categoria, valor, genero,foto1,foto2,promocoes){
        this.nome = nome
        this.descricao = descricao
        this.raridade = raridade
        this.categoria=categoria
        this.valor=valor
        this.genero=genero
        this.foto1=foto1
        this.foto2=foto2
        this.promocoes=promocoes
    }

     //Dá uma estudada sobre encapsulamento rsrs
     //Mas basicamente com get e set você controla
     //como o usuario vai chamar os membros da classe
    

    //é uma função, mas aqui chamada de método, você
    // só não precisa usar o function
    toJson(){
        return {
            "id": this.#id,
            "nome": this.nome,
            "descricao":this.descricao,
            "raridade":this.raridade,
            "categoria":this.categoria,
            "valor":this.valor,
            "genero":this.genero,
            "foto1":this.foto1,
            "foto2":this.foto2,
            "promocoes":this.promocoes

        }
    }
}


module.exports = Skin