document.querySelector('#search').addEventListener('submit', async (event) => {
    event.preventDefault();

    const cityName = document.querySelector('#city-name').value.trim();

    if (!cityName) {
        document.querySelector("#weather").classList.remove('show');
        showAlert('Você precisa digitar uma cidade...');
        return;
    }

    const apiKey = '72d419c10aa82f504d87bb99a275a543';
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(cityName)}&appid=${apiKey}&units=metric&lang=pt_br`;

    try {
        const res = await fetch(forecastUrl);
        const json = await res.json();

        if (json.cod !== "200") {
            document.querySelector("#weather").classList.remove('show');
            showAlert(`
                Não foi possível localizar a cidade "${cityName}".<br>

                <img src="src/images/404.svg"/>
            `);
            return;
        }

        const city = json.city.name;
        const country = json.city.country;

        // aqui o ISOString leva para um formato "YYYY-MM-DDTHH:MM:SSZ" e o split 'T' faz separar em 2 partes, ficando a parte [0] com a data e a parte [1] com a hora
        const today = new Date().toISOString().split('T')[0]; 
        // pega a lista json, cria novo array com o filter pegando as previsões em que o dt_txt da API começa com a data de hoje
        const todayForecasts = json.list.filter(item => item.dt_txt.startsWith(today));

        if (todayForecasts.length === 0) {
            showAlert('Não há dados de previsão para hoje.');
            return;
        }

        // percorre as previsões do dia atual, criando um novo array apenas com as temperaturas
        const temps = todayForecasts.map(item => item.main.temp);
        const tempMin = Math.min(...temps);
        const tempMax = Math.max(...temps);

        // Pega o primeiro item do array, que é a previsão mais próxima do horário atual (API não fornece dados passados)
        const currentData = todayForecasts[0];

        showInfo({
            city: city,
            country: country,
            temp: currentData.main.temp,
            tempMax: tempMax,
            tempMin: tempMin,
            description: currentData.weather[0].description,
            tempIcon: currentData.weather[0].icon,
            windSpeed: currentData.wind.speed,
            humidity: currentData.main.humidity,
        });

        preencherCarousel(json.list);


    } catch (error) {
        console.error(error);
        showAlert('Erro ao buscar dados do clima.');
    }
});

function showInfo(json) {
    showAlert('');

    document.querySelector("#weather").classList.add('show');

    document.querySelector('#title').innerHTML = `${json.city}, ${json.country}`;
    document.querySelector('#temp-value').innerHTML = `${json.temp.toFixed(1).toString().replace('.', ',')} <sup>C°</sup>`;
    document.querySelector('#temp-description').innerHTML = `${json.description}`;
    document.querySelector('#temp-img').setAttribute('src', `https://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
    document.querySelector('#temp-max').innerHTML = `${json.tempMax.toFixed(1).toString().replace('.', ',')} C°`;
    document.querySelector('#temp-min').innerHTML = `${json.tempMin.toFixed(1).toString().replace('.', ',')} C°`;
    document.querySelector('#humidity').innerHTML = `${json.humidity}%`;
    document.querySelector('#wind').innerHTML = `${json.windSpeed.toFixed(1)}km/h`;
}

function preencherCarousel(forecastList) {
    const carousel = document.getElementById('carousel');
    carousel.innerHTML = ''; 

    const next_8h = forecastList.slice(0, 8); 

    next_8h.forEach(item => {
        const date = new Date(item.dt * 1000);
        const hour = date.toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
        });

        const icon = item.weather[0].icon;
        const temp = Math.round(item.main.temp);

        const div = document.createElement('div');
        div.classList.add('carousel-item');

        div.innerHTML = `
            <div class="hour">${hour}</div>
            <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="Ícone do tempo">
            <div class="hour-temp">${temp}°C</div>
        `;

        carousel.appendChild(div);
    });
}


function showAlert(msg) {
    document.querySelector('#alert').innerHTML = msg;
}
