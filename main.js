'use strict';

const openModal = () => document.getElementById('modal').classList.add('active');
const closeModal = () => document.getElementById('modal').classList.remove('active');

const tempClient = {
    nome: 'maryucha',
    email: 'mary@gmail.com',
    celular: '48 98427-6739',
    cidade: "São josé"
}

const criarCliente = (cliente) => {
    localStorage.setItem('teste', 'teste crud');
}
 

document.getElementById('cadastrarCliente').addEventListener('click', openModal);
document.getElementById('modalClose').addEventListener('click', closeModal);