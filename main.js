// variables
const generalBtn = document.getElementById("genral");
const businessBtn = document.getElementById("business");
const sportsBtn = document.getElementById("sport");
const entertainmentBtn = document.getElementById("entertainment");
const technologyBtn = document.getElementById("technology");
const searchBtn = document.getElementById("searchBtn");
const newsQuery = document.getElementById("newsQuery");
const newsType = document.getElementById("newsType");
const newsdetails = document.getElementById("newsdetails");

// Array
var newsDataArr = [];

// apis 
const API_KEY = "7c8b3a31c47d4b1ca1da08f12220b0bd";
const HEADLINES_NEWS = "https://newsapi.org/v2/top-headlines?country=ar&category=health&apiKey=";
const GENERAL_NEWS = "https://newsapi.org/v2/top-headlines?sources=google-news-ar&apiKey=";
const BUSINESS_NEWS = "https://newsapi.org/v2/top-headlines?country=ar&category=business&apiKey=";
const SPORTS_NEWS = "https://newsapi.org/v2/top-headlines?country=ar&category=sports&apiKey=";
const ENTERTAINMENT_NEWS = "https://newsapi.org/v2/top-headlines?country=ar&category=entertainment&apiKey=";
const TECHNOLOGY_NEWS = "https://newsapi.org/v2/top-headlines?country=ar&category=technology&apiKey=";
const SEARCH_NEWS = "https://newsapi.org/v2/everything?q=";

window.onload = function () {
  newsType.innerHTML = "<h1>Títulos</h1>";
  fetchHeadlines();
};

generalBtn.addEventListener("click", function () {
  newsType.innerHTML = "<h1>General</h1>";
  fetchGeneralNews();
});

businessBtn.addEventListener("click", function () {
  newsType.innerHTML = "<h1>Economía</h1>";
  fetchBusinessNews();
});

sportsBtn.addEventListener("click", function () {
  newsType.innerHTML = "<h1>Deportes</h1>";
  fetchSportsNews();
});

entertainmentBtn.addEventListener("click", function () {
  newsType.innerHTML = "<h1>Entretenimiento</h1>";
  fetchEntertainmentNews();
});

technologyBtn.addEventListener("click", function () {
  newsType.innerHTML = "<h1>Tecnoligía</h1>";
  fetchTechnologyNews();
});

searchBtn.addEventListener("click", function () {
  newsType.innerHTML = "<h1>" + newsQuery.value + "</h1>";
  fetchQueryNews();
});

const fetchHeadlines = async () => {
  const response = await fetch(HEADLINES_NEWS + API_KEY);
  newsDataArr = [];
  if (response.status >= 200 && response.status < 300) {
    const myJson = await response.json();
    newsDataArr = myJson.articles;
  } else {
    console.log(response.status, response.statusText);
    newsdetails.innerHTML = "<h5>No data found.</h5>"
    return;
  }

  displayNews();
}

const fetchGeneralNews = async () => {
  const response = await fetch(GENERAL_NEWS + API_KEY);
  newsDataArr = [];
  if (response.status >= 200 && response.status < 300) {
    const myJson = await response.json();
    newsDataArr = myJson.articles;
  } else {
    console.log(response.status, response.statusText);
    newsdetails.innerHTML = "<h5>No data found.</h5>"
    return;
  }

  displayNews();
}

const fetchBusinessNews = async () => {
  const response = await fetch(BUSINESS_NEWS + API_KEY);
  newsDataArr = [];
  if (response.status >= 200 && response.status < 300) {
    const myJson = await response.json();
    newsDataArr = myJson.articles;
  } else {
    console.log(response.status, response.statusText);
    newsdetails.innerHTML = "<h5>No data found.</h5>"
    return;
  }

  displayNews();
}

const fetchEntertainmentNews = async () => {
  const response = await fetch(ENTERTAINMENT_NEWS + API_KEY);
  newsDataArr = [];
  if (response.status >= 200 && response.status < 300) {
    const myJson = await response.json();
    console.log(myJson);
    newsDataArr = myJson.articles;
  } else {
    console.log(response.status, response.statusText);
    newsdetails.innerHTML = "<h5>No data found.</h5>"
    return;
  }

  displayNews();
}

const fetchSportsNews = async () => {
  const response = await fetch(SPORTS_NEWS + API_KEY);
  newsDataArr = [];
  if (response.status >= 200 && response.status < 300) {
    const myJson = await response.json();
    newsDataArr = myJson.articles;
  } else {
    console.log(response.status, response.statusText);
    newsdetails.innerHTML = "<h5>No data found.</h5>"
    return;
  }

  displayNews();
}

const fetchTechnologyNews = async () => {
  const response = await fetch(TECHNOLOGY_NEWS + API_KEY);
  newsDataArr = [];
  if (response.status >= 200 && response.status < 300) {
    const myJson = await response.json();
    newsDataArr = myJson.articles;
  } else {
    console.log(response.status, response.statusText);
    newsdetails.innerHTML = "<h5>No data found.</h5>"
    return;
  }

  displayNews();
}

const fetchQueryNews = async () => {

  if (newsQuery.value == null)
    return;

  const response = await fetch(SEARCH_NEWS + encodeURIComponent(newsQuery.value) + "&apiKey=" + API_KEY);
  newsDataArr = [];
  if (response.status >= 200 && response.status < 300) {
    const myJson = await response.json();
    newsDataArr = myJson.articles;
  } else {
    //error handle
    console.log(response.status, response.statusText);
    newsdetails.innerHTML = "<h5>No data found.</h5>"
    return;
  }

  displayNews();
}

function displayNews() {

  newsdetails.innerHTML = "";
  
  newsDataArr.forEach(news => {

    var date = news.publishedAt.split("T");

    var col = document.createElement('div');
    col.className = "card-news";
    

    var card = document.createElement('div');
    card.className = "p-2";

    var image = document.createElement('img');
    image.setAttribute("height", "100%");
    image.setAttribute("width", "100%");
    image.src = news.urlToImage;

    var cardBody = document.createElement('div');

    var newsHeading = document.createElement('h3');
    newsHeading.className = "card-title";
    newsHeading.innerHTML = news.title;

    var dateHeading = document.createElement('h5');
    dateHeading.className = "text-primary";
    dateHeading.innerHTML = date[0];

    var discription = document.createElement('p');
    discription.className = "text-muted";
    discription.innerHTML = news.description;

    var link = document.createElement('a');
    link.className = "btn-info";
    link.setAttribute("target", "_blank");
    link.href = news.url;
    link.innerHTML = "Leer más";

    cardBody.appendChild(newsHeading);
    cardBody.appendChild(dateHeading);
    cardBody.appendChild(discription);
    cardBody.appendChild(link);

    card.appendChild(image);
    card.appendChild(cardBody);

    col.appendChild(card);

    newsdetails.appendChild(col);
  });

}