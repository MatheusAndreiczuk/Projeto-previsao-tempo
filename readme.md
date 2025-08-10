# Weather Forecast App

Este é um projeto simples de previsão do tempo construído com **HTML**, **CSS** e **JavaScript**, que consome a API pública do [OpenWeatherMap](https://openweathermap.org/) para exibir:

- Tempo atual
- Previsão das próximas horas (em carrossel horizontal)
- Informações como temperatura e condição atuais (nublado, ensolarado, chuvoso, etc), temperaturas máxima e mínima, velocidade do vento e umidade.

> **Inspiração:** A ideia e a base para o app foram retiradas de um vídeo do canal [Larissa Kich](https://www.youtube.com/@larissakich) no YouTube

- Foram realizadas modificações, como o incremento de funcionalidades e a adaptação do uso da API "weather" para a "forecast", o que resultou na obtenção de dados muito mais precisos e realistas. Responsividade aplicada.

---

## Funcionalidades

-  Busca por cidade (ex: `Ponta Grossa`)
-  Consumo da API `weather` e `forecast` (OpenWeatherMap)
-  Carrossel horizontal com as próximas 8 previsões (24h)
-  Ícones dinâmicos de condição do tempo
-  Exibição de vento, umidade e temperaturas máximas/mínimas
- Design responsivo

---

## Limitações

- Os dados de tempo não são tão precisos pois a API gratuita da OperWeather não fornece dados passados, tendo uma margem de erro de até 3h futuras
- A chave da API encontra-se inativa. Por favor, caso queira utilizar ou testar o projeto substitua a apiKey pela sua própria chave, fornecida pela OpenWeather API após um simples cadastro.

---

##  Tecnologias utilizadas

- HTML5
- CSS3 
- JavaScript (Vanilla)
- [OpenWeatherMap API](https://openweathermap.org/api)

---
