// Script para atualizar informações do admin no menu

// Exibe o nome do admin logado no menu e a estrela
const usuarioLogado = localStorage.getItem('usuarioLogado');
if (usuarioLogado) {
    const usuario = JSON.parse(usuarioLogado);
    if (usuario.nome && document.getElementById('nomeAdminMenu')) {
        document.getElementById('nomeAdminMenu').textContent = usuario.nome;
    }
    // Garante que a estrela só aparece para admin
    if (usuario.tipo !== 'admin' && document.getElementById('estrelaAdmin')) {
        document.getElementById('estrelaAdmin').style.display = 'none';
    }
}

// Atualiza a foto do perfil do admin
function atualizarIconePerfilAdmin() {
    const usuarioLogado = localStorage.getItem('usuarioLogado');
    const icone = document.getElementById('iconePerfilAdmin');
    if (icone && usuarioLogado) {
        const usuario = JSON.parse(usuarioLogado);
        icone.src = usuario.fotoPerfil || 'https://cdn-icons-png.flaticon.com/512/747/747376.png';
    }
}
atualizarIconePerfilAdmin();
