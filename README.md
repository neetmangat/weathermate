# WeatherMate

## Production

- Deployment Link: https://weathermate-nm.vercel.app
- GitHub Repo Link: https://github.com/neetmangat/weathermate
- YouTube Build Link: https://www.youtube.com/watch?v=1KPG3LiE4jU&t=35784s

## Development

1. Clone the repository and install dependencies

```bash
git clone https://github.com/neetmangat/weathermate.git weathermate && cd weathermate && npm install
```

2. Generate your own OpenAI API key on the [OpenAI Platform](http://platform.openai.com)

3. Setup a [Stepzen](https://stepzen.com) account

4. Initialize Stepzen with the data from Weather API & run server

```bash
stepzen init && stepzen import curl https://api.open-meteo.com/v1/forecast\?latitude\=51.51\&longitude\=-0.13\&hourly\=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,windgusts_10m,uv_index,uv_index_clear_sky\&daily\=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,uv_index_clear_sky_max\&current_weather\=true\&timezone\=Europe%2FLondon && stepzen start --dashboard=local
```

5. Add the server environment variables

```bash
cp .env.example .env.local
```

6. Run the development server:

```bash
yarn run dev
```

7. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
