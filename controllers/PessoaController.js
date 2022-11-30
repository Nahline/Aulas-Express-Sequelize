const Pessoa = require('../models/Pessoa');
const redis = require('../database/redis');

const salvarPessoa = async (req, res) => {
    try {
        const pessoa = Pessoa.build(req.body);
        await pessoa.save();
        res.status(201).send('Usuário criado');
    } catch {
        res.status(400).send('Falha ao salvar');
    }
}

const listarPessoas = async (req, res) => {
    const pessoas = await Pessoa.findAll();
    res.status(200).send(pessoas);
}

const buscarPessoa = async (req, res) => {
    /// const pessoa = await Pessoa.findByPk(req.params.id);
    const pessoa = await redis.buscar(req.params.id) || await Pessoa.findByPk(req.params.id)
    if (pessoa instanceof Pessoa) {
        const p = {
            id: pessoa.id, nome: pessoa.nome, email: pessoa.email, createdAt: pessoa.createdAt, updatedAt: pessoa.updatedAt
        }
        await redis.salvar(p)
    }
    console.log(pessoa)
    if (pessoa === null) {
        res.status(404).send('Usuário não encontrado');
    } else {
        res.status(200).send(pessoa);
    }
}

const deletarPessoa = async (req, res) => {
    const pessoa = await Pessoa.findByPk(req.params.id);
    if (pessoa === null) {
        res.status(404).send('Usuário não encontrado');
    } else {
        await pessoa.destroy();
        res.status(200).send('Removido com sucesso');
    }
}

const atualizarPessoa = async (req, res) => {
    const pessoa = await Pessoa.findByPk(req.params.id);
    if (pessoa === null) {
        res.status(404).send('Usuário não encontrado');
    } else {
        pessoa.set(req.body);
        await pessoa.save();
        res.status(200).send('Atualizado com sucesso');
    }
}

module.exports = { salvarPessoa, listarPessoas, buscarPessoa, deletarPessoa, atualizarPessoa };