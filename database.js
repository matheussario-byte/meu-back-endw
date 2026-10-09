const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Caminho para o ficheiro do banco de dados
const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
    // 1. Criar Tabela de Usuários (garantindo que o identificador é único)
    db.run(`CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        identificador TEXT UNIQUE,
        senha TEXT,
        nome TEXT,
        perfil TEXT
    )`);

    // 2. Criar Tabela de Chamados
    db.run(`CREATE TABLE IF NOT EXISTS chamados (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titulo TEXT,
        categoria TEXT,
        urgencia TEXT,
        descricaoInicial TEXT,
        nomeSolicitante TEXT,
        turno TEXT,
        telefone TEXT,
        email TEXT,
        criador TEXT,
        status TEXT,
        dataCriacao TEXT,
        mensagens TEXT
    )`);

    // 3. Lista dos utilizadores solicitados
    const utilizadoresIniciais = [
        // Administradores
        { identificador: 'caua.silva@rsterceirizacao.com.br', senha: 'p147258@', nome: 'Cauã Silva', perfil: 'admin' },
        { identificador: 'rogerio.junior@rsterceirizacao.com.br', senha: 'p147258@', nome: 'Rogério Júnior', perfil: 'admin' },
        { identificador: 'matheus.sario@rsterceirizacao.com.br', senha: 'p147258@', nome: 'Matheus Sairo', perfil: 'admin' },
        // Utilizador Padrão
        { identificador: 'Portaria Remota', senha: 'p147258@', nome: 'Portaria Remota', perfil: 'user' }
    ];

    // 4. Inserir os utilizadores no banco de dados (o comando IGNORE previne duplicações se já existirem)
    utilizadoresIniciais.forEach(u => {
        db.run(
            `INSERT OR IGNORE INTO usuarios (identificador, senha, nome, perfil) VALUES (?, ?, ?, ?)`, 
            [u.identificador, u.senha, u.nome, u.perfil]
        );
    });
});

module.exports = db;