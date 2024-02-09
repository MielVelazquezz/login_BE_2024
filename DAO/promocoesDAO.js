const Promo = require("../mvc/models/promocoesModel");
const Database = require("../repository/database");
const DescontoDAO = require("../DAO/descontoDAO");  // Adicione este import

class PromoDAO {
    #conexao

    constructor() {
        this.#conexao = new Database();
    }

    async consultarPromos() {
        const lista_promos = [];
        const promocao = await this.#conexao.selecionarPromos();

        if (promocao) {
            for (const promos of promocao) {
                const objpromo = new Promo();

                objpromo.id = promos.id_promocao;
                objpromo.nome = promos.nome_promocao;
                objpromo.start = promos.dt_start_promocao;
                objpromo.end = promos.dt_end_promocao;
                objpromo.desc = promos.descr_promocao;
                objpromo.ativa = promos.ativa_promocao;
                objpromo.desconto=promos.descontos_id_desconto;
                objpromo.valorDesconto = promos.valor_desconto
                lista_promos.push(objpromo.toJson());
            }
        }

        return lista_promos;
    }

    async registrarPromo(nome, start, end, desc, ativa, desconto ) {

        const promocao = new Promo

        promocao.nome = nome
        promocao.start = start
        promocao.end = end
        promocao.desc= desc
        promocao.ativa = ativa
        promocao.desconto = desconto

        await this.#conexao.insertPromo(promocao.nome, promocao.start, promocao.end, promocao.desc, promocao.ativa,promocao.desconto);
    }

    async apagarPromo(id) {
        const dados = await this.#conexao.deletePromo(id);
        return dados;
    }

    async atualizarPromocao(id, nome, start, end, desc, ativa,desconto  ) {
       
        const promo = new Promo

        promo.id=id
        promo.nome = nome
        promo.start = start 
        promo.end = end
        promo.desc= desc
        promo.ativa = ativa
        promo.desconto = desconto
    
        
        const r = await this.#conexao.updatePromocao(
            
            promo.id, 
            promo.nome, 
            promo.start, 
            promo.end, 
            promo.desc, 
            promo.ativa, 
            promo.desconto
            
            )
            return r
        }

    async consultarPromocaoId(id) {
        const promos = await this.#conexao.selecionarPromocaoId(id);

        const objpromo = new Promo();
        objpromo.id = promos[0].id_promocao;
        objpromo.nome = promos[0].nome_promocao;
        objpromo.start = promos[0].dt_start_promocao;
        objpromo.end = promos[0].dt_end_promocao;
        objpromo.desc = promos[0].descr_promocao;
        objpromo.ativa = promos[0].ativa_promocao;
        objpromo.desconto = promos[0].descontos_id_desconto;
        objpromo.valorDesconto = promos[0].valor_desconto
        return objpromo.toJson();
    }
}

module.exports = PromoDAO;
