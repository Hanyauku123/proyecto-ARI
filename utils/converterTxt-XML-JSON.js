const fs = require('fs')
const xmlcsv = require("xml-csv");
const transform = require('camaro')
const json2csv = require('json2csv').parse
const csv=require('csvtojson');
const { json } = require('express');


function txtToXML(file, del){
    console.log(file);
    const fileContents = file;
    csvData = fileContents.split('\n').map(row => row.trim())

    let headings = csvData[0].split(del)

    let xml = ``
    xml += '<clientes>\n';
    for(let i = 1; i < csvData.length; i++) {
        let details = csvData[i].split(del);
        xml += "<cliente>\n";
            for(let j = 0; j < headings.length; j++) {
                xml += `    <${headings[j]}>${details[j]}</${headings[j]}>\n`;
            }
        xml += "</cliente>\n\n";}
    xml += '</clientes>\n';
    console.log(xml);
    return xml;
}

async function xmlToTxt(file,del){
    try {
        console.log(file);
    const template = {
        data: [ "//cliente",{
            documento: 'documento',
            primer_nombre: 'primer-nombre',
            apellido: 'apellido',
            credit_card: "credit-card",
            tipo: "tipo",
            telefono: "telefono"
        }]
    }

    var result = await transform.transform(file, template);
    console.log(result);
    var csv = json2csv(result.data)
    if(del != ","){
        csv = csv.replace(",",del);
    }
    
    console.log(csv);
        return csv;
    } catch (error) {
        console.log(error);
        return ""
    }   
}

function JsonToTxt(file,del){
    var csv = json2csv(JSON.parse(file));
    
    if(del != ","){
        csv = csv.replace(",",del);
    }
    
    return csv;
}

async function TxtToJson(file,del){
    console.log(file);
    var header = file.split("\n")[0].split(";");
    // fs npm package
    var res =  await csv({noheader: false,
    headers: header,
    delimiter: del
    }).fromString(file);
    console.log(res);
    return JSON.stringify(res);
}

module.exports.convertFunctions = {
    txtToXML,xmlToTxt,JsonToTxt,TxtToJson
}