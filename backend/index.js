const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

const NBA_API_URL = 'https://cdn.nba.com/static/json/liveData/scoreboard/todaysScoreboard_00.json';

app.get('/nba/games', async (req, res) => {
    try {
        const response = await axios.get(NBA_API_URL);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching NBA data:', error);
        res.status(500).json({ error: 'Failed to fetch NBA data' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

