//Get Frete from Dufrio
//TIPO: CEP Normal
var CEPText = ["20040-031", "01013-001", "88015-395", "72755-239", "24020-290", "11010-170", "89201-203", "40020-030", "77060-323", "16010-260", "79002-160", "26255-158", "52170-390", "60060-095", "11410-220", "91060-210", "89012-490", "25011-360", "24445-060", "30190-010", "13015-100", "89251-805", "74633-045", "56302-120", "88330-190", "78088-456", "86026-730", "38010-100", "87035-580", "35160-001", "88220-970", "28010-300", "49010-490", "27913-370", "25515-350", "18035-080", "11250-970", "16204-310", "14015-068", "80410-123", "15015-000", "19010-190", "35010-177", "16901-018", "28300-970", "38600-000", "13201-062", "28990-970", "11706-145", "11600-970", "26112-050", "28907-240", "59139-520", "13330-100", "64001-370", "79600-192", "29016-020", "25625-250", "66110-485", "13400-120", "57020-750", "13465-015", "88801-016", "88103-245", "38400-097", "16300-000", "65015-465", "93510-290", "12209-525", "11680-970", "36860-000", "36010-359", "37900-047", "13610-137", "38700-002", "29102-265", "88302-081", "11320-060", "13300-049", "25900-040", "79814-540", "39400-215", "27253-220", "09015-525", "95560-000", "35660-390", "95020-330", "92310-070", "06540-105", "35180-071", "11660-010", "24900-340", "13800-036", "15500-395", "29165-130", "28893-068", "07095-010", "13480-050", "75909-170", "63050-580", "28950-000", "97015-450", "36500-000", "27511-072", "14900-000", "23932-030", "89120-000", "06422-140", "06056-010", "28970-970", "09812-060", "17015-390", "26525-425", "58013-290", "89812-206", "85851-000", "15600-000", "17900-000", "13561-353", "17800-000", "46430-000", "13450-179", "49500-000", "59300-970", "14160-082", "08717-300", "14870-180", "26564-200", "88215-000", "11750-000", "35500-036", "78700-100", "44001-112", "38200-000", "45027-560", "35680-346", "15400-970", "36774-560", "15370-000", "59633-715", "54490-035", "24876-165", "86300-970", "13874-000", "93025-424", "28470-000", "35701-392", "13840-000", "14808-154", "55299-515", "69917-704", "69098-500", "68909-010", "76803-886", "69309-410"];

//vars auxiliares
var freteCount = 0;
var checkCount = 0;
var outText = "";

function pegarFretes() {
  for (freteCount = 0; freteCount < CEPText.length; freteCount++) {
    GetResults(CEPText[freteCount], freteCount);
  }
}

function checkTotal() {
  if (++checkCount >= CEPText.length) {
    console.log(outText);
  } else {
    //andamento da carroça
    //console.log(((checkCount) / CEPText.length * 100).toFixed(1) + "%");
  }
}


function GetResults(CEP, n) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      try {
        texto = JSON.parse(this.responseText).resultado;

        //Pega o Prazo
        prazos = texto.match(/\d+(?=\s*dias?)/ig);
        var prazoMenor = 99;
        var prazoMaior = 0;
        var indiceMenor;
        var indiceMaior;
        for (var index = 0; index < prazos.length; index++) {
          var element = eval(prazos[index]);
          if (element < prazoMenor) {
            prazoMenor = element;
            indiceMenor = index
          }
          if (element > prazoMaior) {
            prazoMaior = element;
            indiceMaior = index
          }
        }
        //=========================================================== Rapido
        //Pega o valor
        valor = texto.match(/R\$.?\d+\.\d+/ig)[indiceMenor];
        //Monta a linha de saida (normal)
        outText += "\n" + (n + 1) + "\tDufrio\t" + CEPText[n] + "\t" + valor + "\t" + prazoMenor + "\trapido";
        //verifica se já recebeu resposta de todos os fretes

        //=========================================================== Normal
        //Pega o valor
        valor = texto.match(/R\$.?\d+\.\d+/ig)[indiceMaior];
        //Monta a linha de saida (normal)
        outText += "\n" + (n + 1) + "\tDufrio\t" + CEPText[n] + "\t" + valor + "\t" + prazoMaior + "\tnormal";


        //========================================== deu algum erro, nao entrega no cep
      } catch (e) {
        console.log(e);
        //marca como vazio
        outText += "\n" + (n + 1) + "\tDufrio\t" + CEPText[n] + "\t\t\trapido";
        outText += "\n" + (n + 1) + "\tDufrio\t" + CEPText[n] + "\t\t\tnormal";
        //verifica se já recebeu resposta de todos os fretes
      }
      checkTotal();
    }
  };	

  //MODIFICAR ESSA URL, USAR O F12 NO BROWSER PRA PEGAR O LINK CORRETO PARA O PRODUTO E REMOVER CAMPOS INUTEIS
  xhttp.open("POST", "https://www.dufrio.com.br/tema/dufrio/pagina/ajax/ajax-calcular-frete.php", false);
  xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
  xhttp.send('cep=' + CEP + '&peso=37.600&preco=1588.00&sku=191500');

}
pegarFretes();