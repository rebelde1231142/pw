// perfilUsuario.js - funcionalidades exclusivas para a página de perfil de usuário
let usuario = null;

function carregarPerfil() {
    const usuarioLogado = localStorage.getItem('usuarioLogado');
    if (!usuarioLogado) {
        window.location.href = "/page/usuario/login.html";
        return;
    }
    usuario = JSON.parse(usuarioLogado);
    $('#perfilNome').text(usuario.nome);
    $('#perfilEmail').text(usuario.email);
    $('#perfilTelefone').text(usuario.telefone || '');
    $('#editarNome').val(usuario.nome);
    $('#editarEmail').val(usuario.email).prop('disabled', true); // trava o campo
    $('#editarTelefone').val(usuario.telefone || '');
    $('#editarSenha').val('');
    // Atualiza avatar
    $('#perfilAvatar').attr('src', usuario.fotoPerfil || 'https://cdn-icons-png.flaticon.com/512/747/747376.png');
    $('#previewFotoPerfil').attr('src', usuario.fotoPerfil || 'https://cdn-icons-png.flaticon.com/512/747/747376.png');
}

$(document).ready(function() {
    carregarPerfil();

    $('#btnEditarPerfil').on('click', function() {
        $('#perfilInfo').addClass('d-none');
        $('#formEditarPerfil').removeClass('d-none');
    });

    $('#btnCancelarEdicao').on('click', function() {
        $('#formEditarPerfil').addClass('d-none');
        $('#perfilInfo').removeClass('d-none');
        carregarPerfil();
    });

    // Pré-visualização da foto de perfil
    $('#editarFotoPerfil').on('change', function (e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (ev) {
                $('#previewFotoPerfil').attr('src', ev.target.result);
            };
            reader.readAsDataURL(file);
        }
    });

    $('#formEditarPerfil').on('submit', function(e) {
        e.preventDefault();
        const novoNome = $('#editarNome').val();
        const novoTelefone = $('#editarTelefone').val();
        const novaSenha = $('#editarSenha').val();
        const file = $('#editarFotoPerfil')[0].files[0];

        // Função para upload da foto (caso selecionada)
        function uploadFotoPerfil() {
            if (!file) return Promise.resolve(usuario.fotoPerfil || "");
            const formData = new FormData();
            formData.append('file', file);
            return fetch('http://localhost:3037/upload', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(result => result.url || usuario.fotoPerfil || "");
        }

        uploadFotoPerfil().then(fotoPerfilUrl => {
            const dadosAtualizados = {
                nome: novoNome,
                email: usuario.email,
                telefone: novoTelefone,
                senha: novaSenha ? novaSenha : usuario.senha,
                fotoPerfil: fotoPerfilUrl,
                tipo: usuario.tipo // <-- Adicione esta linha!
            };

            fetch('http://localhost:3000/usuarios/' + usuario.id, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dadosAtualizados)
            })
            .then(response => {
                if (response.ok) {
                    usuario = { ...usuario, ...dadosAtualizados };
                    localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
                    $('#alertaPerfil')
                        .removeClass('d-none alert-danger')
                        .addClass('alert-success')
                        .text('Perfil atualizado com sucesso!');
                    $('#formEditarPerfil').addClass('d-none');
                    $('#perfilInfo').removeClass('d-none');
                    carregarPerfil();
                } else {
                    throw new Error('Erro ao atualizar perfil.');
                }
            })
            .catch(error => {
                $('#alertaPerfil')
                    .removeClass('d-none alert-success')
                    .addClass('alert-danger')
                    .text(error.message);
            });
        });
    });
});

// Atualização automática do menu em outras abas
window.addEventListener('storage', function(event) {
    if (event.key === 'usuarioLogado') {
        location.reload();
    }
});
