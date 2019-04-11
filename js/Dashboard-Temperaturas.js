//Chave API OpenWeatherMap
var apixuApiKey = "";
var lastRun = new Date();

//valores
var values = [];

//lista de cidades
var cityList = ["Rio Branco", "Maceio", "Macapa", "Manaus", "Salvador", "Fortaleza", "Brasilia", "Vitoria", "Goiania", "São Luis", "Cuiaba", "Campo Grande", "Belo Horizonte", "Belem", "Joao Pessoa", "Curitiba", "Recife", "Teresina", "Rio de Janeiro", "Natal", "Porto Alegre", "Porto Velho", "Boa Vista", "Florianopolis", "Sao Paulo", "Aracaju", "Palmas"]

//Estruturas das informações
function rowInfo() {
  this.city = "";
  this.minTodayTemp = 0;
  this.minTomorrowTemp = 0;
  this.minWeekTemp = 0;
  this.maxTodayTemp = 0;
  this.maxTomorrowTemp = 0;
  this.maxWeekTemp = 0;
}

//Atualiza os valores nos elementos da pagina
function updateDisplay() {
  //Sort customizado para os valores (sort por temperaturas minimas de hoje)
  values.sort(function (a, b) {
    return a.minTodayTemp - b.minTodayTemp;
  })

  //coloca as informações nos campos
  for (var i = 0; i <= 2; i++) {
    document.getElementById("row" + i + "city").innerHTML = values[values.length - 1 - i].city
    document.getElementById("row" + i + "temp1").innerHTML = Math.round(values[values.length - 1 - i].minTodayTemp) + "° / " + Math.round(values[values.length - 1 - i].maxTodayTemp) + "°"
    document.getElementById("row" + i + "temp2").innerHTML = Math.round(values[values.length - 1 - i].minTomorrowTemp) + "° / " + Math.round(values[values.length - 1 - i].maxTomorrowTemp) + "°"
    document.getElementById("row" + i + "temp3").innerHTML = Math.round(values[values.length - 1 - i].minWeekTemp) + "° / " + Math.round(values[values.length - 1 - i].maxWeekTemp) + "°"
  }
  for (var i = 0; i <= 2; i++) {
    document.getElementById("row" + (i + 3) + "city").innerHTML = values[i].city
    document.getElementById("row" + (i + 3) + "temp1").innerHTML = Math.round(values[i].minTodayTemp) + "° / " + Math.round(values[i].maxTodayTemp) + "°"
    document.getElementById("row" + (i + 3) + "temp2").innerHTML = Math.round(values[i].minTomorrowTemp) + "° / " + Math.round(values[i].maxTomorrowTemp) + "°"
    document.getElementById("row" + (i + 3) + "temp3").innerHTML = Math.round(values[i].minWeekTemp) + "° / " + Math.round(values[i].maxWeekTemp) + "°"
  }

  //Display
  document.getElementById("updateDate").innerHTML = lastRun.toLocaleString("pt-br");
}



function weatherQueryControl() {
  console.log("Try Weather query at ", new Date().toLocaleString("pt-br"))
  if (isWorkingHours()) {
    console.log("OK, running Weather query");
    values = [];
    for (var i = 0; i < 27; i++) {
      requestWeather(cityList[i]);
    }
  } else {
    console.log("Weather denied");
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
var weatherInterval;

//retorna o proximo intervalo
function nextInterval() {
  var next;
  clearInterval(weatherInterval);
  console.log("next set to 07:00h");
  next = getMillisTillTime(7, 0);
  weatherInterval = setInterval(weatherQueryControl, next);
}

//inicia as consultas
weatherQueryControl(); //Consulta inicial

//calcula o intervalo necessario até o proximo horario
function getMillisTillTime(hour, minute) {
  var now = new Date();
  var millisTillTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute, 0, 0) - now;
  if (millisTillTime < 0) {
    millisTillTime += 86400000; // it's after 10am, try 10am tomorrow.
  }
  return millisTillTime
}

//################## WEATHER DATA ####################
//pedir a previsao do clima do dia para a cidade especificada pelo index do array de cidades
function requestWeather(city) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {

      //salva os dados do clima na variavel
      var index = values.push(new rowInfo()) - 1;
      weatherData = JSON.parse(this.responseText);

      values[index].city = city;
      values[index].maxTodayTemp = weatherData.forecast.forecastday[0].day.maxtemp_c;
      values[index].maxTomorrowTemp = weatherData.forecast.forecastday[1].day.maxtemp_c;
      values[index].maxWeekTemp = weatherData.forecast.forecastday[6].day.maxtemp_c;
      values[index].minTodayTemp = weatherData.forecast.forecastday[0].day.mintemp_c;
      values[index].minTomorrowTemp = weatherData.forecast.forecastday[1].day.mintemp_c;
      values[index].minWeekTemp = weatherData.forecast.forecastday[6].day.mintemp_c;

      //console.log(city, weatherData.forecast.forecastday[0].day.maxtemp_c, weatherData.forecast.forecastday[1].day.maxtemp_c, weatherData.forecast.forecastday[7].day.maxtemp_c, weatherData.forecast.forecastday[0].day.mintemp_c, weatherData.forecast.forecastday[1].day.mintemp_c, weatherData.forecast.forecastday[7].day.mintemp_c, checkIfCanUpdate());
      checkIfCanUpdate();
    }
  };

  //Faz a requisição
  xhttp.open("GET", "http://api.apixu.com/v1/forecast.json?key=" + apixuApiKey + "&q=" + city + ",br&days=8", true);
  xhttp.send();
}


//Tenta atualizar os valores na tela
function checkIfCanUpdate() {
  var shouldUpdate = values.length == 27;

  if (shouldUpdate) {
    lastRun = new Date()
    updateDisplay()
  }
}