const Venda = require("../mvc/models/vendasModel");
const Database = require("../repository/database");

class VendaDAO {
    #conexao;

    constructor() {
        this.#conexao = new Database();
    }

    async consultarVendas() {
        const listaVendas = [];
        const vendas = await this.#conexao.selecionarVendas();

        if (vendas) {
            for (const venda of vendas) {
                const objVenda = new Venda();

                objVenda.id = venda.id_venda;
                objVenda.hora = venda.hora_venda;
                objVenda.dia = venda.dia_venda;
                objVenda.cupons = venda.cupons_id_cupon;
                objVenda.skins = venda.skins_id_skin ;

                listaVendas.push(objVenda.toJson());
            }
        }

        return listaVendas;
    }

    async consultarVendaId(id) {
        const venda = await this.#conexao.selecionarVendasId(id);

        const objVenda = new Venda();

        objVenda.id = venda[0].id_venda;
        objVenda.hora = venda[0].hora_venda;
        objVenda.dia = venda[0].dia_venda;
        objVenda.cupons = venda[0].cupons_id_cupon;
        objVenda.skins = venda[0].skins_id_skins;
        

        return objVenda.toJson();
    }
    async registrarVenda(hora, dia, cupons, skins) {
        const venda = new Venda();
        venda.hora = hora;
        venda.dia = dia;
        venda.cupons = cupons;
        venda.skins = skins;
        await this.#conexao.insertVenda(venda.hora, venda.dia, venda.cupons, venda.skins);
    }

    async atualizarVenda(id, dia, hora, cupons, skins) {
        const venda = new Venda();
        venda.id = id;
        venda.hora = hora;
        venda.dia = dia;
        venda.cupons = cupons;
        venda.skins = skins;
        const resultado = await this.#conexao.updateVenda(venda.hora, venda.dia, venda.cupons, venda.skins, venda.id);
        return resultado;
    }


    async apagarVenda(id) {
        const resultado = await this.#conexao.deleteVenda(id);
        return resultado;
    }
}

module.exports = VendaDAO;