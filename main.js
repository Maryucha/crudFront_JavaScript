'use strict';

const openModal = () => document.getElementById('modal').classList.add('active');
const closeModal = () => document.getElementById('modal').classList.remove('active');

const tempClient = {
    nome: 'Lipe',
    email: 'lip@gmail.com',
    celular: '48 98427-6739',
    cidade: "São josé"
}

const getLocalStorage = () => JSON.parse(localStorage.getItem('db_local')) ?? []
const setLocalStorage = (dbClient) => localStorage.setItem("db_local", JSON.stringify(dbClient));

const criarCliente = (client) => {
    const bdCliente = getLocalStorage();
    bdCliente.push(client);
    setLocalStorage(bdCliente);
}

document.getElementById('cadastrarCliente').addEventListener('click', openModal);
document.getElementById('modalClose').addEventListener('click', closeModal);