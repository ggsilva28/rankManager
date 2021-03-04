const inscricao = {}

inscricao.add = function(btn) {
    helper.setLoading(btn)
    let user = {
        id: new Date().getTime(),
        nome: document.getElementById('nome').value,
    }

    if (user.nome) {
        x1Firabase.add(user, function() {
            helper.removeLoading()
            helper.flash('Sucesso')
            setTimeout(function() {
                window.location.href = site.url + 'pages/jogadores'
            }, 500)
        })
    } else {
        helper.flash('Valor invalido')
        helper.removeLoading()
    }
}