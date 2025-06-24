// Função para carregar categorias
function carregarCategorias() {
    fetch('http://localhost:3000/categorias')
        .then(response => response.json())
        .then(categorias => {
            const select = document.getElementById('categoriaId');
            if (select) {
                select.innerHTML = '<option value="">Selecione uma categoria</option>';
                categorias.forEach(cat => {
                    select.innerHTML += `<option value="${cat.id}">${cat.nome}</option>`;
                });
            }
        });
}

// Função para carregar montadoras
function carregarMontadoras() {
    fetch('http://localhost:3000/montadoras')
        .then(response => response.json())
        .then(montadoras => {
            const select = document.getElementById('montadoraId');
            if (select) {
                select.innerHTML = '<option value="">Selecione uma montadora</option>';
                montadoras.forEach(mont => {
                    select.innerHTML += `<option value="${mont.id}">${mont.nome}</option>`;
                });
            }
        });
}

// Chame essas funções ao carregar a página de cadastro de veículo
document.addEventListener('DOMContentLoaded', function() {
    carregarCategorias();
    carregarMontadoras();
});