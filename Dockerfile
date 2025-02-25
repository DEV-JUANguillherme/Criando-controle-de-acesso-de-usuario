# Usa a imagem do Node.js
FROM node:18

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos necessários para dentro do container
COPY package.json yarn.lock ./
RUN yarn install

# Copia o schema Prisma (importante para o prisma generate)
COPY prisma ./prisma/

# Gera o Prisma Client
RUN npx prisma generate

# Copia o restante do código
COPY . .

# Expõe a porta do servidor
EXPOSE 3000

# Comando padrão para iniciar o servidor
CMD ["yarn", "dev"]