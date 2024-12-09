import dotenv from 'dotenv';
import { query, Response, response } from 'express';
dotenv.config();

// TODO: Define a class for the Weather object
interface Coordinates {
  lat: number;
  lon: number;
}

interface Weather {
  temperature: number;
  humidity: number;
  windSpeed: number;
  description: string;
  date: Date;
}
// TODO: Complete the WeatherService class
class WeatherService {
// TODO: Define the baseURL, API key, and city name properties
  private baseURL = 'https://api.openweathermap.org/data/2.5';
  private apiKey = process.env.OPENWEATHER_API_KEY || '34887e3f5a0b3b4b7c6894cd645278f1';
  private cityName: string = '';
  // TODO: Create fetchLocationData method
  // private async fetchLocationData(query: string) {}
  private async fetchLocationData(city: string): Promise<any> {
    const response = await fetch(query);
    const query = `${this.baseURL}/https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}`;
    if (!response.ok)  {
      throw new Error('Failed to fetch location data');
    }
    return response.json();
}
  // TODO: Create destructureLocationData method
  // private destructureLocationData(locationData: Coordinates): Coordinates {}
  private destructureLocationData(locationData: any): Coordinates {
    const [location] = locationData;
    return {
        lat: location.lat,
        lon: location.lon
    };
}
  // TODO: Create buildGeocodeQuery method
  // private buildGeocodeQuery(): string {}
  private buildGeocodeQuery(city: string): string {
    return `https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
    `;
     
  }
  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}&units=metric`;
    }
  }
 // TODO: Create fetchAndDestructureLocationData method
  // private async fetchAndDestructureLocationData()  {}
  private async fetchAndDestructureLocationData(city: string): Promise<Coordinates> {
    try {
        this.cityName = city; // Set the city name before building the query
        const query = this.buildGeocodeQuery();
        const locationData = await this.fetchLocationData(query);
        
        if (!locationData || locationData.length === 0) {
            throw new Error(`No location data found for ${city}`);
        }
        
        return this.destructureLocationData(locationData);
    } catch (error) {
        console.error(`Error fetching location data for ${city}:`, error);
        throw error;
    }
}

  

// TODO: Create fetchWeatherData method
  // private async fetchWeatherData(coordinates: Coordinates) {}
  private async fetchWeatherData(coordinates: Coordinates): Promise<any> {
    const query = this.buildWeatherQuery(coordinates);
    const response = await fetch(query);
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
    return response.json();
    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw error;
    }
  }

  // TODO: Build parseCurrentWeather method
  // private parseCurrentWeather(response: any) {}
  private parseCurrentWeather(response: any): Weather {
    return {
        temperature: response.main.temp,
        humidity: response.main.humidity,
        windSpeed: response.wind.speed,
        description: response.weather[0].description,
        date: new Date()
    };
}

  // TODO: Complete buildForecastArray method
  // private buildForecastArray(currentWeather: Weather, weatherData: any[]) {}
  private buildForecastArray(currentWeather: Weather, weatherData: any[]): Weather[] {
    const forecast = [currentWeather];
    weatherData.forEach(data => {
        forecast.push({
            temperature: data.main.temp,
            humidity: data.main.humidity,
            windSpeed: data.wind.speed,
            description: data.weather[0].description,
            date: new Date(data.dt * 1000)
        });
    });
    return forecast;
}

  // TODO: Complete getWeatherForCity method
  // async getWeatherForCity(city: string) {}

  async getWeatherForCity(city: string): Promise<Weather[]> {
    this.cityName = city,
    const coordinates = await this.fetchAndDestructureLocationData(),
    const weatherData = await this.fetchWeatherData(coordinates);
    const currentWeather = this.parseCurrentWeather(weatherData);
    return this.buildForecastArray(currentWeather, weatherData.list || []);
}

}

}

