class Venda {

    #id
    #dia
    #hora
    #cupons
    #skins

    
    get id() {
        return this.#id;
    }

    set id(value) {
        this.#id = value;
    }

    get dia() {
        return this.#dia;
    }

    set dia(valor) {
        this.#dia = valor;
    }

    get hora() {
        return this.#hora;
    }

    set hora(valor) {
        this.#hora = valor;
    }
    get cupons() {
        return this.#cupons;
    }

    set cupons(value) {
        this.#cupons = value;
    }

    get skins() {
        return this.#skins;
    }

    set skins(value) {
        this.#skins = value;
    }


    constructor(hora, dia, cupons, skins) {

        this.#hora = hora;
        this.#dia = dia;
        this.#cupons = cupons;
        this.#skins = skins;

    }

    toJson(){
        return {
            "id": this.#id,
            "hora_venda": this.#hora,
            "dia_venda": this.#dia,
            "cupons": this.#cupons,
            "skins": this.#skins
        }
    }
}

module.exports = Venda;
