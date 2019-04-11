// Pesquisa de reputação.
// Reclame Aqui
var urlsRA = [
    // Refrigeração
    "https://iosite.reclameaqui.com.br/raichu-io-site-v1/company/compare/11128", // CentralAr.com
    "https://iosite.reclameaqui.com.br/raichu-io-site-v1/company/compare/11399", // A.Dias
    "https://iosite.reclameaqui.com.br/raichu-io-site-v1/company/compare/24125", // Frigelar
    "https://iosite.reclameaqui.com.br/raichu-io-site-v1/company/compare/7016", // Frio peças
    "https://iosite.reclameaqui.com.br/raichu-io-site-v1/company/compare/15106", // Leveros
    "https://iosite.reclameaqui.com.br/raichu-io-site-v1/company/compare/10620", // PoloAr
    "https://iosite.reclameaqui.com.br/raichu-io-site-v1/company/compare/45442", // DuFrio
    "https://iosite.reclameaqui.com.br/raichu-io-site-v1/company/compare/15937", // STR
    "https://iosite.reclameaqui.com.br/raichu-io-site-v1/company/compare/12163", // Web Continental

    // Outros e-commerces
    "https://iosite.reclameaqui.com.br/raichu-io-site-v1/company/compare/7936", // Amazon
    "https://iosite.reclameaqui.com.br/raichu-io-site-v1/company/compare/6446", // Americanas.com - Loja Online
    "https://iosite.reclameaqui.com.br/raichu-io-site-v1/company/compare/97826", // Americanas Marketplace
    "https://iosite.reclameaqui.com.br/raichu-io-site-v1/company/compare/18543", // Carrefour - Loja On Line
    "https://iosite.reclameaqui.com.br/raichu-io-site-v1/company/compare/11871", // Casas Bahia - Loja Online
    "https://iosite.reclameaqui.com.br/raichu-io-site-v1/company/compare/98555", // Casas Bahia - Marketplace
    "https://iosite.reclameaqui.com.br/raichu-io-site-v1/company/compare/8789", // Extra.com.br
    "https://iosite.reclameaqui.com.br/raichu-io-site-v1/company/compare/98553", // Extra.com.br - Marketplace
    "https://iosite.reclameaqui.com.br/raichu-io-site-v1/company/compare/29266", // Magazine Luiza - Loja Online
    "https://iosite.reclameaqui.com.br/raichu-io-site-v1/company/compare/928", // Mercado Livre
    "https://iosite.reclameaqui.com.br/raichu-io-site-v1/company/compare/14089", // Ponto Frio - Loja Online
    "https://iosite.reclameaqui.com.br/raichu-io-site-v1/company/compare/98556", // Ponto Frio - Marketplace
    "https://iosite.reclameaqui.com.br/raichu-io-site-v1/company/compare/10708", // Ricardo Eletro - Loja Online
    "https://iosite.reclameaqui.com.br/raichu-io-site-v1/company/compare/1634", // Shoptime
    "https://iosite.reclameaqui.com.br/raichu-io-site-v1/company/compare/97828", // Shoptime Marketplace
    "https://iosite.reclameaqui.com.br/raichu-io-site-v1/company/compare/647", // Submarino
    "https://iosite.reclameaqui.com.br/raichu-io-site-v1/company/compare/97827", // Submarino Marketplace
    "https://iosite.reclameaqui.com.br/raichu-io-site-v1/company/compare/11018", // WalMart - Loja Online
    "https://iosite.reclameaqui.com.br/raichu-io-site-v1/company/compare/100761", // WalMart - Marketplace
    "https://iosite.reclameaqui.com.br/raichu-io-site-v1/company/compare/37125" // Zoom.com.br
]

// Ebit
var nomesEmpresasEbit = [
    // Refrigeração
    "CentralAr.com",
    "A.Dias",
    "Frigelar",
    "Frio peças",
    "Leveros",
    "PoloAr",
    "DuFrio",
    "STR",
    "Web Continental",

    // Outros e-commerces
    "Amazon",
    "Americanas",
    "Carrefour",
    "Casas Bahia",
    "Extra.com",
    "Magazine Luiza",
    "Mercado Livre",
    "Ponto Frio",
    "Ricardo Eletro",
    "Shoptime",
    "Submarino",
    "Walmart",
    "Zoom"
]
var urlsEbit = [
    // Refrigeração
    "//www.ebit.com.br/reputacao-de-lojas/historico?companyid=7562", // CentralAr.com
    "//www.ebit.com.br/reputacao-de-lojas/historico?companyid=7873", // A.Dias
    "//www.ebit.com.br/reputacao-de-lojas/historico?companyid=73870", // Frigelar
    "//www.ebit.com.br/reputacao-de-lojas/historico?companyid=50989", // Frio peças
    "//www.ebit.com.br/reputacao-de-lojas/historico?companyid=6714", // Leveros
    "//www.ebit.com.br/reputacao-de-lojas/historico?companyid=3378", // PoloAr
    "//www.ebit.com.br/reputacao-de-lojas/historico?companyid=54517", // DuFrio
    "//www.ebit.com.br/reputacao-de-lojas/historico?companyid=15595", // STR
    "//www.ebit.com.br/reputacao-de-lojas/historico?companyid=7694", // Web Continental

    // Outros e-commerces
    "//www.ebit.com.br/reputacao-de-lojas/historico?companyid=66958", // Amazon
    "//www.ebit.com.br/reputacao-de-lojas/historico?companyid=568", // Americanas
    "//www.ebit.com.br/reputacao-de-lojas/historico?companyid=10581", // Carrefour
    "//www.ebit.com.br/reputacao-de-lojas/historico?companyid=740", // Casas Bahia
    "//www.ebit.com.br/reputacao-de-lojas/historico?companyid=2043", // Extra.com
    "//www.ebit.com.br/reputacao-de-lojas/historico?companyid=552", // Magazine Luiza
    "//www.ebit.com.br/reputacao-de-lojas/historico?companyid=", // Mercado Livre
    "//www.ebit.com.br/reputacao-de-lojas/historico?companyid=566", // Ponto Frio
    "//www.ebit.com.br/reputacao-de-lojas/historico?companyid=3556", // Ricardo Eletro
    "//www.ebit.com.br/reputacao-de-lojas/historico?companyid=637", // Shoptime
    "//www.ebit.com.br/reputacao-de-lojas/historico?companyid=715", // Submarino
    "//www.ebit.com.br/reputacao-de-lojas/historico?companyid=742", // Walmart
    "//www.ebit.com.br/reputacao-de-lojas/historico?companyid=" // Zoom
]

// Create RA table.
var raTable = document.createElement('table')
var raBody = document.createElement('tbody')
raTable.appendChild(raBody)

// Create Ebit table.
var ebitTable = document.createElement('table')
var ebitBody = document.createElement('tbody')
ebitTable.appendChild(ebitBody)

//HEADER Ebit
var ebitRow = document.createElement('tr')
var ebitCell = document.createElement('th')
ebitCell.innerHTML = "Player"
ebitRow.appendChild(ebitCell)
ebitCell = document.createElement('th')
ebitCell.innerHTML = "Classificacao"
ebitRow.appendChild(ebitCell)
ebitCell = document.createElement('th')
ebitCell.innerHTML = "Prazo"
ebitRow.appendChild(ebitCell)
ebitCell = document.createElement('th')
ebitCell.innerHTML = "Compraria"
ebitRow.appendChild(ebitCell)
ebitCell = document.createElement('th')
ebitCell.innerHTML = "Indicaria"
ebitRow.appendChild(ebitCell)

//HEADER RA
var raRow = document.createElement('tr')

var raCell = document.createElement('th')
raCell.innerHTML = "Player"
raRow.appendChild(raCell)

raCell = document.createElement('th')
raCell.innerHTML = "Reclamacoes"
raRow.appendChild(raCell)
raCell = document.createElement('th')
raCell.innerHTML = "Respostas"
raRow.appendChild(raCell)
raCell = document.createElement('th')
raCell.innerHTML = "Nota"
raRow.appendChild(raCell)
raCell = document.createElement('th')
raCell.innerHTML = "Indice de Sol."
raRow.appendChild(raCell)
raCell = document.createElement('th')
raCell.innerHTML = "Voltaria"
raRow.appendChild(raCell)
raCell = document.createElement('th')
raCell.innerHTML = "Classificacao"
raRow.appendChild(raCell)

raCell = document.createElement('th')
raCell.innerHTML = "Reclamacoes"
raRow.appendChild(raCell)
raCell = document.createElement('th')
raCell.innerHTML = "Respostas"
raRow.appendChild(raCell)
raCell = document.createElement('th')
raCell.innerHTML = "Nota"
raRow.appendChild(raCell)
raCell = document.createElement('th')
raCell.innerHTML = "Indice de Sol."
raRow.appendChild(raCell)
raCell = document.createElement('th')
raCell.innerHTML = "Voltaria"
raRow.appendChild(raCell)
raCell = document.createElement('th')
raCell.innerHTML = "Classificacao"
raRow.appendChild(raCell)

raBody.appendChild(raRow)
ebitBody.appendChild(ebitRow)

var styles = document.createElement('style')
styles.innerHTML = ".pr table {display: block;font-family: sans-serif;-webkit-font-smoothing: antialiased;font-size: 80%;overflow: auto;width: auto; margin: 0px; border-collapse: collapse; text-align: center; } .pr th { background-color: rgb(112, 196, 105); color: white; font-weight: normal; padding: 10px 15px; text-align: center; } .pr td { background-color: rgb(238, 238, 238); color: rgb(111, 111, 111); padding: 0px 1px; } nav {display: none !important;}"
raTable.className = "pr"
ebitTable.className = "pr"
document.body.innerHTML = ""
document.head.appendChild(styles)
document.body.appendChild(raTable)
document.body.appendChild(ebitTable)

function PrintEbit(Nome, Classificacao, Prazo, Compraria, Indicaria) {
    var ebitRow = document.createElement('tr')
    var ebitCell = document.createElement('td')
    ebitCell.innerHTML = Nome
    ebitRow.appendChild(ebitCell)
    ebitCell = document.createElement('td')
    ebitCell.innerHTML = Classificacao
    ebitRow.appendChild(ebitCell)
    ebitCell = document.createElement('td')
    ebitCell.innerHTML = Prazo.toFixed(2).replace(".", ",") + "%"
    ebitRow.appendChild(ebitCell)
    ebitCell = document.createElement('td')
    ebitCell.innerHTML = Compraria.toFixed(2).replace(".", ",") + "%"
    ebitRow.appendChild(ebitCell)
    ebitCell = document.createElement('td')
    ebitCell.innerHTML = Indicaria.toFixed(2).replace(".", ",") + "%"
    ebitRow.appendChild(ebitCell)
    ebitBody.appendChild(ebitRow)
}

function PrintRA(nome,
    r12nRec, r12nResp, r12nota, r12indSol, r12volFazNeg, r12rank,
    r6nRec, r6nResp, r6nota, r6indSol, r6volFazNeg, r6rank
) {
    var raRow = document.createElement('tr')

    var raCell = document.createElement('td')
    raCell.innerHTML = nome
    raRow.appendChild(raCell)

    raCell = document.createElement('td')
    raCell.innerHTML = r12nRec
    raRow.appendChild(raCell)
    raCell = document.createElement('td')
    raCell.innerHTML = r12nResp
    raRow.appendChild(raCell)
    raCell = document.createElement('td')
    raCell.innerHTML = r12nota.toFixed(2).replace(".", ",")
    raRow.appendChild(raCell)
    raCell = document.createElement('td')
    raCell.innerHTML = r12indSol.toFixed(2).replace(".", ",") + "%"
    raRow.appendChild(raCell)
    raCell = document.createElement('td')
    raCell.innerHTML = r12volFazNeg.toFixed(2).replace(".", ",") + "%"
    raRow.appendChild(raCell)
    raCell = document.createElement('td')
    raCell.innerHTML = r12rank.replace("GREAT", "OTIMA").replace("GOOD", "BOM").replace("BAD", "RUIM").replace("NOT_RECOMMENDED", "NAO RECOMENDADO")
    raRow.appendChild(raCell)

    raCell = document.createElement('td')
    raCell.innerHTML = r6nRec
    raRow.appendChild(raCell)
    raCell = document.createElement('td')
    raCell.innerHTML = r6nResp
    raRow.appendChild(raCell)
    raCell = document.createElement('td')
    raCell.innerHTML = r6nota.toFixed(2).replace(".", ",")
    raRow.appendChild(raCell)
    raCell = document.createElement('td')
    raCell.innerHTML = r6indSol.toFixed(2).replace(".", ",") + "%"
    raRow.appendChild(raCell)
    raCell = document.createElement('td')
    raCell.innerHTML = r6volFazNeg.toFixed(2).replace(".", ",") + "%"
    raRow.appendChild(raCell)
    raCell = document.createElement('td')
    raCell.innerHTML = r6rank.replace("GREAT", "OTIMA").replace("GOOD", "BOM").replace("BAD", "RUIM").replace("NOT_RECOMMENDED", "NAO RECOMENDADO")
    raRow.appendChild(raCell)

    raBody.appendChild(raRow)
}


var i = -1

function nextEbitURL() {
    i++
    if (i < urlsEbit.length) {
        getResultsEbit(urlsEbit[i])
    }
}

function forceNextEbit() {
    PrintEbit(nomesEmpresasEbit[i], "", 0, 0, 0)
    nextEbitURL()
}

function getResultsEbit(urlToGetJson) {
    var xhttp = new XMLHttpRequest(); //cria o objeto
    xhttp.open("GET", urlToGetJson, true); //Link
    xhttp.timeout = 10000; //10 segundos para timeout
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) { //Status OK:
            //Lê o JSON
            var objJson = JSON.parse(JSON.parse(this.responseText))
            if (objJson.result == true) {
                PrintEbit(
                    objJson.Data.nome_fantasia,
                    objJson.Data.medalha,
                    objJson.Data.estatisticas[0].entrega_pontual,
                    objJson.Data.estatisticas[0].compraria_novamente,
                    objJson.Data.estatisticas[0].indicaria_amigo
                )
                nextEbitURL()
            } else {
                forceNextEbit(); //PRÓXIMO!
            }
        }
        if (this.readyState == 4 && this.status != 200) { //Status Outros:
            forceNextEbit(); //PRÓXIMO!
        }
    }
    xhttp.ontimeout = function (e) {
        forceNextEbit(); //PRÓXIMO!
    }
    xhttp.send()
}


function nextRaURL() {
    i++
    if (i < urlsRA.length) {
        getResultsRA(urlsRA[i])
    } else {
        i = -1
        nextEbitURL()
    }
}

function forceNextRA() {
    PrintRA("Erro", "", "", "", "", "", "", "", "", "", "", "", "")
    nextRaURL()
}

function getResultsRA(urlToGetJson) {
    var xhttp = new XMLHttpRequest(); //cria o objeto
    xhttp.open("GET", urlToGetJson, true); //Link
    xhttp.timeout = 10000; //10 segundos para timeout
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) { //Status OK:
            //Lê o JSON
            var objJson = JSON.parse(this.responseText)

            var nome = objJson.company.companyName

            if (objJson.company.companyIndex6Months) {

            }

            let r12 = false
            let r6 = false

            for (var j = 0; j < objJson.indexes.length; j++) {
                if (objJson.indexes[j].type == "TWELVE_MONTHS") {
                    r12 = true
                    var r12nRec = objJson.indexes[j].totalComplains || 0
                    var r12nResp = objJson.indexes[j].totalAnswered || 0
                    var r12nota = objJson.indexes[j].consumerScore || 0
                    var r12indSol = objJson.indexes[j].solvedPercentual || 0
                    var r12volFazNeg = objJson.indexes[j].dealAgainPercentual || 0
                    var r12rank = objJson.indexes[j].status || 0
                }
                if (objJson.indexes[j].type == "SIX_MONTHS") {
                    r6 = true
                    var r6nRec = objJson.indexes[j].totalComplains || 0
                    var r6nResp = objJson.indexes[j].totalAnswered || 0
                    var r6nota = objJson.indexes[j].consumerScore || 0
                    var r6indSol = objJson.indexes[j].solvedPercentual || 0
                    var r6volFazNeg = objJson.indexes[j].dealAgainPercentual || 0
                    var r6rank = objJson.indexes[j].status || 0
                }
            }

            if (r12 === false) {
                r12nRec = 0
                r12nResp = 0
                r12nota = 0
                r12indSol = 0
                r12volFazNeg = 0
                r12rank = "nao encontrado"
            }

            if (r6 === false) {
                r6nRec = 0
                r6nResp = 0
                r6nota = 0
                r6indSol = 0
                r6volFazNeg = 0
                r6rank = "nao encontrado"
            }

            PrintRA(nome,
                r12nRec, r12nResp, r12nota, r12indSol, r12volFazNeg, r12rank,
                r6nRec, r6nResp, r6nota, r6indSol, r6volFazNeg, r6rank
            )
            nextRaURL()
        }
        if (this.readyState == 4 && this.status != 200) { //Status Outros:
            forceNextRA(); //PRÓXIMO!
        }
    }
    xhttp.ontimeout = function (e) {
        forceNextRA(); //PRÓXIMO!
    }
    xhttp.send()
}

nextRaURL()