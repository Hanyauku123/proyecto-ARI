var btn = document.getElementById("btn_submit");
var file = document.getElementById("formFile");
var option = document.getElementById("formSelect");
var delimitador = document.getElementById("llave");
var clave = document.getElementById("clave");
var dnl = document.getElementById("donwloadfile");
var origen = document.getElementById("originf");
var resultadof = document.getElementById("resultf");


btn.addEventListener("click", handleSubmit);


function handleSubmit(e) {
    e.preventDefault();
    var fetchjson = {


    };
    //Valida los tipos de archivos permitidos
    if (file.value.split(".")[1] == 'txt' ||
        file.value.split(".")[1] == 'xml' || file.value.split(".")[1] == 'json') {

            //Verifica que el archivo subido y a convertir sean de diferente extencion
        if (file.value.split(".")[1] != option.options[option.selectedIndex].text) {
            console.log(clave.value.length);
            //Valida que la clave tenga 13 digitos
            if (clave.value.length == 13) {
                fetchjson.tipo = file.value.split(".")[1];
                fetchjson.convertir_a = option.options[option.selectedIndex].text;

                fetchjson.clave = clave.value;
                fetchjson.delimitador = delimitador.value;
                var myFile = file.files[0];
                var reader = new FileReader();
                reader.readAsText(myFile);

                //Se trata el archivo para cifrarlo
                reader.onload = function () {
                    var strfile = reader.result;
                    origen.value = reader.result;
                    fetchjson.file = strfile;
                    console.log(fetchjson);
                    var re = /[0-9]{13}/g;
                    var s = strfile;
                    var m;
                    let newstrfile = strfile;
                    //crifrado de credit-card
                    do {
                        m = re.exec(s);
                        if (m) {
                            console.log(m);
                            var aux = strfile.substr(m.index, 13);
                            console.log(aux);
                            var aux_cifrado = cifrado(aux, clave.value);
                            console.log(aux_cifrado);
                            var descifrado = decifrado(aux_cifrado, clave.value);
                            console.log(descifrado);
                            newstrfile = newstrfile.replace(aux, (macth) => {
                                return aux_cifrado;
                            })
                        }
                    } while (m)

                    fetchjson.file = newstrfile

                    request(fetchjson);
                }
            } else {
                alert("La llave tiene que ser 13 números enteros sin espacios");
            }

        } else {
            alert("Los valores a convertir son iguales, ingrese un valor diferente");
        }

    } else {
        alert("Por favor adjuntar el archivo a convertir");
    }

}

function request(data) {
    var url = '/';


    fetch(url, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .catch(error => console.error('Error:'))
        .then(response => {

            console.log(response);
            var re = /[0-9]{13}/g;
            var s = response.result;
            var m;
            let newstrfile = response.result;

            //decifrado de credit-card
            do {
                m = re.exec(s);
                if (m) {
                    console.log(m);
                    var aux = response.result.substr(m.index, 13);
                    console.log(aux);

                    var descifrado = decifrado(aux, clave.value);
                    console.log(descifrado);
                    newstrfile = newstrfile.replace(aux, (macth) => {
                        return descifrado;
                    })
                }
            } while (m)

            //muestra resultado en TARGET FILE y se le asigna nombre al archivo de descarga
            resultadof.value = newstrfile.toString();
            if (response.tipo == "xml") {
                dnl.classList.remove("d-none");
                dnl.setAttribute('href', 'data:text/xml;charset=utf-8,' + encodeURIComponent(newstrfile))
                dnl.setAttribute('download', "archivo_final.xml");
            }

            if (response.tipo == "txt") {
                dnl.classList.remove("d-none");
                dnl.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(newstrfile))
                dnl.setAttribute('download', "archivo_final.txt");
            }

            if (response.tipo == "json") {
                dnl.classList.remove("d-none");
                dnl.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(newstrfile))
                dnl.setAttribute('download', "archivo_final.json");
            }

        });
}

