import { Router } from 'express';
const router = Router();
 import WeatherService from '../../service/weatherService.js';
import historyService from '../../service/historyService.js';
import fetch from 'node';

// TODO: POST Request with city name to retrieve weather data
router.post('/', (_req, _res) => {
  try {
    const { city } = _req.body;
  }
  // TODO: GET weather data from city name
  const weatherApiKey = '34887e3f5a0b3b4b7c6894cd645278f1';
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=metric`;
  const weatherResponse = await fetch(weatherUrl);
  const weatherData = await weatherResponse.json();

  // TODO: save city to search history
  const savedCity = await historyService.addCity(city);
  res.json({
    weather: 'weatherData',
    city: savedCity
  });
} catch (error) {
  res.status(500).json({error: 'Failed to fetch weather data'});
}
});

// TODO: GET search history
router.get('/history', async (_req, _res) => {
  try {
    const cities = await historyService.getCities();
    res.json({message: 'City removed successfully'});
  } catch (error) {
    res.status(500).json({error: 'Failed to remove city'});
  }
  }
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (_req, _res) => {
  try {
    await historyService.removeCity(req.params.id);
    res.json({ message: 'City removed successfully' });
} catch (error) {
    res.status(500).json({ error: 'Failed to remove city' });
}




});

export default router;
