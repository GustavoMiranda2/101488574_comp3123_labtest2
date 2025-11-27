# 101488574_comp3123_labtest2 — Weather App

Author: Gustavo Miranda (Student ID: 101488574)

## Setup
1) Install deps: `npm install`
2) Create `.env` in the project root with `VITE_OPENWEATHER_API_KEY=295cc4971d37ccd7fe9009e4b5fa9eff`
3) Run dev server: `npm run dev` (open the shown URL, usually http://localhost:5173)
4) Build: `npm run build`

## Deploy (Vercel)
- Build command: `npm run build`
- Output directory: `dist`
- Environment variable: `VITE_OPENWEATHER_API_KEY` (same value as above)

## API
- Endpoint: `https://api.openweathermap.org/data/2.5/weather?q={CITY}&appid={KEY}&units=metric`
