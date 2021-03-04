const request = {}

request.getHTML = function(url, data, callback) {

    myHeaders = new Headers();

    myInit = {
        method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default'
    };

    fetch(url, myInit)
        .then(function(response) {
            return response.text();
        })
        .then(function(myHTML) {
            callback(myHTML)
        }).catch(resp => {
            console.log(resp)
        })
}

request.get = function(url, data) {

    myHeaders = new Headers();

    myInit = {
        method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default'
    };

    fetch('flowers.jpg', myInit)
        .then(function(response) {
            return response.json();
        })
        .then(function(myBlob) {
            var objectURL = URL.createObjectURL(myBlob);
            myImage.src = objectURL;
        });
}