# Usa una imagen base de Node.js compatible con tu proyecto
FROM node:20.11.0

# Establece el directorio de trabajo
WORKDIR /app

# Elimina node_modules y package-lock.json para asegurar una instalación limpia
RUN rm -rf node_modules package-lock.json

# Copia los archivos package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias, ignorando las opcionales
RUN npm install --no-optional

# Copia el código restante
COPY . .

# Exponer el puerto que usa Vite (5173 por defecto)
EXPOSE 5173

# Comando para ejecutar el entorno de desarrollo
CMD ["npm", "run", "dev"]
