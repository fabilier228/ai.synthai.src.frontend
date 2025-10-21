# Simple and fast Dockerfile
FROM node:20

WORKDIR /app

# Copy only package.json and package-lock.json
COPY package*.json ./

# Simple npm install
RUN npm install

# Copy the rest of the files
COPY . .

# Build the Next.js app for production (creates .next)
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]