/************************************************************
 * Objetivo: API de busca de alunos e cursos
 * Data: 08/09/2022
 * Autor: Rafael Oliveira
 * Versão: 1.0
************************************************************/

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const { getCurso } = require('./modules/cursos')
const { getAlunosByCurso, getAlunosByMatricula } = require('./modules/alunos')

const app = express()

app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    app.use(cors())

    next()
})

// EndPoint 1 - Obter todos os cursos disponíveis
app.get('/cursos', cors(), async function(request, response, next) {
    let cursos = getCurso()

    if(cursos) {
        response.status(200)
        response.json(cursos)
    }
    else {
        response.status(404)
        response.json('{message : "Nenhum item encontrado"}')
    }
})

// EndPoint 2 - Obter todos os alunos de um determinado Curso
app.get('/alunos/:sigla', cors(), async function(request, response, next) {
    let curso = request.params.sigla
    let alunos = getAlunosByCurso(curso)

    if(alunos) {
        response.status(200)
        response.json(alunos)
    }
    else {
        response.status(404)
        response.json('{message : "Nenhum item encontrado"}')
    }
})

// EndPoint 3 - Obter os status de determinado aluno
app.get('/aluno/', cors(), async function( request, response, next) {
    let matricula = request.query.matricula
    let aluno = getAlunosByMatricula(matricula)

    if(aluno) {
        response.status(200)
        response.json(aluno)
    }
    else {
        response.status(404)
        response.json('{message : "Nenhum item encontrado"}')
    }
})

app.listen(8080, function() {
    console.log('Servidor aguardando requisições')
})