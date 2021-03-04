const helper = {}

helper.addFocusToAddon = function() {
    let element = document.getElementsByClassName("input-group")

    var i;
    var size = element.length;
    for (i = 0; i < size; i++) {
        element[i] = element[i].querySelectorAll("input");
    }

    size = element.length;
    for (i = 0; i < size; i++) {

        element[i].addEventListener('focusin', function() {
            let parent = this.parentNode
            let child = parent.children[0]

            if (child.children[0]) {
                child = child.children[0]
            } else {
                child = parent.children[1].children[1]
            }
            child.classList.add('input-group-focus')
        }, true)
        element[i].addEventListener('focusout', function() {
            let parent = this.parentNode
            let child = parent.children[0]
            if (child.children[0]) {
                child = child.children[0]
            } else {
                child = parent.children[1].children[1]
            }
            child.classList.remove('input-group-focus')
        })
    }
}



helper.submitButton = function() {
    let submitButton = document.querySelectorAll('[type="submit"]');
    let length = submitButton.length
    let parentForm = []

    for (let i = 0; i < length; i++) {
        parentForm[i] = helper.getParent(submitButton[i], 'role', 'form')

        parentForm[i].then((result) => {
            if (result != false) {
                result.addEventListener('submit', function() {
                    helper.setLoading(submitButton[i])
                    submitButton[i].setAttribute('disabled', 'disabled')
                })
            }
        })
    }
}

helper.loadLink = function() {
    let submitButton = document.querySelectorAll('[type="load"]');
    let callback = function() {
        helper.setLoading(this)
        this.setAttribute('disabled', 'disabled')
    }

    helper.multiEventListener(submitButton, 'click', callback)
}

helper.getParent = async function(element, attribute, value) {

    end = false
    parent = element.parentElement
    while (end == false) {
        if (parent.nodeName == 'BODY') {
            end = true
            result = false
        }

        if (parent.getAttribute(attribute) === value) {
            end = true
            result = parent
        } else {
            parent = parent.parentElement
        }
    }

    return result
}

helper.setLoading = function(element, load = '', style = '') {
    var currentHtml = element.innerHTML

    //Se a cor do elemento estiver entre essas mais claras ele irá colocar o load azul que é mais visível, atualmente ele verificar somente essas duas cores pois são defaults neste sistema, porem em verões futuras pode se utilizar uma versão para verificar o contraste
    let backgroundColor = window.getComputedStyle(element, null).getPropertyValue('background-color')
    let color = ['rgb(255, 255, 255)', 'rgb(246, 246, 246)', 'rgb(237, 237, 237)', 'rgb(238, 238, 238)', 'rgb(239, 239, 239)', 'rgb(240, 240, 240)']

    if (color.includes(backgroundColor)) {
        load = '_green'
    }

    console.log(backgroundColor)

    element.classList.add('loading')
    element.innerHTML = '<img style="' + style + '" src="' + site.url + 'img/loading' + load + '.gif">'

    if (element.nodeName === "BUTTON") {
        element.setAttribute("disabled", "disabled");
    }

    helper.removeLoading = function() {
        element.innerHTML = currentHtml;
        element.classList.remove("loading");
        if (element.nodeName === "BUTTON") {
            element.removeAttribute("disabled");
        }
    };
}

helper.setLoadingAbsolute = function(el, load = '', color = '#ffffff') {
    div = document.createElement('div')
    div.classList.add('loading-absolute')
    div.innerHTML = '<img src="' + site.url + 'img/loading' + load + '.gif">'
    el.appendChild(div);

    loading = document.querySelectorAll('.loading-absolute')
    loading[0].style.backgroundColor = color

    helper.removeLoadingAbsolute = function() {
        if (document.querySelector('.loading-absolute'))
            document.querySelector('.loading-absolute').remove()
    }
}

helper.setLoadingInput = function(element, classe = 'loading-for-input', load = '', style = '') {
    let div = document.createElement('DIV')
    div.classList.add('loading-input')
    div.classList.add(classe)
    div.innerHTML = '<img style="' + style + '" src="' + site.url + 'img/loading' + load + '.gif">'

    element.parentElement.style.position = "relative"
    element.parentElement.appendChild(div)
}

helper.removeLoadingInput = function(element, classe = 'loading-for-input') {
    let loading = document.querySelector('.' + classe)
    loading.remove()
}

helper.clamp = function(classe, lines) {
    //Colocar elipses em texto descritivos muito longos
    let desc = document.querySelectorAll(classe)
    let desc_length = desc.length
    for (let i = 0; i < desc_length; i++) {
        $clamp(desc[i], {
            clamp: lines
        });
    }
}

//Adicione a classe input clear a um form-group e um X será adicionado
//permitindo limpar o valor do input 
//para os helpers em PHP utilize o parametro 'div' => ['class' => 'input-clear']
helper.inputClear = function() {
    let formGroup = document.querySelectorAll('.input-clear');

    if (formGroup.length > 0) {
        let length = formGroup.length
        for (let i = 0; i < length; i++) {
            let close = document.createElement('i')
            close.classList.add('fas')
            close.classList.add('fa-times')
            close.classList.add('clear-input')

            if (formGroup[i].childNodes[0].value) {
                formGroup[i].appendChild(close)
            }

            formGroup[i].addEventListener('focusout', function() {
                if (this.childNodes[0].value) {
                    this.appendChild(close)
                }
            })

            close.addEventListener('click', function() {
                this.parentNode.childNodes[0].value = ''
                this.remove()
            })
        }

    }
}

helper.swapTouch = function(element, callback) {
    let menu = element;
    let start = 0;
    let move = 0;
    let y_verify = 0;
    let y_verify_end = 0;
    let y_variacao = 50;
    menu.addEventListener("touchstart", function(e) {
        start = e.touches[0].clientX;
        y_verify = e.touches[0].clientY;
    });
    menu.addEventListener("touchmove", function(e) {
        move = e.touches[0].clientX;
        y_verify_end = e.touches[0].clientY;
    });
    menu.addEventListener("touchend", function(e) {
        if (move > start) {
            if (
                y_verify >= y_verify_end &&
                y_verify <= y_verify_end + y_variacao
            ) {
                callback();
            }
        }
    });
};


helper.hasClass = function(listaDeClasses, classe) {
    let length = listaDeClasses.length
    for (let i = 0; i < length; i++) {
        if (listaDeClasses[i].trim() === classe.trim()) {
            return true
        }
    }

    return false
}

helper.awaitPageToLoad = function() {
    let loading = document.querySelector('.loading-page')
    if (loading) {
        window.onload = function() {
            loading.style.opacity = '0'
            setTimeout(function() {
                loading.style.display = 'none'
            }, 500)
        }
    }
}


helper.multiEventListener = function(element, event, callback, type = 'add') {
    if (element && event && callback) {
        let length = element.length
        for (let i = 0; i < length; i++) {
            if (element[i]) {
                if (type === 'add') {
                    console.log(type)
                    element[i].addEventListener(event, callback)
                }

                if (type === 'remove') {
                    console.log(type)
                    element[i].removeEventListener(event, callback)
                }
            }
        }
    } else {
        if (!event) {
            console.log('É necessário enviar um evento, ex: click, focus, input, change')
        }
        if (!callback) {
            console.log('É necessário enviar um função para ser executada')
        }
        if (!element) {
            console.log('É necessário enviar um elemento ou um array de elementos')
        }
    }
}



helper.stringEndereco = function(obj) {
    return (
        obj.bairro +
        ", " +
        obj.logradouro +
        ", " +
        obj.numero +
        ", " +
        (obj.complemento ? obj.complemento + ", " : "") +
        obj.cidade.nome +
        " - " +
        obj.estado.uf +
        " - " +
        obj.cep
    );
};

helper.dinheiro = function(numero) {
    if (numero === undefined) {
        numero = 0;
    }
    var numero = numero.toFixed(2).split(".");
    numero[0] = "R$ " + numero[0].split(/(?=(?:...)*$)/).join(".");
    return numero.join(",");
};

helper.data = function(dataString) {
    if (dataString === undefined) {
        return '';
    }
    var dt = String(dataString).split('T');
    var d = String(dt[0]).split('-');
    return d[2] + '/' + d[1] + '/' + d[0];
};
helper.dataDb = function(dataString) {
    if (dataString === undefined) {
        return '';
    }
    var d = String(dataString).split('/');
    return d[2] + '-' + d[1] + '-' + d[0];
};
helper.hora = function(dataString) {
    if (dataString === undefined) {
        return '';
    }
    var dt = String(dataString).split('T');
    var d = String(dt[1]).split('-');
    return d[0];
};
helper.stripHtmlTags = function(str) {
    if ((str === null) || (str === ''))
        return false;
    else
        str = str.toString();
    return str.replace(/<[^>]*>/g, '');
}

helper.erroDeConexao = function() {
    let div = document.createElement("DIV");
    div.classList.add("erro-de-conexao");
    div.innerHTML =
        '<img src="' +
        site.url +
        "img/erro-de-conexao.svg" +
        '" > \n\
                     <p class="error-title" > Ocorreu um erro ao tentar se conectar. </p> \n\
                     <p> Verifique sua conexão com a internet e tente novamente </p> \n\
                     <a href="' +
        site.url +
        '"> Tentar novamente </a>';
    document.body.appendChild(div);
    document.body.classList.add("body-erro-de-conexão");
};
helper.flash = function(message = "", type, format = 'alert', no_result_img = 'img/svg/not_found.svg') {
    let div = document.createElement("DIV");
    if (format === 'alert') {
        switch (type) {
            case "success":
                div.className = "alert alert-success fade in";
                break;
            case "error":
                div.className = "alert alert-warning fade in";
                break;
            default:
                div.className = "alert alert-default fade in";
                break;
        }

        div.innerHTML = message;
    } else if (format === 'not_found') {
        div.innerHTML = '<div class="no-result">  <img src = "' + site.url + no_result_img + '" / > < p > ' +
            message + ' < /p> </div > '
    }

    document.body.appendChild(div);
    setTimeout(function() {
        div.style.opacity = 0
        setTimeout(function() {
            div.remove()
        }, 300)
    }, 5000)
};

helper.linkTrace = function() {
    window.addEventListener("beforeunload", function(e) {
        _session.set("previous_page", window.location.href);
        if (window.location.href.indexOf("/site/") == -1) {
            _session.set("previous_restaurant", window.location.href);
        }
    });
};
helper.insertAfter = function(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

helper.stringToNumber = function(number) {
    return parseFloat(parseFloat(number.toFixed(2)))
}

helper.stringToFloat = function(value) {
    return parseFloat(value
        .replace(/[^0-9.,]+/, '')
        .replace('.', '')
        .replace('.', '')
        .replace('.', '')
        .replace('.', '')
        .replace('.', '')
        .replace('.', '')
        .replace('.', '')
        .replace('.', '')
        .replace('.', '')
        .replace('.', '')
        .replace('.', '')
        .replace('.', '')
        .replace('.', '')
        .replace('.', '')
        .replace('.', '')
        .replace(',', '.')
    );
}

helper.getQuery = function(str) {
    console.log('helper.getQuery: ', str);
    return document.querySelector(str);
}

helper.hasQuery = function(str) {
    let has = helper.getQuery(str);
    console.log('helper.hasQuery: ', has);
    if (!!has) {
        return has;
    }
    return null;
}

helper.getPosition = function(element) {
    var xPosition = 0;
    var yPosition = 0;
    while (element) {
        xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent;
    }

    return {
        x: xPosition,
        y: yPosition
    };
}

helper.event = function(obj, event, listener) {
    helper.eventOff(obj, event, listener);
    helper.eventOn(obj, event, listener);
}
helper.eventOff = function(obj, event, listener) {
    obj.removeEventListener(event, listener, false);
}
helper.eventOn = function(obj, event, listener) {
    obj.addEventListener(event, listener, false);
}

helper.str_replace = function(search, replace, subject, countObj) {

    var i = 0
    var j = 0
    var temp = ''
    var repl = ''
    var sl = 0
    var fl = 0
    var f = [].concat(search)
    var r = [].concat(replace)
    var s = subject
    var ra = Object.prototype.toString.call(r) === '[object Array]'
    var sa = Object.prototype.toString.call(s) === '[object Array]'
    s = [].concat(s)

    var $global = (typeof window !== 'undefined' ? window : global)
    $global.$locutus = $global.$locutus || {}
    var $locutus = $global.$locutus
    $locutus.php = $locutus.php || {}

    if (typeof(search) === 'object' && typeof(replace) === 'string') {
        temp = replace
        replace = []
        for (i = 0; i < search.length; i += 1) {
            replace[i] = temp
        }
        temp = ''
        r = [].concat(replace)
        ra = Object.prototype.toString.call(r) === '[object Array]'
    }

    if (typeof countObj !== 'undefined') {
        countObj.value = 0
    }

    for (i = 0, sl = s.length; i < sl; i++) {
        if (s[i] === '') {
            continue
        }
        for (j = 0, fl = f.length; j < fl; j++) {
            temp = s[i] + ''
            repl = ra ? (r[j] !== undefined ? r[j] : '') : r[0]
            s[i] = (temp).split(f[j]).join(repl)
            if (typeof countObj !== 'undefined') {
                countObj.value += ((temp.split(f[j])).length - 1)
            }
        }
    }
    return sa ? s : s[0]
}

helper.invertColor = function(hex, bw) {
    function padZero(str, len) {
        len = len || 2;
        var zeros = new Array(len).join('0');
        return (zeros + str).slice(-len);
    }
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
        throw new Error('Invalid HEX color.');
    }
    var r = parseInt(hex.slice(0, 2), 16),
        g = parseInt(hex.slice(2, 4), 16),
        b = parseInt(hex.slice(4, 6), 16);
    if (bw) {
        // http://stackoverflow.com/a/3943023/112731
        return (r * 0.299 + g * 0.587 + b * 0.114) > 186 ?
            '#000000' :
            '#FFFFFF';
    }
    // invert color components
    r = (255 - r).toString(16);
    g = (255 - g).toString(16);
    b = (255 - b).toString(16);
    // pad each with zeros and return
    return "#" + padZero(r) + padZero(g) + padZero(b);
}

helper.timeAgo = function(time) {
    let start = moment();
    let tempo;
    let texto;
    let config = [{
        timeStemp: 'seconds',
        text: 'segundos',
        limite: 60
    }, {
        timeStemp: 'minutes',
        text: 'minutos',
        limite: 60
    }, {
        timeStemp: 'hours',
        text: 'horas',
        limite: 24
    }, {
        timeStemp: 'days',
        text: 'dias',
        limite: 7
    }, {
        timeStemp: 'weeks',
        text: 'semanas',
        limite: 4
    }, {
        timeStemp: 'months',
        text: 'meses',
        limite: 12
    }, {
        timeStemp: 'years',
        text: 'anos',
        limite: null
    }, ]

    for (let i of config) {
        let a = moment(start)
        let b = moment(time)
        tempo = a.diff(b, i.timeStemp)
        texto = i.text
        if (tempo < i.limite) {
            break;
        }
    }

    return {
        texto: texto,
        tempo: tempo
    }
}


helper.createElement = function(type, classe = '', valor = '') {
    let el = document.createElement(type)
    el.classList.add(classe)
    el.innerHTML = valor
    return el
}

helper.awaitPageToLoad()

helper.inputClear()
helper.addFocusToAddon()
helper.submitButton()
helper.loadLink()