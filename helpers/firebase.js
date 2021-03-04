const x1Firabase = {}
console.log('firebase.js')

x1Firabase.start = function() {
    setTimeout(function() {
        x1Firabase.read()
    }, 1000)
}

x1Firabase.add = function(user, callback) {
    console.log(user)
    firebase.database().ref('jogadores/' + user.id).set({
        nome: user.nome,
        pontos: 0,
    }).then(() => {
        callback()
    })
}

x1Firabase.read = function() {
    return new Promise(function(resolve, reject) {
        var jogadores = firebase.database().ref('jogadores').orderByChild('pontos');
        jogadores.on('value', (snapshot) => {
            const data = snapshot.val();
            console.log(data)
            console.log('resolve')
            resolve(data)
        });
    })
}