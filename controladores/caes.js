const { pool } = require('../config');

const getCaes = (request, response) => {
    pool.query(`select s.codigo as codigo, s.nome as nome, 
        s.cliente as cliente, s.peso as peso, 
        s.raca as raca, p.nome as nomeraca
        from caes s
        join racas p on s.raca = p.codigo
        order by s.codigo`, 
    (error, results) => {
        if (error){
            return response.status(400).json({
                status : 'error',
                message: 'Erro ao consultar os cães: ' + error
            });
        }
        response.status(200).json(results.rows);
    })
}

const addCao = (request, response) => {
    const {nome, cliente, peso, raca} = request.body;
    pool.query(`insert into caes (nome, cliente, peso, raca) 
    values ($1, $2, $3, $4)
    returning codigo, nome, cliente, peso, raca`, 
    [nome, cliente, peso, raca] , 
    (error, results) => {
        if (error){
            return response.status(400).json({
                status : 'error',
                message: 'Erro ao inserir o cão!'
            });
        }
        response.status(200).json({
            status : 'success' , message : "Cão cadastrado!",
            objeto : results.rows[0]
        });
    })
}

const updateCao = (request, response) => {
    const {codigo, nome, cliente, peso, raca} = request.body;
    pool.query(`UPDATE caes
	SET nome=$1, cliente=$2, peso=$3, raca=$4
	WHERE codigo=$5
    returning codigo, nome, cliente, peso, raca`, 
    [nome, cliente, peso, raca, codigo] , 
    (error, results) => {
        if (error){
            return response.status(400).json({
                status : 'error',
                message: 'Erro ao atualizar o cadastro do cão!'
            });
        }
        response.status(200).json({
            status : 'success' , message : "Cão atualizado!",
            objeto : results.rows[0]
        });
    })
}


const deleteCao = (request, response) => {
    const codigo = parseInt(request.params.codigo);
    pool.query(`DELETE FROM caes WHERE codigo=$1`, 
                [codigo] , 
    (error, results) => {
        if (error || results.rowCount == 0){
            return response.status(400).json({
                status : 'error',
                message: 'Erro ao remover o cão! ' + (error ? error : '')
            });
        }
        response.status(200).json({
            status : 'success' , message : "Cão removido!"
        });
    })
}

const getCaoPorCodigo = (request, response) => {
    const codigo = parseInt(request.params.codigo);
    pool.query(`SELECT * FROM caes WHERE codigo=$1`, 
                [codigo] , 
    (error, results) => {
        if (error || results.rowCount == 0){
            return response.status(400).json({
                status : 'error',
                message: 'Erro ao recuperar o cão!'
            });
        }
        response.status(200).json(results.rows[0]);
    })
}

module.exports = {
    getCaes, addCao, updateCao, deleteCao, getCaoPorCodigo
}
