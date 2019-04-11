//Get Frete from Centralar
//TIPO: CEP Separado
var CEPArrayPT1 = ["20040", "01013", "88015", "72755", "24020", "11010", "89201", "40020", "77060", "16010", "79002", "26255", "52170", "60060", "11410", "91060", "89012", "25011", "24445", "30190", "13015", "89251", "74633", "56302", "88330", "78088", "86026", "38010", "87035", "35160", "88220", "28010", "49010", "27913", "25515", "18035", "11250", "16204", "14015", "80410", "15015", "19010", "35010", "16901", "28300", "38600", "13201", "28990", "11706", "11600", "26112", "28907", "59139", "13330", "64001", "79600", "29016", "25625", "66110", "13400", "57020", "13465", "88801", "88103", "38400", "16300", "65015", "93510", "12209", "11680", "36860", "36010", "37900", "13610", "38700", "29102", "88302", "11320", "13300", "25900", "79814", "39400", "27253", "09015", "95560", "35660", "95020", "92310", "06540", "35180", "11660", "24900", "13800", "15500", "29165", "28893", "07095", "13480", "75909", "63050", "28950", "97015", "36500", "27511", "14900", "23932", "89120", "06422", "06056", "28970", "09812", "17015", "26525", "58013", "89812", "85851", "15600", "17900", "13561", "17800", "46430", "13450", "49500", "59300", "14160", "08717", "14870", "26564", "88215", "11750", "35500", "78700", "44001", "38200", "45027", "35680", "15400", "36774", "15370", "59633", "54490", "24876", "86300", "13874", "93025", "28470", "35701", "13840", "14808", "55299", "69917", "69098", "68909", "76803", "69309" ]; 
var CEPArrayPT2 = ["031", "001", "395", "239", "290", "170", "203", "030", "323", "260", "160", "158", "390", "095", "220", "210", "490", "360", "060", "010", "100", "805", "045", "120", "190", "456", "730", "100", "580", "001", "970", "300", "490", "370", "350", "080", "970", "310", "068", "123", "000", "190", "177", "018", "970", "000", "062", "970", "145", "970", "050", "240", "520", "100", "370", "192", "020", "250", "485", "120", "750", "015", "016", "245", "097", "000", "465", "290", "525", "970", "000", "359", "047", "137", "002", "265", "081", "060", "049", "040", "540", "215", "220", "525", "000", "390", "330", "070", "105", "071", "010", "340", "036", "395", "130", "068", "010", "050", "170", "580", "000", "450", "000", "072", "000", "030", "000", "140", "010", "970", "060", "390", "425", "290", "206", "000", "000", "000", "353", "000", "000", "179", "000", "970", "082", "300", "180", "200", "000", "000", "036", "100", "112", "000", "560", "346", "970", "560", "000", "715", "035", "165", "970", "000", "424", "000", "392", "000", "154", "515", "704", "500", "010", "886", "410" ];
//variaveis auxiliares
var freteCount = 0;
var checkCount = 0;
var outText;

function pegarFretes() {
  for (freteCount = 0; freteCount < CEPArrayPT1.length; freteCount++) {
    getResults(CEPArrayPT1[freteCount], CEPArrayPT2[freteCount], freteCount);
  }
}

function checkTotal() {
  if (++checkCount >= CEPArrayPT1.length) {
    console.log(outText);
  } else {
    //andamento da carroça
    console.log(((checkCount) / CEPArrayPT1.length * 100).toFixed(1) + "%");
  }
}

function getResults(CEP1, CEP2, n) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      //Pega o valor
      try {
        resposta = JSON.parse(this.responseText)
          //=========================================================== Normal
        var achei = false
        var prazo;
        var valor;
        //Pega o Prazo
        for (var i = 0; i < resposta[0].ClienteEnderecoFreteEntregasTipos.length; i++) {
          var frete = resposta[0].ClienteEnderecoFreteEntregasTipos[i];
          if (frete.Nome == "Normal") {
            prazo = eval(frete.PrazoEntrega);
            valor = eval(frete.ValorFreteComDesconto).toString().replace(".", ",");
            achei = true;
          }
        }
        //Monta a linha de saida final
        if (achei) {
          outText += "\n" + (n + 1) + "\tPontoFrio\t" + CEP1 + "-" + CEP2 + "\t" + valor + "\t" + prazo + "\tsomente um tipo";
        } else {
          outText += "\n" + (n + 1) + "\tPontoFrio\t" + CEP1 + "-" + CEP2 + "\t\t\tsomente um tipo";
        }

        //========================================== deu algum erro, nao entrega no cep

      } catch (e) {
        outText += "\n" + (n + 1) + "\tPontoFrio\t" + CEP1 + "-" + CEP2 + "\t\t\tsomente um tipo";
      }
      //verifica se já recebeu resposta de todos os fretes
      checkTotal();
    }
  };
  //MODIFICAR ESSA URL, USAR O F12 NO BROWSER PRA PEGAR O LINK CORRETO PARA O PRODUTO E ELIMINAR OS CAMPOS INUTEIS
  xhttp.open("POST", "https://www.pontofrio.com.br/AsyncProduto.ashx", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("prefixo=" + CEP1 + "&sufixo=" + CEP2 + "&idLojista=11499&sku=12620951");
}
pegarFretes();