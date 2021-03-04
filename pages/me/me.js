const me = {}

me.start = function() {
    me.readFirebase()
}

me.update = function(lista) {
    let ordenado = [];
    for (let i in lista) {
        lista[i].id = i
        ordenado.push(lista[i])
    }
    ordenado.sort(function(a, b) {
        return a.pontos < b.pontos ? 1 : -1
    });

    let elLista = document.querySelector('.lista')
    elLista.innerHTML = ''
    for (let i = 0; i < ordenado.length; i++) {
        let el = me.criar(ordenado[i], i)
        elLista.appendChild(el)
    }

    helper.removeLoadingAbsolute()
}

me.criar = function(ordenado, i) {
    let el = helper.createElement('div', 'jogador')
    let posicao = helper.createElement('div', 'posicao', i + 1)
    let nome = helper.createElement('div', 'nome', ordenado.nome)
    let pontos = helper.createElement('div', 'pontos', ordenado.pontos)
    let add = helper.createElement('a', 'add', '+')
    let sub = helper.createElement('a', 'sub', '-')
    let remove = helper.createElement('a', 'remove', '<img src="../../img/remove.svg">')

    el.setAttribute('key', ordenado.id)
    el.setAttribute('pontos', ordenado.pontos)
    el.setAttribute('posicao', i + 1)
    el.appendChild(posicao)
    el.appendChild(nome)
    el.appendChild(pontos)
    el.appendChild(add)
    el.appendChild(sub)
    el.appendChild(remove)

    remove.addEventListener('click', function() {
        me.remove(this)
    })

    add.addEventListener('click', function() {
        me.add(this)
    })

    sub.addEventListener('click', function() {
        me.sub(this)
    })

    return el
}

me.readFirebase = function() {
    var dbjogadores = firebase.database().ref('jogadores').orderByChild('pontos');
    dbjogadores.on('value', (snapshot) => {
        const data = snapshot.val();
        console.log(data)
        helper.setLoadingAbsolute(document.body)
        me.update(data)
    });
}

me.remove = function(btn) {
    let parent = btn.parentElement
    let key = parent.getAttribute('key')
    firebase.database().ref('jogadores').child(key).remove()
}

me.add = function(btn) {
    let parent = btn.parentElement
    let pontos = parent.getAttribute('pontos')
    let key = parent.getAttribute('key')
    let nome = parent.querySelector('.nome').innerHTML

    let updates = {};
    updates['/jogadores/' + key] = {
        nome: nome,
        pontos: Number(pontos) + 1
    }
    firebase.database().ref().update(updates);
}

me.sub = function(btn) {
    let parent = btn.parentElement
    let pontos = parent.getAttribute('pontos')
    let key = parent.getAttribute('key')
    let nome = parent.querySelector('.nome').innerHTML

    let updates = {};
    updates['/jogadores/' + key] = {
        nome: nome,
        pontos: Number(pontos) - 1
    }
    firebase.database().ref().update(updates);
}

me.start()