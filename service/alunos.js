import { alunos } from "../data/data.js";

export const listar = (nome) => {
    let resultado = alunos;
    if (nome) {
        resultado = alunos.filter(aluno => aluno.nome.toLowerCase().includes(nome.toLowerCase()));
    }
    return resultado;
}

export const consultarPorId = (_id) => {
    return alunos.find(aluno => aluno.id == _id);
}
