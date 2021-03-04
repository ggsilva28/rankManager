const jogadores = {}

jogadores.start = function() {
    jogadores.readFirebase()
}

jogadores.update = function(lista) {
    let ordenado = [];
    for (let i in lista) {
        ordenado.push(lista[i])
    }
    ordenado.sort(function(a, b) {
        return a.pontos < b.pontos ? 1 : -1
    });

    jogadores.lideres(ordenado)
    console.log(ordenado)

    let elLista = document.querySelector('.lista')
    elLista.innerHTML = ''
    for (let i = 3; i < ordenado.length; i++) {
        let el = jogadores.criar(ordenado[i], i)
        elLista.appendChild(el)
    }

    helper.removeLoadingAbsolute()
}

jogadores.criar = function(ordenado, i) {
    let el = helper.createElement('div', 'jogador')
    let posicao = helper.createElement('div', 'posicao', i + 1)
    let nome = helper.createElement('div', 'nome', ordenado.nome)
    let pontos = helper.createElement('div', 'pontos', ordenado.pontos)
    el.setAttribute('posicao', i + 1)
    el.appendChild(posicao)
    el.appendChild(nome)
    el.appendChild(pontos)
    return el
}

jogadores.lideres = function(lista) {
    let lideres_box = document.querySelector('.lideres')
    let lideres = lideres_box.children
    console.log(lideres)
    for (let i = 0; i < lideres.length; i++) {
        let item = lista[lideres[i].getAttribute('posicao') - 1]

        if (item) {
            lideres[i].querySelector('.nome').innerHTML = item.nome;
            lideres[i].querySelector('.pontos').innerHTML = item.pontos;
        }
    }

    lideres_box.classList.remove('hidden')
}

jogadores.readFirebase = function() {
    var dbjogadores = firebase.database().ref('jogadores').orderByChild('pontos');
    dbjogadores.on('value', (snapshot) => {
        const data = snapshot.val();
        console.log(data)
        helper.setLoadingAbsolute(document.body)
        jogadores.update(data)
    });
}

jogadores.start()