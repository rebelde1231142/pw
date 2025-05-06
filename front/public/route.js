const rotas = [
    {
        'path': '',
        'component': '/page/home.html'
    },
    {
        'path': '/',
        'component': '/page/home.html'
    },
    {
        'path': '/teste',
        'component': '/page/teste.html'
    },
    {
        'path': '/teste/teste',
        'component': '/page/teste.html'
    },
    {
        'path': '/veiculo/cadastro',
        'component': '/page/veiculo/cadastro.html'
    },
    {
        'path': '/usuario/login',
        'component': '/page/login.html'
    },
    {
        'path': '/CadastroUsuario',
        'component': '/page/cadastrousuario.html'
    }
];

const rotear = (rotaUrl) => {
    const rotaEncontrada = rotas.find(rota => rota.path.toLowerCase() === rotaUrl.toLowerCase());
    return rotaEncontrada || {
        path: '/error',
        component: '/page/erro.html'
    };
}

export const loadPage = async (callBackPageReturned) => {
    try {
        let rota = rotear(window.location.pathname);
        const response = await fetch(rota.component);

        if (!response.ok) {
            throw new Error(`Erro ao carregar a página: ${response.statusText}`);
        }

        const page = await response.text();
        callBackPageReturned(page);

        // Ocultar o rodapé e o menu na página de login
        const currentPath = window.location.pathname;
        const footer = document.getElementById('container-footer');
        const menu = document.getElementById('menu');
        if (currentPath === '/login' || currentPath === '/usuario/login') {
            if (footer) footer.style.display = 'none';
            if (menu) menu.style.display = 'none';
        } else {
            if (footer) footer.style.display = 'block';
            if (menu) menu.style.display = 'block';
        }
    } catch (error) {
        console.error('Erro ao carregar página:', error);
    }
};


