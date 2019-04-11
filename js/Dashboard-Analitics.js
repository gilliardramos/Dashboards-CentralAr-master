//View ID (Esse numero está disponivel no account explorer do GA: https://ga-dev-tools.appspot.com/account-explorer/)
var VIEW_ID = '8648031';
var lastRun = new Date();

//Guarda os elementos da pagina em uma estrutura mais facil de acessar
var elements = {
    sessions: {
        current: document.getElementById("sessionsCurrent"),
        prevYear: document.getElementById("sessionsPrevYear"),
        prevMonth: document.getElementById("sessionsPrevMonth"),
        prevDay: document.getElementById("sessionsPrevDay")
    },
    transactions: {
        current: document.getElementById("transactionsCurrent"),
        prevYear: document.getElementById("transactionsPrevYear"),
        prevMonth: document.getElementById("transactionsPrevMonth"),
        prevDay: document.getElementById("transactionsPrevDay")
    },
    conversion: {
        current: document.getElementById("conversionCurrent"),
        min: document.getElementById("conversionMin"),
        max: document.getElementById("conversionMax"),
        prevYear: document.getElementById("conversionPrevYear"),
        prevMonth: document.getElementById("conversionPrevMonth"),
        prevDay: document.getElementById("conversionPrevDay")
    },
    city: [
        document.getElementById("city1"),
        document.getElementById("city2"),
        document.getElementById("city3"),
        document.getElementById("city4"),
        document.getElementById("city5"),
        document.getElementById("city6"),
        document.getElementById("city7")
    ],
    display: {
        updateDate: document.getElementById("updateDate"),
    }
}

//valores
var values = {
    sessions: {
        current: 0,
        prevYear: 0,
        prevMonth: 0,
        prevDay: 0,
    },
    transactions: {
        current: 0,
        prevYear: 0,
        prevMonth: 0,
        prevDay: 0,
    },
    conversion: {
        current: 0,
        min: 100,
        max: 0,
        prevYear: 0,
        prevMonth: 0,
        prevDay: 0,
    },
    city: [
        new city(),
        new city(),
        new city(),
        new city(),
        new city(),
        new city(),
        new city()
    ]
};

//Estrutura da linha de cada cidade
function city() {
    this.name = "";
    this.sessions = 0;
    this.transactions = 0;
    this.conversion = 0;
    this.revenue = 0;
    this.TKM = 0;
}

//Atualiza os valores nos elementos da pagina
function updateDisplay() {
    //--------------------VALORES
    //Sessões
    elements.sessions.current.innerHTML = values.sessions.current.toLocaleString("pt-br");
    elements.sessions.prevDay.innerHTML = values.sessions.prevDay.toLocaleString("pt-br");
    elements.sessions.prevMonth.innerHTML = values.sessions.prevMonth.toLocaleString("pt-br");
    elements.sessions.prevYear.innerHTML = values.sessions.prevYear.toLocaleString("pt-br");
    //conversão
    elements.conversion.current.innerHTML = values.conversion.current.toLocaleString("pt-br", {
        style: "percent",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    elements.conversion.min.innerHTML = values.conversion.min.toLocaleString("pt-br", {
        style: "percent",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    elements.conversion.max.innerHTML = values.conversion.max.toLocaleString("pt-br", {
        style: "percent",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    elements.conversion.prevDay.innerHTML = values.conversion.prevDay.toLocaleString("pt-br", {
        style: "percent",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    elements.conversion.prevMonth.innerHTML = values.conversion.prevMonth.toLocaleString("pt-br", {
        style: "percent",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    elements.conversion.prevYear.innerHTML = values.conversion.prevYear.toLocaleString("pt-br", {
        style: "percent",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    //Transações
    elements.transactions.current.innerHTML = values.transactions.current.toLocaleString("pt-br");
    elements.transactions.prevDay.innerHTML = values.transactions.prevDay.toLocaleString("pt-br");
    elements.transactions.prevMonth.innerHTML = values.transactions.prevMonth.toLocaleString("pt-br");
    elements.transactions.prevYear.innerHTML = values.transactions.prevYear.toLocaleString("pt-br");
    //cidades
    for (var i = 0; i < elements.city.length; i++) {
        var element = elements.city[i];
        element.children[0].innerHTML = i + 1
        element.children[1].innerHTML = values.city[i].name;
        element.children[2].innerHTML = values.city[i].sessions.toLocaleString("pt-br");
        element.children[3].innerHTML = values.city[i].transactions.toLocaleString("pt-br");
        element.children[4].innerHTML = values.city[i].conversion.toLocaleString("pt-br", {
            style: "percent",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
        element.children[5].innerHTML = values.city[i].revenue.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL"
        });
        element.children[6].innerHTML = values.city[i].TKM.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL"
        });
    }
    //Display
    elements.display.updateDate.innerHTML = lastRun.toLocaleString("pt-br");

    //------------------ CORES E CARRET UP/DOWN
    /*
        caret up:   &#xf0d8
        caret down: &#xf0d7
    */

    //Carets
    carets = document.getElementsByClassName("percent");
    carets[0].innerHTML = " (" + (values.sessions.current / values.sessions.prevYear - 1).toLocaleString("pt-br", {
        style: "percent"
    }) + ")";
    carets[1].innerHTML = " (" + (values.sessions.current / values.sessions.prevMonth - 1).toLocaleString("pt-br", {
        style: "percent"
    }) + ")";
    carets[2].innerHTML = " (" + (values.sessions.current / values.sessions.prevDay - 1).toLocaleString("pt-br", {
        style: "percent"
    }) + ")";
    carets[3].innerHTML = " (" + (values.transactions.current / values.transactions.prevYear - 1).toLocaleString("pt-br", {
        style: "percent"
    }) + ")";
    carets[4].innerHTML = " (" + (values.transactions.current / values.transactions.prevMonth - 1).toLocaleString("pt-br", {
        style: "percent"
    }) + ")";
    carets[5].innerHTML = " (" + (values.transactions.current / values.transactions.prevDay - 1).toLocaleString("pt-br", {
        style: "percent"
    }) + ")";
    carets[6].innerHTML = " (" + (values.conversion.current / values.conversion.prevYear - 1).toLocaleString("pt-br", {
        style: "percent"
    }) + ")";
    carets[7].innerHTML = " (" + (values.conversion.current / values.conversion.prevMonth - 1).toLocaleString("pt-br", {
        style: "percent"
    }) + ")";
    carets[8].innerHTML = " (" + (values.conversion.current / values.conversion.prevDay - 1).toLocaleString("pt-br", {
        style: "percent"
    }) + ")";

    //cores
    for (var i = 0; i < carets.length; i++) {
        var caret = carets[i];
        switchClasses(caret, caret.innerHTML.search("-") == -1);
    }

}

//diminui a quantidade de codigos que preciso digitar.. e facilita a leitura tambem
function switchClasses(element, isPositive) {
    if (isPositive) {
        element.classList.add("text-success");
        element.classList.remove("text-danger")
    } else {
        element.classList.add("text-danger");
        element.classList.remove("text-success")

    }
}

//################## GOOGLE ANALYTICS ####################


//Controle de execução, evita rodar consultas na API fora do horario de trabalho
//GA
function gaQueryControl() {
    console.log("Try GA query at ", new Date().toLocaleString("pt-br"))
    if (isWorkingHours()) {
        console.log("OK, running GA query");
        queryReports();
    } else {
        console.log("GA denied");
    }
}

//Verifica se estamos dentro do horario de trabalho
function isWorkingHours() {
    var now = new Date();
    if (now.getDay() != 0 && now.getDay() != 6 && //se nao é domingo ou sabado
        ((now.getHours() >= 7 && now.getHours() < 12) || (now.getHours() >= 13 && now.getHours() < 18))) { //Dentro do horario de trabalho
        return true
    } else {
        return false
    }
}

//Variaveis de intervalo, caso queria parar manualmente o intervalo de atualização
var gaInterval;

// Esconde o botao de log-in e inicia as consultas
function hideLoginButton() {
    document.getElementById("btnLogin").hidden = true;

    gaQueryControl(); //Consulta inicial no GA
    gaInterval = setInterval(gaQueryControl, 600000); //A cada 10 minutos
}

//Primeiramente, pesquisa no ano aterior e no mes anterior
function queryReports() {
    gapi.client.request({
        path: '/v4/reports:batchGet',
        root: 'https://analyticsreporting.googleapis.com/',
        method: 'POST',
        body: {
            reportRequests: [{
                viewId: VIEW_ID,
                dateRanges: [{
                        startDate: '365daysAgo',
                        endDate: '365daysAgo'
                    }, {
                        startDate: '28daysAgo',
                        endDate: '28daysAgo'
                    }

                ],
                metrics: [{
                    expression: 'ga:sessions'
                }, {
                    expression: 'ga:transactions'
                }]
            }]
        }
    }).then(monthYearResults, console.error.bind(console));
}

//Resultados da consulta do ano e mes passado 
function monthYearResults(response) {

    //Grava nas variaveis
    values.sessions.prevYear = eval(response.result.reports[0].data.totals[0].values[0]);
    values.transactions.prevYear = eval(response.result.reports[0].data.totals[0].values[1]);
    values.conversion.prevYear = eval(values.transactions.prevYear / values.sessions.prevYear);
    values.sessions.prevMonth = eval(response.result.reports[0].data.totals[1].values[0]);
    values.transactions.prevMonth = eval(response.result.reports[0].data.totals[1].values[1]);
    values.conversion.prevMonth = eval(values.transactions.prevMonth / values.sessions.prevMonth);

    //Consulta o dia de ontem e hoje
    gapi.client.request({
        path: '/v4/reports:batchGet',
        root: 'https://analyticsreporting.googleapis.com/',
        method: 'POST',
        body: {
            reportRequests: [{
                viewId: VIEW_ID,
                dateRanges: [{
                        startDate: 'yesterday',
                        endDate: 'yesterday'
                    }, {
                        startDate: 'today',
                        endDate: 'today'
                    }

                ],
                metrics: [{
                    expression: 'ga:sessions'
                }, {
                    expression: 'ga:transactions'
                }]
            }]
        }
    }).then(yesterdayTodayResults, console.error.bind(console));
}

//Resultado de ontem e hoje
function yesterdayTodayResults(response) {

    //Salva as respostas do GA nas variaveis
    values.sessions.prevDay = eval(response.result.reports[0].data.totals[0].values[0]);
    values.transactions.prevDay = eval(response.result.reports[0].data.totals[0].values[1]);
    values.conversion.prevDay = eval(values.transactions.prevDay / values.sessions.prevDay);
    values.sessions.current = eval(response.result.reports[0].data.totals[1].values[0]);
    values.transactions.current = eval(response.result.reports[0].data.totals[1].values[1]);
    values.conversion.current = eval(values.transactions.current / values.sessions.current);

    //Reseta o minimo e maximo da conversão quando troca o dia
    if (new Date().getDate != lastRun.getDate) {
        console.log("Dia fechado, conversão min e max do dia " + lastRun.getDate + ": ", values.conversion.min, values.conversion.max)
        values.conversion.min = 100;
        values.conversion.max = 0;
    }

    //Calcula o novo minimo e maximo
    values.conversion.min = values.conversion.min == 0 ? 100 : values.conversion.min;
    values.conversion.min = eval(Math.min(values.conversion.current, values.conversion.min));
    values.conversion.max = eval(Math.max(values.conversion.current, values.conversion.max));

    //Consulta os dados da cidade (Tabela no fim da pagina)
    gapi.client.request({
        path: '/v4/reports:batchGet',
        root: 'https://analyticsreporting.googleapis.com/',
        method: 'POST',
        body: {
            reportRequests: [{
                viewId: VIEW_ID,
                pageToken: "0",
                pageSize: "7",

                dateRanges: [{
                    startDate: '30daysAgo',
                    endDate: 'today'
                }],

                metrics: [{
                    expression: 'ga:sessions'
                }, {
                    expression: 'ga:transactions'
                }, {
                    expression: 'ga:transactionRevenue'
                }],

                dimensions: [{
                    "name": "ga:city"
                }],
                "dimensionFilterClauses": [{
                    "operator": "OR",
                    "filters": [{
                        "dimensionName": "ga:city",
                        "not": true,
                        "operator": "EXACT",
                        "expressions": [
                            "(not set)"
                        ],
                        "caseSensitive": false,
                    }]
                }],

                orderBys: [{
                    "fieldName": "ga:transactionRevenue",
                    "sortOrder": "DESCENDING"
                }, ]
            }]
        }
    }).then(cityResults, console.error.bind(console));
}

//Resposta sobre as cidades
function cityResults(response) {

    //para cada linha da coluna
    for (var i = 0; i < 7; i++) {
        var dados = response.result.reports[0].data.rows[i];

        //Salva a respota do GA nas variaveis
        values.city[i].name = dados.dimensions[0];
        values.city[i].sessions = eval(dados.metrics[0].values[0]);
        values.city[i].transactions = eval(dados.metrics[0].values[1]);
        values.city[i].conversion = eval(dados.metrics[0].values[1] / dados.metrics[0].values[0]);
        values.city[i].revenue = eval(dados.metrics[0].values[2]);
        values.city[i].TKM = eval(dados.metrics[0].values[2] / dados.metrics[0].values[1]);

        //Tenta atualizar os valores na tela
        checkIfCanUpdate();
    }
}

//Tenta atualizar os valores na tela
function checkIfCanUpdate() {
    var shouldUpdate = true;
    //Se ja coletamos tudo, atualize os valores
    if (shouldUpdate) {
        lastRun = new Date()
        updateDisplay()
    }
}