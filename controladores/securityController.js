const convertidor = require("../utils/converterTxt-XML-JSON");

async function handleXMl(req,res){
    
    //Pasa/convierte de txt a xml
    try {
        if(req.body.tipo == "txt" && req.body.convertir_a == "xml"){
            res.status(200).json({result: convertidor.convertFunctions.txtToXML(req.body.file,req.body.delimitador), 
                tipo: 'xml'});
        }
    
        //Pasa/convierte de xml to txt
        if(req.body.tipo == "xml" && req.body.convertir_a == "txt"){
            var resultado = await convertidor.convertFunctions.xmlToTxt(req.body.file,req.body.delimitador)
            console.log(resultado);
            res.status(200).json({result: resultado , 
                tipo: 'txt'});
        }
    
        //Pasa/convierte de txt to json
        if(req.body.tipo == "txt" && req.body.convertir_a == "json"){
            var resultado = await convertidor.convertFunctions.TxtToJson(req.body.file,req.body.delimitador);
            res.status(200).json({result: resultado, 
                tipo: 'json'});
        }
    
        //Pasa/convierte de json to txt
        if(req.body.tipo == "json" && req.body.convertir_a == "txt"){
            res.status(200).json({result: convertidor.convertFunctions.JsonToTxt(req.body.file,req.body.delimitador), 
                tipo: 'txt'});
        }
    
    } catch (error) {
        console.log(error);
        res.status(404).json({result: 'Error'})
    }

}

module.exports.handlexml = handleXMl;