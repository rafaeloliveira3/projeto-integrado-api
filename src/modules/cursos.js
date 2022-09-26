/************************************************************
 * Objetivo: Modulo de busca e retorno de cursos disponíveis
 * Data: 15/09/2022
 * Autor: Rafael Oliveira
 * Versão: 1.0
************************************************************/

var cursos = [
    {
        "nome"  :   "001 - Técnico em Desenvolvimento de Sistemas",
        "sigla" :   "DS",
        "icone" :   "https://image.shutterstock.com/image-vector/api-interface-vector-icon-600w-659203513.jpg",
        "carga" :   "1200",
    },
    {
        "nome"  :   "002 - Técnico em Redes de Computadores",
        "sigla" :   "RDS",
        "icone" :   "https://img.icons8.com/ultraviolet/344/thin-client.png",
        "carga" :   "1200"
    }
];
const getCurso = function () {
    let dadosCurso = []
    let dadosCursoJson = {}
    let error = true

    cursos.forEach(item => {
        dadosCurso.push({nome : item.nome, sigla : item.sigla, icone : item.icone})
        error = false
    })

    dadosCursoJson.cursos = dadosCurso
    
    if(error)
        return false
    else
        return dadosCursoJson
}

module.exports = {
    getCurso
}