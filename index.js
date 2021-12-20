require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { MongoClient } = require('mongodb');

const app = express()
const port = process.env.PORT || 7000

app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.9bbw4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
    try {
        await client.connect()
        const database = client.db('booksDB')
        // creating collections
        const bookCollection = database.collection('books')

        app.get('/books', async (req, res) => {
            const cursor = await bookCollection.find({})
            const sites = await cursor.toArray();
            res.json(sites)
        })
    } finally {
        // client.close();
    }
}

run().catch(console.error)
app.get('/', (req, res) => {
    res.send('connected at backend')
})
app.listen(port, () => console.log('connected'))
