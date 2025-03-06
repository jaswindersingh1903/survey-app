FROM node:18

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package.json package-lock.json ./

# Install dependencies and skip optional ones causing issues
RUN npm install

# Copy the rest of the app files
COPY . .

# Expose port 5173 (Vite default dev server port)
EXPOSE 5173

# Start the Vite dev server and allow external access
CMD ["npm", "run", "dev", "--", "--host"]
