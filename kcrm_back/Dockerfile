# Usa una versión específica de Node.js (más estable que la v20)
FROM node:20.11.0

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Elimina node_modules y package-lock.json para asegurar una instalación limpia
RUN rm -rf node_modules package-lock.json

# Copiar los archivos de dependencias
COPY package*.json ./

# Instalar dependencias en el contenedor
RUN npm install

# Copiar el resto del código de la aplicación
COPY . .

# Exponer el puerto en el que el backend escucha
EXPOSE 5000

# Iniciar la aplicación
CMD ["npm", "run", "dev"]
