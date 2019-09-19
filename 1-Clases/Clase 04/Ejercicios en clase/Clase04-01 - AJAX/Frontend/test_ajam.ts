function test() {
    let request: XMLHttpRequest = new XMLHttpRequest;
    request.open("GET", "../Backend/test.php", true);
    request.send();
    request.onreadystatechange = () => {
        if (request.readyState == 4 && request.status == 200) {
            console.log(request.responseText);
            alert(request.responseText);
        }
    }
}

//cuando la ventana se carga, llama automaticamente a test
window.onload = function () {
    test();
}

function test_params() {
    let request: XMLHttpRequest = new XMLHttpRequest;
    let nombre: string = (<HTMLInputElement>document.getElementById("txtNombre")).value;
    request.open("GET", "../Backend/test_params.php?txtNombre=" + nombre, true);
    request.send();
    request.onreadystatechange = () => {
        if (request.readyState == 4 && request.status == 200) {
            alert(request.responseText);
        }
    }
}

