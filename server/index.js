const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const app = express();


app.use(express.json());


app.get('/api/weather/history', async (req, res) => {
    try {
        const data = await fs.readFile('searchHistory.json', 'utf8');
        res.json(JSON.parse(data));
    } catch (error) {
        res.status(500).json({ error: 'Error reading search history' });
    }
});

app.post('/api/weather', async (req, res) => {
    try {
        const { city } = req.body;
        const cities = JSON.parse(await fs.readFile('searchHistory.json', 'utf8'));
        
        // Add new city with unique ID
        const newCity = {
            id: Date.now().toString(),
            name: city
        };
        
        cities.push(newCity);
        await fs.writeFile('searchHistory.json', JSON.stringify(cities, null, 2));
        
        // Here you'll add weather API call
        res.json({ message: 'City added', city: newCity });
    } catch (error) {
        res.status(500).json({ error: 'Error processing request' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
