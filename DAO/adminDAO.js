const AdminM = require("../mvc/models/adminModel");
const Database = require("../repository/database");
 
class AdminDAO {
 
    #conexao
 
    constructor() {
        this.#conexao = new Database();
    }
 
    async consultarAdmin() {
 
        const lista_Admin = []
        const Admins = await this.#conexao.selectGamers()
 
        if (Admins) {
            for (const Admin of Admins) {
                const objAdmin = new AdminM
 
                objAdmin.id= Admin.id_gamers
                objAdmin.email=Admin.email_gamer
                objAdmin.senha=Admin.senha_gamer
 
 
                lista_Admin.push(objAdmin.toJson())
            }
        }
 
        return lista_Admin
    }
 
   
    async consultarAdminId(id) {
 
        const Admin = await this.#conexao.selecionarAdminId(id)
             
        const objAdmin = new Admin()
 
        objAdmin.id = Admin[0].id_Admin
        objAdmin.senhaAdmin = Admin[0].senha_Admin
        objAdmin.nomeAdmin = Admin[0].nome_Admin
        objAdmin.emailAdmin = Admin[0].email_Admin
        objAdmin.personagensAdmin = Admin[0].personagens_Admin
        objAdmin.dtNascAdmin = Admin[0].dtNasc_Admin
        objAdmin.coinsAdmin = Admin[0].coins_Admin
     
 
        return objAdmin.toJson()
    }
 
    async atualizarAdmin(id, nome, senha, email, personagens, dtNasc, coins){
 
        const Admin = new Admin()
 
        Admin.id = id
        Admin.nomeAdmin = nome
        Admin.senhaAdmin = senha
        Admin.emailAdmin = email
        Admin.personagensAdmin = personagens
        Admin.dtNascAdmin = dtNasc
        Admin.coinsAdmin = coins
 
        const dt = await this.#conexao.updateAdmin(Admin.nomeAdmin, Admin.senhaAdmin, Admin.emailAdmin, Admin.personagensAdmin, Admin.id, Admin.dtNasc, Admin.coins)
        return dt
    }
 
 
    async apagarAdmin(id){
     const dados =  await this.#conexao.deleteAdmin(id)
     return dados
    }
}
 
module.exports = AdminDAO