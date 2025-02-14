
const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY, // Add your OpenAI API key here
});

const openai = new OpenAIApi(configuration);

async function predictWinner(gameData) {
    const prompt = `Predict the winner of the NBA game:
    - Team 1: ${gameData.team_1}
    - Team 2: ${gameData.team_2}
    - Points per game: ${gameData.team_1_ppg} vs ${gameData.team_2_ppg}
    - Assists per game: ${gameData.team_1_apg} vs ${gameData.team_2_apg}
    - Rebounds per game: ${gameData.team_1_rpg} vs ${gameData.team_2_rpg}
    - Win/Loss Record: ${gameData.team_1_wins}-${gameData.team_1_losses} vs ${gameData.team_2_wins}-${gameData.team_2_losses}
    - ATS Record: ${gameData.ats_team_1} vs ${gameData.ats_team_2}

    Provide the predicted winner and confidence level.`;

    const response = await openai.createCompletion({
        model: "gpt-4",
        prompt: prompt,
        max_tokens: 100,
    });

    return response.data.choices[0].text.trim();
}

module.exports = { predictWinner };
