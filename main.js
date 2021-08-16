'use strict';

const openModal = () => document.getElementById('modal').classList.add('active');
const closeModal = () => {  
    document.getElementById('modal').classList.remove('active');
    limparCampos();
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

const salvarClient = () => {
    if(isValidFillds()) {
        const client = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            celular: document.getElementById('celular').value,
            cidade: document.getElementById('cidade').value,
        }
        criarClient(client);
        alert('Cliente ' + client.nome + ' Salvo com sucesso!');
        closeModal();
        updateTabela();
    }
}

const limparTabela = () => {
    const rows = document.querySelectorAll('#tabelaClient>tbody tr');
    rows.forEach(row => row.parentNode.removeChild(row));
}

const updateTabela = () => {
    const dbClient = lerClient();
    limparTabela();
    dbClient.forEach(criarLinha);

}
const criarLinha = (client, index) => {
    const newLinha = document.createElement('tr');
        newLinha.innerHTML = `
        <td>${client.nome}</td>
        <td>${client.email}</td>
        <td>${client.celular}</td>
        <td>${client.cidade}</td>
        <td>
            <button type="button" class="button green" id="editar-${index}">Editar</button>
            <button type="button" class="button red" id="deletar-${index}">Excluir</button>
        </td>
    `
    document.querySelector('#tabelaClient>tbody').appendChild(newLinha);
}

const isValidFillds = () =>{
    return document.getElementById('form').reportValidity();
}

const limparCampos = () => {
    const campos = document.querySelectorAll('.modal-field');
    campos.forEach(field => field.value = "");
    document.getElementById('nome').dataset.index = "new";
}

const preencherCampos = (client) => {
    document.getElementById('nome').value = client.nome;
    document.getElementById('email').value = client.email;
    document.getElementById('celular').value = client.celular;
    document.getElementById('cidade').value = client.cidade;
}

const editarCliente = (index) => {
    const client = lerClient()[index];
    client.index = index;
    preencherCampos(client);
    openModal();
}

const editarDeletar = (evento) => {
    if(evento.target.type == 'button') {

        const [ action, index ] = evento.target.id.split('-');
        if(action == 'editar'){
            editarCliente(index);
        }else{
            const client = lerClient()[index];
            const resposta = confirm(`Deseja realmente excluir o cliente ${client.nome}?`);
            if(resposta){
                deletarClient(index);
                updateTabela();
            }
        }
    }
}

updateTabela();

document.getElementById('cadastrarCliente').addEventListener('click', openModal);
document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('salvar').addEventListener('click',salvarClient);
document.getElementById('cancelar').addEventListener('click',limparCampos);
document.querySelector('#tabelaClient>tbody').addEventListener('click',editarDeletar);