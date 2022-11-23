const { Router } = require('express');

const controleRacas = require('./controladores/racas');
const controleCaes = require("./controladores/caes");

const rotas = new Router();


rotas.route('/caes')
   .get(controleCaes.getCaes)
   .post(controleCaes.addCao)
   .put(controleCaes.updateCao)

rotas.route('/caes/:codigo')
   .get(controleCaes.getCaoPorCodigo)
   .delete(controleCaes.deleteCao)


rotas.route('/racas')
     .get(controleRacas.getRacas)
     .post(controleRacas.addRaca)
     .put(controleRacas.updateRaca)

rotas.route('/racas/:codigo')
     .get(controleRacas.getRacaPorCodigo)
     .delete(controleRacas.deleteRaca)


module.exports = rotas;