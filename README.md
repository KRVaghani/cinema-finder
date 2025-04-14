# Getting Started

To be able to run this application locally you must have the following installed.

- [NodeJS](https://nodejs.org/en/) (Version 16.x recommended)
- [Yarn (package manager)](https://yarnpkg.com/getting-started/install)
- [Node Version Manager (nvm)](https://github.com/nvm-sh/nvm) (Optional but recommended)

## Detailed Setup Instructions

### 1. Install Node Version Manager (nvm) (Recommended)
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
```

After installation, restart your terminal or run:
```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
```

### 2. Install and Use Node.js 16
```bash
nvm install 16
nvm use 16
```

### 3. Install Dependencies
```bash
# Install yarn if not already installed
npm install -g yarn

# Install project dependencies
touch yarn.lock
yarn install
```

### 4. Start the Development Server
```bash
yarn start
```

The application will open in your default web browser at http://localhost:3000.

## Troubleshooting Common Issues

### 1. Node.js Version Issues
If you encounter errors related to Node.js version:
- Make sure you're using Node.js 16.x
- Verify your Node.js version with `node --version`
- Switch to Node.js 16 using `nvm use 16`

### 2. Dependency Installation Issues
If you encounter dependency installation errors:
```bash
# Remove existing node_modules and yarn.lock
rm -rf node_modules yarn.lock

# Create a new yarn.lock file
touch yarn.lock

# Reinstall dependencies
yarn install
```

### 3. Mapbox GL Issues
If you see errors related to mapbox-gl:
```bash
# Install mapbox-gl as a peer dependency
yarn add mapbox-gl
```

### 4. React Scripts Issues
If you encounter issues with react-scripts:
- Make sure you're using Node.js 16
- Try clearing the yarn cache: `yarn cache clean`
- Reinstall dependencies: `yarn install`

## Key Scripts

- `yarn install` - Install dependencies
- `yarn start` - Run the application in development mode (auto-refreshes on code changes)
- `yarn build` - Build a production version of the code
- `yarn test` - Run tests
- `yarn eject` - Eject from Create React App (advanced users only)

# Key Terms
- Latitude (lat) -90 through to +90. Representing south to north respectively.
- Longitutde (lon or lng), -180 through to +180. Representing west to east respectively.

# Key Dependencies

This application utilises both MapLibre and Leaflet as mapping libraries, as you can toggle between them.
The relavent code for both, are code-splitted out so it's required for both to be download by the browser.

- [MapLibre](https://maplibre.org/maplibre-gl-js-docs/api/)
- [Leaflet](https://leafletjs.com/reference.html)

Material UI is used as our main style library, utilising the default MUI theme.
- [Material UI](https://mui.com/material-ui/)

React Icons is used for a handful of icons throughout the application.
- [React Icons](https://react-icons.github.io/react-icons/)

## Additional Notes

- The application requires a Mapbox access token for map functionality. Make sure to set up your environment variables accordingly.
- For development, you can use the `.env` file to store your environment variables.
- The application uses code splitting for better performance, so initial load times might be slightly longer in development mode.

Alternatively this repository will also be available via codesandbox so you can modify and view the code.
