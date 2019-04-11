//BOoooooraaa
//BIRL
//Chave API OpenWeatherMap
var lastRun = 0

//variavel auxilar para ajudar a montar a estrutura,
function reportStruct() {
  this.today = {
    sessions: 0,
    transactions: 0,
    conversion: 0
  }
  this.yesterday = {
    sessions: 0,
    transactions: 0,
    conversion: 0
  }
  this.yesteryear = {
    sessions: 0,
    transactions: 0,
    conversion: 0
  }
}

//criamos um vetor de 24 indices com a estrutura acima
var values = []
for (var i = 0; i < 24; i++) {
  values.push(new reportStruct())
}
var accumValues = []
for (var i = 0; i < 24; i++) {
  accumValues.push(new reportStruct())
}

//Guarda os elementos da pagina em uma estrutura mais facil de acessar
var updateDate = document.getElementById("updateDate")


//################## GOOGLE ANALYTICS ####################
//View ID (Esse numero está disponivel no account explorer do GA: https://ga-dev-tools.appspot.com/account-explorer/)
var VIEW_ID = '8648031'

//Variaveis de intervalo, caso queria parar manualmente o intervalo de atualização
var gaInterval

//Controle de execução, evita rodar consultas na API fora do horario de trabalho
function gaQueryControl() {
  console.log("Try GA query at ", new Date().toLocaleString("pt-br"))
  if (isWorkingHours()) {
    console.log("OK, running GA query")
    getToday()
  } else {
    console.log("gaQueryControl denied")
  }
}


//Verifica se estamos dentro do horario de trabalho
function isWorkingHours() {
  var now = new Date()
  if (now.getDay() != 0 && now.getDay() != 6 && //se nao é domingo ou sabado
    ((now.getHours() >= 7 && now.getHours() < 12) || (now.getHours() >= 13 && now.getHours() < 18))) { //Dentro do horario de trabalho
    return true
  } else {
    return false
  }
}

// Esconde o botao de log-in e inicia as consultas
function hideLoginButton() {
  document.getElementById("btnLogin").hidden = true

  gaQueryControl() //Consulta inicial no GA
  gaInterval = setInterval(gaQueryControl, 600000) //A cada 10 minutos
}

//consulta do ano e dia passado
function getAllNewValues() {

  //Consulta o dia de ontem e hoje
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
            startDate: 'yesterday',
            endDate: 'yesterday'
          }

        ],

        metrics: [{
          expression: 'ga:sessions'
        }, {
          expression: 'ga:transactions'
        }],

        dimensions: [{
          "name": "ga:hour"
        }]
      }]
    }
  }).then(processMonthYearResults, console.error.bind(console))
}


function processMonthYearResults(response) {
  //zera tudo
  values = []
  for (var i = 0; i < 24; i++) {
    values.push(new reportStruct())
  }
  accumValues = []
  for (var i = 0; i < 24; i++) {
    accumValues.push(new reportStruct())
  }

  gaData = response.result.reports[0].data

  //primeiro dado (hora 0)
  values[0].yesteryear.sessions = parseInt(gaData.rows[0].metrics[0].values[0])
  values[0].yesteryear.transactions = parseInt(gaData.rows[0].metrics[0].values[1])
  values[0].yesteryear.conversion = values[0].yesteryear.transactions / values[0].yesteryear.sessions * 100

  values[0].yesterday.sessions = parseInt(gaData.rows[0].metrics[1].values[0])
  values[0].yesterday.transactions = parseInt(gaData.rows[0].metrics[1].values[1])
  values[0].yesterday.conversion = values[0].yesterday.transactions / values[0].yesterday.sessions * 100

  accumValues[0].yesteryear.sessions = values[0].yesteryear.sessions
  accumValues[0].yesteryear.transactions = values[0].yesteryear.transactions
  accumValues[0].yesteryear.conversion = values[0].yesteryear.conversion

  accumValues[0].yesterday.sessions = values[0].yesterday.sessions
  accumValues[0].yesterday.transactions = values[0].yesterday.transactions
  accumValues[0].yesterday.conversion = values[0].yesterday.conversion

  //restante (hora 1 a 23)
  for (var i = 1; i < gaData.rows.length; i++) {
    var row = gaData.rows[i];

    values[i].yesteryear.sessions = parseInt(row.metrics[0].values[0])
    values[i].yesteryear.transactions = parseInt(row.metrics[0].values[1])
    values[i].yesteryear.conversion = values[i].yesteryear.transactions / values[i].yesteryear.sessions * 100

    values[i].yesterday.sessions = parseInt(row.metrics[1].values[0])
    values[i].yesterday.transactions = parseInt(row.metrics[1].values[1])
    values[i].yesterday.conversion = values[i].yesterday.transactions / values[i].yesterday.sessions * 100

    accumValues[i].yesteryear.sessions = accumValues[i - 1].yesteryear.sessions + values[i].yesteryear.sessions
    accumValues[i].yesteryear.transactions = accumValues[i - 1].yesteryear.transactions + values[i].yesteryear.transactions
    accumValues[i].yesteryear.conversion = accumValues[i].yesteryear.transactions / accumValues[i].yesteryear.sessions * 100

    accumValues[i].yesterday.sessions = accumValues[i - 1].yesterday.sessions + values[i].yesterday.sessions
    accumValues[i].yesterday.transactions = accumValues[i - 1].yesterday.transactions + values[i].yesterday.transactions
    accumValues[i].yesterday.conversion = accumValues[i].yesterday.transactions / accumValues[i].yesterday.sessions * 100
  }

  getToday()
}

//consulta do ano e dia passado
function getToday() {
  now = new Date()
  if (lastRun == 0 || lastRun.date !== now.date) {
    lastRun = new Date()
    getAllNewValues()
    return
  }

  //Consulta o dia de ontem e hoje
  gapi.client.request({
    path: '/v4/reports:batchGet',
    root: 'https://analyticsreporting.googleapis.com/',
    method: 'POST',
    body: {
      reportRequests: [{
        viewId: VIEW_ID,
        dateRanges: [{
          startDate: 'today',
          endDate: 'today'
        }],

        metrics: [{
          expression: 'ga:sessions'
        }, {
          expression: 'ga:transactions'
        }],

        dimensions: [{
          "name": "ga:hour"
        }]
      }]
    }
  }).then(processTodayResults, console.error.bind(console))
}

function processTodayResults(response) {
  gaData = response.result.reports[0].data

  //primeiro dado (hora 0)
  values[0].today.sessions = parseInt(gaData.rows[0].metrics[0].values[0])
  values[0].today.transactions = parseInt(gaData.rows[0].metrics[0].values[1])
  values[0].today.conversion = values[0].today.transactions / values[0].today.sessions * 100

  accumValues[0].today.sessions = values[0].today.sessions
  accumValues[0].today.transactions = values[0].today.transactions
  accumValues[0].today.conversion = accumValues[0].today.transactions / accumValues[0].today.sessions * 100

  //Acumula o restante (hora 1 a 23)
  for (var i = 1; i < gaData.rows.length; i++) {
    var row = gaData.rows[i];

    values[i].today.sessions = parseInt(row.metrics[0].values[0])
    values[i].today.transactions = parseInt(row.metrics[0].values[1])
    values[i].today.conversion = values[i].today.transactions / values[i].today.sessions * 100

    accumValues[i].today.sessions = accumValues[i - 1].today.sessions + values[i].today.sessions
    accumValues[i].today.transactions = accumValues[i - 1].today.transactions + values[i].today.transactions
    accumValues[i].today.conversion = accumValues[i].today.transactions / accumValues[i].today.sessions * 100
  }
  updateDisplay()
}


//Atualizar graficos na tela
function updateDisplay() {

  updateDate.innerHTML = lastRun.toLocaleString("pt-br")

  var sessionsChartContext = document.getElementById("sessionsChart").getContext('2d');
  var sessionsChart = new Chart(sessionsChartContext, {
    type: 'line',
    scaleFontColor: '#EEE',
    data: {
      labels: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"],
      datasets: [{
        fill: false,
        label: 'Hoje',
        data: [
          values[0].today.sessions, values[1].today.sessions, values[2].today.sessions, values[3].today.sessions,
          values[4].today.sessions, values[5].today.sessions, values[6].today.sessions, values[7].today.sessions,
          values[8].today.sessions, values[9].today.sessions, values[10].today.sessions, values[11].today.sessions,
          values[12].today.sessions, values[13].today.sessions, values[14].today.sessions, values[15].today.sessions,
          values[16].today.sessions, values[17].today.sessions, values[18].today.sessions, values[19].today.sessions,
          values[20].today.sessions, values[21].today.sessions, values[22].today.sessions, values[23].today.sessions
        ],
        borderColor: 'rgba(41, 182, 246,1)',
        color: '#EEE'
      }, {
        fill: false,
        label: 'Ontem',
        data: [
          values[0].yesterday.sessions, values[1].yesterday.sessions, values[2].yesterday.sessions, values[3].yesterday.sessions,
          values[4].yesterday.sessions, values[5].yesterday.sessions, values[6].yesterday.sessions, values[7].yesterday.sessions,
          values[8].yesterday.sessions, values[9].yesterday.sessions, values[10].yesterday.sessions, values[11].yesterday.sessions,
          values[12].yesterday.sessions, values[13].yesterday.sessions, values[14].yesterday.sessions, values[15].yesterday.sessions,
          values[16].yesterday.sessions, values[17].yesterday.sessions, values[18].yesterday.sessions, values[19].yesterday.sessions,
          values[20].yesterday.sessions, values[21].yesterday.sessions, values[22].yesterday.sessions, values[23].yesterday.sessions
        ],
        borderColor: 'rgba(139, 195, 74,1)',
        color: '#EEE'
      }, {
        fill: false,
        label: 'Ano Passado',
        data: [
          values[0].yesteryear.sessions, values[1].yesteryear.sessions, values[2].yesteryear.sessions, values[3].yesteryear.sessions,
          values[4].yesteryear.sessions, values[5].yesteryear.sessions, values[6].yesteryear.sessions, values[7].yesteryear.sessions,
          values[8].yesteryear.sessions, values[9].yesteryear.sessions, values[10].yesteryear.sessions, values[11].yesteryear.sessions,
          values[12].yesteryear.sessions, values[13].yesteryear.sessions, values[14].yesteryear.sessions, values[15].yesteryear.sessions,
          values[16].yesteryear.sessions, values[17].yesteryear.sessions, values[18].yesteryear.sessions, values[19].yesteryear.sessions,
          values[20].yesteryear.sessions, values[21].yesteryear.sessions, values[22].yesteryear.sessions, values[23].yesteryear.sessions
        ],
        borderColor: 'rgba(255, 202, 40,1)',
        color: '#EEE'
      }]
    },
    options: {
      legend: {
        labels: {
          fontColor: "white",
          fontSize: 18
        }
      },
      scaleFontColor: '#EEE',
      maintainAspectRatio: false,
      responsive: true,
      scales: {
        yAxes: [{
          gridLines: {
            color: "#777"
          },
          ticks: {
            stepSize: 1000,
            beginAtZero: true,
            fontColor: "#EEE"
          }
        }],

        xAxes: [{
          gridLines: {
            display: false
          },
          ticks: {
            fontColor: "#EEE"
          }
        }]
      }
    },
    lineAtIndex: [Math.floor(new Date().getHours())]
  });




  var conversionChartContext = document.getElementById("conversionChart").getContext('2d');
  var conversionChart = new Chart(conversionChartContext, {
    type: 'line',
    scaleFontColor: '#EEE',
    data: {
      labels: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"],
      datasets: [{
        fill: false,
        data: [
          accumValues[0].today.conversion, accumValues[1].today.conversion, accumValues[2].today.conversion, accumValues[3].today.conversion,
          accumValues[4].today.conversion, accumValues[5].today.conversion, accumValues[6].today.conversion, accumValues[7].today.conversion,
          accumValues[8].today.conversion, accumValues[9].today.conversion, accumValues[10].today.conversion, accumValues[11].today.conversion,
          accumValues[12].today.conversion, accumValues[13].today.conversion, accumValues[14].today.conversion, accumValues[15].today.conversion,
          accumValues[16].today.conversion, accumValues[17].today.conversion, accumValues[18].today.conversion, accumValues[19].today.conversion,
          accumValues[20].today.conversion, accumValues[21].today.conversion, accumValues[22].today.conversion, accumValues[23].today.conversion
        ],
        borderColor: 'rgba(41, 182, 246,1)',
        color: '#EEE'
      }, {
        fill: false,
        data: [
          accumValues[0].yesterday.conversion, accumValues[1].yesterday.conversion, accumValues[2].yesterday.conversion, accumValues[3].yesterday.conversion,
          accumValues[4].yesterday.conversion, accumValues[5].yesterday.conversion, accumValues[6].yesterday.conversion, accumValues[7].yesterday.conversion,
          accumValues[8].yesterday.conversion, accumValues[9].yesterday.conversion, accumValues[10].yesterday.conversion, accumValues[11].yesterday.conversion,
          accumValues[12].yesterday.conversion, accumValues[13].yesterday.conversion, accumValues[14].yesterday.conversion, accumValues[15].yesterday.conversion,
          accumValues[16].yesterday.conversion, accumValues[17].yesterday.conversion, accumValues[18].yesterday.conversion, accumValues[19].yesterday.conversion,
          accumValues[20].yesterday.conversion, accumValues[21].yesterday.conversion, accumValues[22].yesterday.conversion, accumValues[23].yesterday.conversion
        ],
        borderColor: 'rgba(139, 195, 74,1)',
        color: '#EEE'
      }, {
        fill: false,
        data: [
          accumValues[0].yesteryear.conversion, accumValues[1].yesteryear.conversion, accumValues[2].yesteryear.conversion, accumValues[3].yesteryear.conversion,
          accumValues[4].yesteryear.conversion, accumValues[5].yesteryear.conversion, accumValues[6].yesteryear.conversion, accumValues[7].yesteryear.conversion,
          accumValues[8].yesteryear.conversion, accumValues[9].yesteryear.conversion, accumValues[10].yesteryear.conversion, accumValues[11].yesteryear.conversion,
          accumValues[12].yesteryear.conversion, accumValues[13].yesteryear.conversion, accumValues[14].yesteryear.conversion, accumValues[15].yesteryear.conversion,
          accumValues[16].yesteryear.conversion, accumValues[17].yesteryear.conversion, accumValues[18].yesteryear.conversion, accumValues[19].yesteryear.conversion,
          accumValues[20].yesteryear.conversion, accumValues[21].yesteryear.conversion, accumValues[22].yesteryear.conversion, accumValues[23].yesteryear.conversion
        ],
        borderColor: 'rgba(255, 202, 40,1)',
        color: '#EEE'
      }]
    },
    options: {
      legend: {
        display: false
      },
      scaleFontColor: '#EEE',
      maintainAspectRatio: false,
      responsive: true,
      scales: {
        yAxes: [{
          gridLines: {
            color: "#777"
          },
          ticks: {
            stepSize: 0.5,
            beginAtZero: true,
            fontColor: "#EEE",
            callback: function (value) {
              return value + "%"
            }
          },
          scaleLabel: {
            display: true,
            labelString: "Percentage"
          }
        }],

        xAxes: [{
          gridLines: {
            display: false
          },
          ticks: {
            fontColor: "#EEE"
          }
        }]
      }
    },
    lineAtIndex: [Math.floor(new Date().getHours())]
  })
}

//Biblioteca extendida para desenhar linhas arbitrarias no grafico
const verticalLinePlugin = {
  getLinePosition: function (chart, pointIndex) {
    const meta = chart.getDatasetMeta(0); // first dataset is used to discover X coordinate of a point
    const data = meta.data;
    return data[pointIndex]._model.x;
  },
  renderVerticalLine: function (chartInstance, pointIndex) {
    const lineLeftOffset = this.getLinePosition(chartInstance, pointIndex);
    const scale = chartInstance.scales['y-axis-0'];
    const context = chartInstance.chart.ctx;

    // render vertical line
    context.beginPath();
    context.strokeStyle = '#fff';
    context.moveTo(lineLeftOffset, scale.top);
    context.lineTo(lineLeftOffset, scale.bottom);
    context.stroke();

  },

  afterDatasetsDraw: function (chart, easing) {
    if (chart.config.lineAtIndex) {
      chart.config.lineAtIndex.forEach(pointIndex => this.renderVerticalLine(chart, pointIndex));
    }
  }
};

Chart.plugins.register(verticalLinePlugin);