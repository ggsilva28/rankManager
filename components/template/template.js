const site = {}

site.url = 'http://localhost/x1-dos-cria/'

site.start = function(title = 'X1 dos Crias') {
    request.getHTML(site.url + 'components/template/template.html', {}, function(myHTML) {
        let template = document.getElementsByTagName('template')
        let scripts = document.querySelectorAll('[template="script"]')
        let links = document.querySelectorAll('[template="link"]')

        document.body.innerHTML = myHTML

        console.log(template)
        console.log(scripts)
        console.log(links)

        let scripts_template = document.querySelectorAll('[template="script"]')
        console.log(scripts_template)

        if (template) {
            let page_content = document.querySelector('[template="page-content"]')
            page_content.innerHTML = template[0].innerHTML
        }

        if (scripts) {
            for (let i = 0; i < scripts.length; i++) {
                let page_scripts = document.querySelector('[template="page-scripts"]')
                let el = document.createElement('script')
                el.src = scripts[i].src
                scripts[i].remove()
                page_scripts.appendChild(scripts[i])
            }
        }

        if (scripts_template) {
            for (let i = 0; i < scripts_template.length; i++) {
                let page_scripts = document.querySelector('[template="page-scripts"]')
                let el = document.createElement('script')
                if (scripts_template[i].src)
                    el.src = scripts_template[i].src
                if (scripts_template[i].innerHTML)
                    el.innerHTML = scripts_template[i].innerHTML
                scripts_template[i].remove()
                page_scripts.appendChild(el)
            }
        }

        if (links) {
            for (let i = 0; i < links.length; i++) {
                document.head.appendChild(links[i])
            }
        }

        setTimeout(function() {
            for (let i of getScripts) {
                let page_scripts = document.querySelector('[template="page-scripts"]')
                let el = document.createElement('script')
                el.src = i
                page_scripts.appendChild(el)
            }
        }, 1000)
    })

    request.getHTML(site.url + 'components/template/header.html', {}, function(myHTML) {
        document.head.innerHTML += myHTML
    })
}

site.start()