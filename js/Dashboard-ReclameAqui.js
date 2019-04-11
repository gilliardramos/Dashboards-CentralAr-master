var lastRun = new Date();

var elements = {
    updateDate: document.getElementById("updateDate"),
    m6: {
        complaints: document.getElementById("m6complaints"),
        icon: document.getElementById("m6icon"),
        score: document.getElementById("m6score"),
        reply: document.getElementById("m6reply"),
        replyChart: document.getElementById("m6replyChart"),
        dealAgain: document.getElementById("m6dealAgain"),
        dealAgainChart: document.getElementById("m6dealAgainChart"),
        solved: document.getElementById("m6solved"),
        solvedChart: document.getElementById("m6solvedChart"),
    },
    m12: {
        complaints: document.getElementById("m12complaints"),
        icon: document.getElementById("m12icon"),
        score: document.getElementById("m12score"),
        reply: document.getElementById("m12reply"),
        replyChart: document.getElementById("m12replyChart"),
        dealAgain: document.getElementById("m12dealAgain"),
        dealAgainChart: document.getElementById("m12dealAgainChart"),
        solved: document.getElementById("m12solved"),
        solvedChart: document.getElementById("m12solvedChart")
    }
}

//Atualiza os valores nos elementos da pagina
function updateDisplay(RAData) {
    var m6Data;
    var m12Data;
    for (var i = 0; i < RAData.indexes.length; i++) {
        if (RAData.indexes[i].type == "TWELVE_MONTHS") {
            m12Data = RAData.indexes[i];
        }
        if (RAData.indexes[i].type == "SIX_MONTHS") {
            m6Data = RAData.indexes[i];
        }
    }
    //Numeros
    elements.m6.complaints.innerHTML = m6Data.totalComplains.toLocaleString("pt-br");
    elements.m12.complaints.innerHTML = m12Data.totalComplains.toLocaleString("pt-br");

    elements.m6.score.innerHTML = m6Data.consumerScore.toLocaleString("pt-br");
    elements.m12.score.innerHTML = m12Data.consumerScore.toLocaleString("pt-br");
    setClass(elements.m6.score, m6Data.consumerScore, 7);
    setClass(elements.m12.score, m12Data.consumerScore, 7);

    //Selo / Icones
    elements.m6.icon.innerHTML = "<img src='img/reclameAqui/" + m6Data.status + ".png'>";
    elements.m12.icon.innerHTML = "<img src='img/reclameAqui/" + m12Data.status + ".png'>";

    //Graficos
    elements.m6.reply.innerHTML = Math.round(m6Data.answeredPercentual) + "%";
    elements.m6.dealAgain.innerHTML = Math.round(m6Data.dealAgainPercentual) + "%";
    elements.m6.solved.innerHTML = Math.round(m6Data.solvedPercentual) + "%";
    elements.m12.reply.innerHTML = Math.round(m12Data.answeredPercentual) + "%";
    elements.m12.dealAgain.innerHTML = Math.round(m12Data.dealAgainPercentual) + "%";
    elements.m12.solved.innerHTML = Math.round(m12Data.solvedPercentual) + "%";

    createGraph(elements.m6.replyChart, m6Data.answeredPercentual, 90);
    createGraph(elements.m6.dealAgainChart, m6Data.dealAgainPercentual, 70);
    createGraph(elements.m6.solvedChart, m6Data.solvedPercentual, 90);
    createGraph(elements.m12.replyChart, m12Data.answeredPercentual, 90);
    createGraph(elements.m12.dealAgainChart, m12Data.dealAgainPercentual, 70);
    createGraph(elements.m12.solvedChart, m12Data.solvedPercentual, 90);

    //Display
    document.getElementById("updateDate").innerHTML = lastRun.toLocaleString("pt-br");
}

function setClass(element, value, goal) {
    value < goal ? element.classList.add("text-danger") : element.classList.remove("text-danger");
}

function reclameAquiQueryControl() {
    console.log("Try ReclameAqui query at ", new Date().toLocaleString("pt-br"))
    if (isWorkingHours()) {
        console.log("OK, running ReclameAqui query");
        requestReclameAqui();
    } else {
        console.log("ReclameAqui denied");
    }
    nextInterval();
}

//Verifica se estamos dentro do horario de trabalho (A previsão atualiza em um intervalo especial, somente a cada 4 horas)
function isWorkingHours() {
    var now = new Date();
    if (now.getDay() != 0 && now.getDay() != 6 //se nao é domingo ou sabado
    ) { //Dentro do horario estipulado
        return true
    } else {
        return false
    }
}

//Variaveis de intervalo, caso queria parar manualmente o intervalo de atualização
var reclameAquiInterval;

//retorna o proximo intervalo
function nextInterval() {
    var now = new Date();
    var next;
    clearInterval(reclameAquiInterval);
    if (now.getHours() < 7 || now.getHours() >= 13) {
        console.log("next set to 07:00h");
        next = getMillisTillTime(7, 0);
    } else {
        console.log("next set to 13:00h");
        next = getMillisTillTime(13, 0);
    }
    reclameAquiInterval = setInterval(reclameAquiQueryControl, next);
}

//calcula o intervalo necessario até o proximo horario
function getMillisTillTime(hour, minute) {
    var now = new Date();
    var millisTillTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute, 0, 0) - now;
    if (millisTillTime < 0) {
        millisTillTime += 86400000; // it's after 10am, try 10am tomorrow.
    }
    return millisTillTime
}


//inicia as consultas
reclameAquiQueryControl(); //Consulta inicial

//################## RECLAME AQUI DATA ####################
//pedir a previsao do clima do dia para a cidade especificada pelo index do array de cidades
function requestReclameAqui() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //salva os dados do clima na variavel
            var RAData = JSON.parse(this.responseText);
            lastRun = new Date();
            updateDisplay(RAData);
        }
    };

    //Faz a requisição
    xhttp.open("GET", "https://iosite.reclameaqui.com.br/raichu-io-site-0.0.1-SNAPSHOT/company/11128/compare", true);
    xhttp.send();
}


function createGraph(element, value, minimo) {
    var cor = value >= minimo ? 'rgba(98, 196, 98, 1)' : 'rgba(238, 95, 91, 1)';

    chartConfig = {
        type: 'pie',
        data: {
            datasets: [{
                backgroundColor: [cor, 'rgba(39, 43, 48, 1)'],
                hoverBackgroundColor: [cor, 'rgba(39, 43, 48, 1)'],
                borderWidth: [0, 0],
                data: [value, 100 - value],
            }]
        },
        options: {
            cutoutPercentage: 80,
            animation: {
                animateRotate: false,
                animateScale: false,
            }
        }
    };
    var myPieChart = new Chart(element, chartConfig);
}