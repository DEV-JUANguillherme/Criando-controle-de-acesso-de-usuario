import { Express, Request, Response } from "express";
import { PrismaClient } from '@prisma/client';

const express = require("express");
const app: Express = express();

const PORT = process.env.PORT || 4001; // Usa a variável de ambiente ou a porta 4001

const prisma = new PrismaClient();

async function connectToDatabase(maxRetries = 5, retryDelay = 2000) {
    let retries = 0;
    while (retries < maxRetries) {
        try {
            await prisma.$connect();
            console.log("Conexão com o banco de dados Prisma estabelecida!");
            return; // Conexão bem-sucedida, sair da função
        } catch (error) {
            console.error(`Erro ao conectar ao banco de dados Prisma (tentativa ${retries + 1}):`, error);
            retries++;
            await new Promise(resolve => setTimeout(resolve, retryDelay)); // Esperar antes de tentar novamente
        }
    }
    console.error("Falha ao conectar ao banco de dados Prisma após várias tentativas.");
    process.exit(1); // Encerrar a aplicação se a conexão falhar após várias tentativas
}

async function startServer() {
    await connectToDatabase(); // Tentar conectar ao banco de dados antes de iniciar o servidor

    app.get("/", (req: Request, res: Response) => {
        res.send("Hello World!");
    });

    app.listen(PORT, () => {
        console.log(`Example app listening on port ${PORT}!`);
    });
}

startServer();