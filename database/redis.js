const { createClient } = require("redis");

const client = createClient();

async function connectar() {
    client.on('error', (err) => console.log('Redis Client Error', err));
    await client.connect();
}

async function salvar(obj) {
    ///await connectar()
    const saida = await client.set(obj.id.toString(), JSON.stringify(obj), { EX: 3600 });
    console.log(saida);
}

async function buscar(id) {
    ///  await connectar()
    const saida = await client.get(id);
    console.log(JSON.parse(saida));
    return saida
}

///export default { connectar, salvar, buscar }
module.exports = { connectar, salvar, buscar };

// buscar('paulo@gmail.com');
connectar()