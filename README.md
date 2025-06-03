# CanadianBanksFXRates

## How to run

1. Clone the repository
2. Ensure Node.js and Docker Desktop are installed on your machine
3. In the terminal, run the command `docker-compose up --build`

### Notes
Auto-refresh is enabled for this app for code changes
If auto-refresh is taxing on CPU, adjust backend/package.json/scripts to the following:
- Frontend: `"start": "react-scripts start"`
- Backend: `"dev": "nodemon index.js"`