'use strict';

const openModal = () => document.getElementById('modal').classList.add('active');
const closeModal = () => document.getElementById('modal').classList.remove('active');

const tempClient = {
    nome: 'Gab',
    email: 'gab@gmail.com',
    celular: '48 98427-6739',
    cidade: "São josé"
}

const getLocalStorage = () => JSON.parse(localStorage.getItem('db_local')) ?? []
const setLocalStorage = (dbClient) => localStorage.setItem("db_local", JSON.stringify(dbClient));

const criarClient = (client) => {
    const bdCliente = getLocalStorage();
    bdCliente.push(client);
    setLocalStorage(bdCliente);
}

const deletarClient = (index) => {
    const dbClient = lerClient();
    dbClient.splice(index, 1)
    setLocalStorage(dbClient)
}

const lerClient = () => getLocalStorage();

const updadeClient = (index, client) => {
    const dbClient = lerClient();
    dbClient[index] = client;
    setLocalStorage(dbClient);
}

const salvarClient = (client) => {
    if(isValidFillds()){
        console.log('cadastrando cliente');
    }
}

const isValidFillds = () =>{
    return document.getElementById('form').reportValidity();
}

const limparCampos = () => {
    const campos = document.querySelectorAll('.modal-fild');
    campos.forEach(field => field.value = "");
    document.getElementById('nome').dataset.index = "new";
}

document.getElementById('cadastrarCliente').addEventListener('click', openModal);
document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('salvar').addEventListener('click',salvarClient);
document.getElementById('cancelar').addEventListener('click',limparCampos);