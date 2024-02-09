class Admin{
    #id
    #email
    #senha
    constructor(email,senha ){
       
        this.#email  = email 
        this.#senha  = senha 
    }
    get id() {
        return this.#id
    }
    set id(value) {
        this.#id = value
    }
    get email() {
        return this.#email
    }
    set email(value) {
        this.#email = value
    }
    get senha() {
        return this.#senha
    }
    set senha(value) {
        this.#senha = value
    }

    toJson(){
        return {
            "id": this.#id,
            "email":this.#email,
            "senha":this.#senha
            
        }
    }
}
module.exports=Admin