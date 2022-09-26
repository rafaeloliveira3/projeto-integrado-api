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
const { getAlunosByMatricula, filtroAno } = require('./modules/alunos')

const app = express()
const router = express.Router()

app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    app.use(cors())

    next()
})

// EndPoint 1 - Obter todos os cursos disponíveis
router.get('/cursos', function(request, response, next) {
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
router.get('/alunos/:sigla/', function(request, response, next) {
    let curso = request.params.sigla
    let status = request.query.status
    let ano = request.query.ano

    let alunos = filtroAno(curso, status, ano)

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
router.get('/aluno/:matricula', function( request, response, next) {
    let matricula = request.params.matricula
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

app.use('/.netlify/functions/api', router)

module.exports = app