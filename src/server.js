const express = require('express');
const multer = require('multer');
const { MongoClient } = require('mongodb');
const path = require('path');

const app = express();
const PORT = 3000;

const mongoURI = 'mongodb://localhost:27017';
const dbName = 'simulasi_cahaya';
let db;

app.use(express.static(path.join(__dirname, '../publik')));

const storage = multer.diskStorage({
    destination: './src/uploads/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage });

MongoClient.connect(mongoURI)
    .then(client => {
        console.log('Connected to MongoDB');
        db = client.db(dbName);
    })
    .catch(err => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../publik/index.html'));
});

app.post('/upload', upload.single('photo'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded');
    }

    try {
        const fileData = {
            filename: req.file.filename,
            uploadDate: new Date(),
        };
        const result = await db.collection('uploads').insertOne(fileData);

        res.send({
            message: 'File uploaded and saved to database',
            fileId: result.insertedId,
        });
    } catch (err) {
        console.error('Error saving to database:', err);
        res.status(500).send('Error saving to database');
    }
});

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
app.get('/database', (req, res) => res.sendFile(path.join(__dirname, '../public/database.html')));
app.get('/pendidikan', (req, res) => res.sendFile(path.join(__dirname, '../public/pendidikan.html')));
app.get('/gamifikasi', (req, res) => res.sendFile(path.join(__dirname, '../public/gamifikasi.html')));
app.post('/upload', upload.single('photo'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded');
    }
    // Analisis gambar di sini
    const hasil = {
        warnaDominan: 'Merah',
        panjangGelombang: 620,
    };
    res.json(hasil);
});
