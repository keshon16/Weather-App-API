// TODO: Define a City class with name and id properties
class City {
  name: string;
  id: string;

  constructor(name: string, id: string) {
    this.name = name;
    this.id = id;
  }
}
// TODO: Complete the HistoryService class
class HistoryService {
  // TODO: Define a read method that reads from the searchHistory.json file
  // private async read() {}
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  private async read() {
    try {
      const data = await fs.readFile('db.json', 'utf8');
      const jsonData = JSON.parse(data);
      return jsonData.cities;
    } catch {
      return [];
    }
    }
  
  // private async write(cities: City[]) {}
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  private async write(cities: City[]) {
    const data = {
      cities: cities
    };
    await fs.writeFile('db.json', JSON.stringify(data, null, 2));
  }
  // async getCities() {}
  // TODO Define an addCity method that adds a city to the searchHistory.json file
  async getCities() {
    return await this.read();
  }
  // async addCity(city: string) {}
  async addCity(city: string) {
    const cities = await this.read();
    const newCity = {
      id: Date.now().toString()
    };
    cities.push(newCity);
    await this.write(cities);
    return newCity;
  }
  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  // async removeCity(id: string) {}
  async removeCity(id: string) {
    const cities = await this.read();
    const updatedCities = cities.filter((city: { id: string; }) => city.id !== id);
    await this.write(updatedCities);
  }
}


export default new HistoryService();
