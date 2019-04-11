﻿//Get Frete from Consul
var CEPText = ["20040-031", "01013-001", "88015-395", "72755-239", "24020-290", "11010-170", "89201-203", "40020-030", "77060-323", "16010-260", "79002-160", "26255-158", "52170-390", "60060-095", "11410-220", "91060-210", "89012-490", "25011-360", "24445-060", "30190-010", "13015-100", "89251-805", "74633-045", "56302-120", "88330-190", "78088-456", "86026-730", "38010-100", "87035-580", "35160-001", "88220-970", "28010-300", "49010-490", "27913-370", "25515-350", "18035-080", "11250-970", "16204-310", "14015-068", "80410-123", "15015-000", "19010-190", "35010-177", "16901-018", "28300-970", "38600-000", "13201-062", "28990-970", "11706-145", "11600-970", "26112-050", "28907-240", "59139-520", "13330-100", "64001-370", "79600-192", "29016-020", "25625-250", "66110-485", "13400-120", "57020-750", "13465-015", "88801-016", "88103-245", "38400-097", "16300-000", "65015-465", "93510-290", "12209-525", "11680-970", "36860-000", "36010-359", "37900-047", "13610-137", "38700-002", "29102-265", "88302-081", "11320-060", "13300-049", "25900-040", "79814-540", "39400-215", "27253-220", "09015-525", "95560-000", "35660-390", "95020-330", "92310-070", "06540-105", "35180-071", "11660-010", "24900-340", "13800-036", "15500-395", "29165-130", "28893-068", "07095-010", "13480-050", "75909-170", "63050-580", "28950-000", "97015-450", "36500-000", "27511-072", "14900-000", "23932-030", "89120-000", "06422-140", "06056-010", "28970-970", "09812-060", "17015-390", "26525-425", "58013-290", "89812-206", "85851-000", "15600-000", "17900-000", "13561-353", "17800-000", "46430-000", "13450-179", "49500-000", "59300-970", "14160-082", "08717-300", "14870-180", "26564-200", "88215-000", "11750-000", "35500-036", "78700-100", "44001-112", "38200-000", "45027-560", "35680-346", "15400-970", "36774-560", "15370-000", "59633-715", "54490-035", "24876-165", "86300-970", "13874-000", "93025-424", "28470-000", "35701-392", "13840-000", "14808-154", "55299-515", "69917-704", "69098-500", "68909-010", "76803-886", "69309-410"];
var CEPArray = ["20040031", "01013001", "88015395", "72755239", "24020290", "11010170", "89201203", "40020030", "77060323", "16010260", "79002160", "26255158", "52170390", "60060095", "11410220", "91060210", "89012490", "25011360", "24445060", "30190010", "13015100", "89251805", "74633045", "56302120", "88330190", "78088456", "86026730", "38010100", "87035580", "35160001", "88220970", "28010300", "49010490", "27913370", "25515350", "18035080", "11250970", "16204310", "14015068", "80410123", "15015000", "19010190", "35010177", "16901018", "28300970", "38600000", "13201062", "28990970", "11706145", "11600970", "26112050", "28907240", "59139520", "13330100", "64001370", "79600192", "29016020", "25625250", "66110485", "13400120", "57020750", "13465015", "88801016", "88103245", "38400097", "16300000", "65015465", "93510290", "12209525", "11680970", "36860000", "36010359", "37900047", "13610137", "38700002", "29102265", "88302081", "11320060", "13300049", "25900040", "79814540", "39400215", "27253220", "09015525", "95560000", "35660390", "95020330", "92310070", "06540105", "35180071", "11660010", "24900340", "13800036", "15500395", "29165130", "28893068", "07095010", "13480050", "75909170", "63050580", "28950000", "97015450", "36500000", "27511072", "14900000", "23932030", "89120000", "06422140", "06056010", "28970970", "09812060", "17015390", "26525425", "58013290", "89812206", "85851000", "15600000", "17900000", "13561353", "17800000", "46430000", "13450179", "49500000", "59300970", "14160082", "08717300", "14870180", "26564200", "88215000", "11750000", "35500036", "78700100", "44001112", "38200000", "45027560", "35680346", "15400970", "36774560", "15370000", "59633715", "54490035", "24876165", "86300970", "13874000", "93025424", "28470000", "35701392", "13840000", "14808154", "55299515", "69917704", "69098500", "68909010", "76803886", "69309410"];

//vars auxiliares
var freteCount = 0;
var checkCount = 0;
var outText = "";

function pegarFretes() {
  for (freteCount = 0; freteCount < CEPArray.length; freteCount++) {
    GetResults(CEPArray[freteCount], freteCount);
  }
}

function checkTotal() {
  if (++checkCount >= CEPArray.length) {
    console.log(outText);
  } else {
    //andamento da carroça
    console.log(((checkCount) / CEPArray.length * 100).toFixed(1) + "%");
  }
}

function GetResults(CEP, n) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      //----------Saida----------
      //Pega o valor
      resposta = JSON.parse(this.responseText)

      if (resposta.shippingData.logisticsInfo[0].slas.length > 0) {

        //index do tipo que desejamos
        for (var index = 0; index < resposta.shippingData.logisticsInfo[0].slas.length; index++) {
          var element = resposta.shippingData.logisticsInfo[0].slas[index];
          if (element.id == "Convencional") break;
          if (index == resposta.shippingData.logisticsInfo[0].slas.length - 1) { index = 0; break; }
        }

        valor = (resposta.shippingData.logisticsInfo[0].slas[index].price / 100).toFixed(2).replace(".", ",");
        //Pega o Prazo
        prazo = (resposta.shippingData.logisticsInfo[0].slas[index].shippingEstimate).match(/\d+/i)[0];
        //Monta a linha de saida final
        outText += "\n" + (n + 1) + "\tConsul\t" + CEPText[n] + "\t" + valor + "\t" + prazo + "\tsomente um tipo";


        //deu algum erro ou nao entrega no cep
      } else {
        //marca como vazio
        outText += "\n" + (n + 1) + "\tConsul\t" + CEPText[n] + "\t\t\tsomente um tipo";
      }
      //verifica se já recebeu resposta de todos os fretes
      checkTotal();

    } else if (this.readyState == 4) {
      console.log("Erro de rede");
      //marca como vazio
      outText += "\n" + (n + 1) + "\tConsul\t" + CEPText[n] + "\t\t\tsomente um tipo";
      //verifica se já recebeu resposta de todos os fretes
      checkTotal();
    }
  }

  //MODIFICAR ESSA URL, USAR O F12 NO BROWSER PRA PEGAR O LINK CORRETO PARA O PRODUTO

  xhttp.open("POST", "https://loja.consul.com.br/api/checkout/pub/orderForm/6eec3efe93ab463ea93cbc02504570fc/attachments/shippingData", true);
  xhttp.setRequestHeader("Content-Type", "application/json; charset=utf-8");
  dadosJson = JSON.stringify({ "address": { "postalCode": CEP, "country": "BRA" }, "expectedOrderFormSections": ["shippingData"] });
  xhttp.send(dadosJson);
}

pegarFretes();