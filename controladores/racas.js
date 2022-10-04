const {pool} = require('../config');

const getRacas = (request, response) => {
    pool.query('SELECT * FROM racas order by codigo',
        (error, results) => {
            if (error){
                return response.status(400).json(
                    {
                        status : 'error', 
                        message : 'Erro ao consultar o raças: ' + error
                    }
                );
            }
            response.status(200).json(results.rows);
        }       
    )
}


const addRaca = (request, response) => {
    const {nome, pesoMaximo} = request.body;
    pool.query(`INSERT INTO racas (nome, pesoMaximo) 
    values ($1, $2) returning codigo, nome, pesoMaximo`,
    [nome, pesoMaximo],
    (error, results) => {
        if (error){
            return response.status(400).json({
                status : 'error', 
                message : 'Erro ao inserir a raça: ' + error
            })
        }
        response.status(200).json({
            status : "success" , message : "Raça criada.",
            objeto: results.rows[0]
        })
    })
}

const updateRaca = (request, response) => {
    const {codigo, nome, pesoMaximo} = request.body;
    pool.query(`UPDATE racas SET nome=$1, pesoMaximo=$2
    where codigo=$3 returning codigo, nome, pesoMaximo`,
    [nome, pesoMaximo, codigo],
    (error, results) => {
        if (error){
            return response.status(400).json({
                status : 'error', 
                message : 'Erro ao alterar a raça ' + error
            })
        }
        response.status(200).json({
            status : "success" , message : "Raça alterada.",
            objeto: results.rows[0]
        })
    })
}

const deleteRaca = (request, response) => {
    const codigo = parseInt(request.params.codigo);
    pool.query(`DELETE FROM racas WHERE codigo = $1`,
    [codigo],
    (error, results) => {
        if (error || results.rowCount == 0){
            return response.status(400).json({
                status : 'error', 
                message : 'Erro ao remover a raça: ' + 
                (error ? error :'Não removeu nenhuma linha')
            })
        }
        response.status(200).json({
            status : "success" , message : "Raça removida."
        })
    })
}

const getRacaPorCodigo = (request, response) => {
    const codigo = parseInt(request.params.codigo);
    pool.query(`SELECT * FROM racas WHERE codigo = $1`,
    [codigo],
    (error, results) => {
        if (error || results.rowCount == 0){
            return response.status(400).json({
                status : 'error', 
                message : 'Erro ao recuperar o raça: ' + 
                (error ? error :'Não encontrou nenhuma linha')
            })
        }
        response.status(200).json(results.rows[0])
    })
}

module.exports = {
    getRacas, addRaca, updateRaca, deleteRaca, getRacaPorCodigo
}

