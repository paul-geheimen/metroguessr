document.addEventListener('DOMContentLoaded', () => {

    // --- 1. БАЗА ДАННЫХ СТАНЦИЙ ---
    // Вы можете легко добавлять сюда новые города и станции
    // Важно: Используйте URL-ы фотографий с открытым доступом (например, с Викисклада)
    const metroData = {
        "Москва": [
            { name: "Комсомольская (КЛ)", image: "https://upload.wikimedia.org/wikipedia/commons/5/5a/Komsomolskaya-Koltsevaya_central_hall_2.jpg" },
            { name: "Маяковская", image: "https://upload.wikimedia.org/wikipedia/commons/f/f5/Mayakovskaya_Moscow_Metro_2009-04-14.JPG" },
            { name: "Новослободская", image: "https://upload.wikimedia.org/wikipedia/commons/2/29/Novoslobodskaya-1.jpg" }
        ],
        "Санкт-Петербург": [
            { name: "Автово", image: "https://upload.wikimedia.org/wikipedia/commons/5/5d/Avtovo_Metro_Station_St_Petersburg_2013_2.JPG" },
            { name: "Кировский завод", image: "https://upload.wikimedia.org/wikipedia/commons/e/e2/Kirovsky_Zavod_station_hall_2.jpg" },
            { name: "Пушкинская", image: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Pushkinskaya_SPB_Metro_2.jpg" }
        ],
        "Казань": [
            { name: "Кремлёвская", image: "https://upload.wikimedia.org/wikipedia/commons/b/b5/Kazan_metro_Kremlevskaya_station.jpg" },
            { name: "Площадь Тукая", image: "https://upload.wikimedia.org/wikipedia/commons/5/59/Ploshchad_Tukaya_Kazan_metro.jpg" }
        ],
        "Екатеринбург": [
            { name: "Площадь 1905 года", image: "https://upload.wikimedia.org/wikipedia/commons/f/f6/Ploschad_1905_goda_Ekb_metro.jpg" }
        ],
        "Нижний Новгород": [
            { name: "Московская", image: "https://upload.wikimedia.org/wikipedia/commons/7/72/Moskovskaya_Nizhny_Novgorod_Metro_station_hall.jpg" }
        ]
    };

    // --- 2. ПЕРЕМЕННЫЕ И ЭЛЕМЕНТЫ DOM ---
    const citySelect = document.getElementById('city-select');
    const stationSelect = document.getElementById('station-select');
    const stationImage = document.getElementById('station-image');
    const guessButton = document.getElementById('guess-button');
    const resultDiv = document.getElementById('result');

    let currentStation = null; // Здесь будем хранить правильный ответ

    // --- 3. ЛОГИКА ИГРЫ ---

    // Функция: Заполнить список городов
    function populateCitySelect() {
        const cities = Object.keys(metroData);
        // Сбрасываем к первому элементу
        citySelect.innerHTML = '<option value="" disabled selected>Выберите город</option>';
        cities.forEach(city => {
            const option = document.createElement('option');
            option.value = city;
            option.textContent = city;
            citySelect.appendChild(option);
        });
    }

    // Функция: Заполнить список станций (когда выбран город)
    function populateStationSelect(city) {
        const stations = metroData[city];
        stationSelect.innerHTML = '<option value="" disabled selected>Выберите станцию</option>';
        
        if (stations) {
            stations.forEach(station => {
                const option = document.createElement('option');
                option.value = station.name;
                option.textContent = station.name;
                stationSelect.appendChild(option);
            });
            stationSelect.disabled = false; // Активируем список станций
        } else {
            stationSelect.disabled = true; // Блокируем, если город не выбран
        }
    }

    // Функция: Начать новый раунд
    function loadNewRound() {
        // 1. Сбросить интерфейс
        resultDiv.textContent = '';
        resultDiv.className = '';
        citySelect.value = '';
        stationSelect.value = '';
        stationSelect.disabled = true;
        guessButton.disabled = false;
        
        // 2. Выбрать случайный город
        const cities = Object.keys(metroData);
        const randomCityName = cities[Math.floor(Math.random() * cities.length)];

        // 3. Выбрать случайную станцию из этого города
        const stationsInCity = metroData[randomCityName];
        const randomStation = stationsInCity[Math.floor(Math.random() * stationsInCity.length)];

        // 4. Сохранить правильный ответ
        currentStation = {
            city: randomCityName,
            name: randomStation.name,
            image: randomStation.image
        };

        // 5. Показать фотографию
        stationImage.src = currentStation.image;
    }

    // Функция: Проверить ответ
    function checkAnswer() {
        const guessedCity = citySelect.value;
        const guessedStation = stationSelect.value;

        // Проверка, что оба поля выбраны
        if (!guessedCity || !guessedStation) {
            alert('Пожалуйста, выберите город и станцию.');
            return;
        }

        // Сравниваем ответ
        if (guessedCity === currentStation.city && guessedStation === currentStation.name) {
            resultDiv.textContent = `ВЕРНО! Это ${currentStation.name} (${currentStation.city}).`;
            resultDiv.className = 'correct';
        } else {
            resultDiv.textContent = `НЕВЕРНО. Это была ${currentStation.name} (${currentStation.city}).`;
            resultDiv.className = 'incorrect';
        }

        // Блокируем кнопку, чтобы избежать повторных нажатий
        guessButton.disabled = true;

        // Автоматически загружаем следующий раунд через 3 секунды
        setTimeout(loadNewRound, 3000);
    }

    // --- 4. НАСТРОЙКА ОБРАБОТЧИКОВ СОБЫТИЙ ---

    // 1. Когда меняется город, обновляем список станций
    citySelect.addEventListener('change', () => {
        populateStationSelect(citySelect.value);
    });

    // 2. Когда нажата кнопка "Угадать", проверяем ответ
    guessButton.addEventListener('click', checkAnswer);

    // --- 5. ЗАПУСК ИГРЫ ---
    populateCitySelect();
    loadNewRound();

});
