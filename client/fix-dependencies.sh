# Stop any running development servers first (Ctrl+C in the terminal)

# Navigate to the client directory
cd e:\Desktop files\Masai\Hackathon\xto10x-3\client

# Install or reinstall Material UI packages
npm install @mui/material @emotion/react @emotion/styled

# If that doesn't work, try cleaning the cache and reinstalling
npm cache clean --force
npm install

# If you're using yarn instead of npm
# yarn add @mui/material @emotion/react @emotion/styled

# Start the development server again
npm run dev
