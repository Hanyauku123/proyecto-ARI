var coder = [[0,1,2,3,4,5,6,7,8,9],
            [1,2,3,4,5,6,7,8,9,0],
            [2,3,4,5,6,7,8,9,0,1],
            [3,4,5,6,7,8,9,0,1,2],
            [4,5,6,7,8,9,0,1,2,3],
            [5,6,7,8,9,0,1,2,3,4],
            [6,7,8,9,0,1,2,3,4,5],
            [7,8,9,0,1,2,3,4,5,6],
            [8,9,0,1,2,3,4,5,6,7],
            [9,0,1,2,3,4,5,6,7,8]];
            
function cifrado(creditcard, key) {
    
    //var creditcard = "4613827503116";
    var ccarray =creditcard.split("");
    for (var i=0; i < ccarray.length; i++){
    	ccarray[i] = parseInt(ccarray[i]);
    }

    var clave =key.split("");
    for (var i=0; i < clave.length; i++){
    	clave[i] = parseInt(clave[i]);
    }
    
    var cccodiado =[];                 

	for(var i=0; i < 13; i++){
        for(var j=0; j<10; j++){
            if(ccarray[i] == coder[0][j]){
                x = coder[0][j];
                //document.getElementById("demo").innerHTML = x;
                for(var j=0; j<10; j++){
                  if(clave[i] == coder[j][0]){
                      y = coder[j][0];
                      //document.getElementById("demo").innerHTML = y;
                  }
        		}
                cccodiado[i] = coder[x][y];
                //document.getElementById("demo").innerHTML = cccodiado[5];
            }
        }
    }
    cccodiado = cccodiado.toString().replace(/,/g, "");
    
    
    return cccodiado;
    //document.getElementById("demo").innerHTML = cccodeado;
}


function decifrado(creditcardcoder, key){
    
    var cccodiado =creditcardcoder.split("");
    for (var i=0; i < cccodiado.length; i++){
    	cccodiado[i] = parseInt(cccodiado[i]);
    }
    
    var clave =key.split("");
    for (var i=0; i < clave.length; i++){
    	clave[i] = parseInt(clave[i]);
    }

    var ccdecoder =[];
    for(var i=0; i<13; i++){
        for(var j=0; j<10; j++){
            if(cccodiado[i] == coder[clave[i]][j]){
                ccdecoder[i] = coder[0][j];
            }
        }
    }
    ccdecoder = ccdecoder.toString().replace(/,/g, "");
    
    return ccdecoder;
}