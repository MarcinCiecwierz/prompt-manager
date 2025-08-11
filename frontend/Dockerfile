FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .
RUN npm run build

EXPOSE 4173

CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0"]

# FROM node:18-alpine AS build

# WORKDIR /app

# COPY package.json .

# RUN npm install

# COPY . .
# RUN npm run build

# FROM nginx:1.25
# COPY nginx.conf /etc/nginx/conf.d/default.conf
# COPY --from=build /app/dist /usr/share/nginx/html