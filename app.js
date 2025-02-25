import express from 'express';
import * as  alunos from './data/data.js';
import { listar } from './service/alunos.js';

const app = express();
const PORT = 3030;

app.get('/',(req,res)=>{
    return res.status(200).json({
        "alunos": `http://localhost:${PORT}/alunos`,
        "disciplinas": `http://localhost:${PORT}/disciplinas`
    });   
});

app.get('/alunos',(req,res)=>{
    let nome = req.query.nome;
    return res.status(200).json(alunos.listar(nome));
});

app.get('/alunos/:id',(req,res)=>{
    let id = req.params.id;
    return res.status(200).json(alunos.consultarPorId(id));
});

app.listen(PORT,()=>{
    console.log(`Servidor rodando> http://localhost:${PORT}`);
});
