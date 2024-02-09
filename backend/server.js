const express = require('express')
const bodyParser = require('body-parser')
const sqlite3 = require('sqlite3').verbose()
const xlsxPopulate = require('xlsx-populate')

const app = express()
const PORT = process.env.PORT ?? 3001
const dbPath = './data/descargasPorCTE.db'

const db = new sqlite3.Database('./data/descargas.db')

db.run(`CREATE TABLE IF NOT EXISTS descargas_por_cte (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    data_saida TEXT NOT NULL,
    manifesto INTEGER NOT NULL,
    contrato_frete INTEGER NOT NULL,
    notas_fiscais TEXT NOT NULL,
    cte INTEGER NOT NULL,
    consignatario TEXT NOT NULL,
    destinatario TEXT NOT NULL,
    cidade TEXT NOT NULL,
    volume REAL NOT NULL,
    peso REAL NOT NULL,
    filial TEXT NOT NULL,
    abreviatura TEXT NOT NULL,
    valor_descarga REAL,
    valor_recuperado REAL,
    observacao_pagamento TEXT,
    recibo_ok INTEGER CHECK (recibo_ok IN (0, 1)),
    baixado_em TEXT
)`)

/* Parse xlsx records to the database */