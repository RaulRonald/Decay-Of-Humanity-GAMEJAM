//para compilar use "node index.js" nesse diretório pelo cmd
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

//o server irá puxar e ler tudo que está na pasta public
app.use(express.static(path.join(__dirname, 'docs')));

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});