const { Router } = require('express');

const controleRacas = require('./controladores/racas');
const controleCaes = require("./controladores/caes");
const seguranca = require('./controladores/seguranca');

const rotas = new Router();


rotas.route('/caes')
   .get(seguranca.verificaJWT, controleCaes.getCaes)
   .post(seguranca.verificaJWT, controleCaes.addCao)
   .put(seguranca.verificaJWT, controleCaes.updateCao)

rotas.route('/caes/:codigo')
   .get(seguranca.verificaJWT, controleCaes.getCaoPorCodigo)
   .delete(seguranca.verificaJWT, controleCaes.deleteCao)


rotas.route('/racas')
     .get(seguranca.verificaJWT, controleRacas.getRacas)
     .post(seguranca.verificaJWT, controleRacas.addRaca)
     .put(seguranca.verificaJWT, controleRacas.updateRaca)

rotas.route('/racas/:codigo')
     .get(seguranca.verificaJWT, controleRacas.getRacaPorCodigo)
     .delete(seguranca.verificaJWT, controleRacas.deleteRaca)

rotas.route("/login")
     .post(seguranca.login)  

module.exports = rotas;