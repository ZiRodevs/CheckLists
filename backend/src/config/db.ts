import { MongoClient } from 'mongodb';

const USERNAME = process.env.MONGODB_USERNAME;
const PASSWORD = process.env.MONGODB_PASS;
const URI = `mongodb+srv://${USERNAME}:${PASSWORD}@mcluster0.ktidudz.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(URI, {
    serverApi: {
        version: '1',
        strict: true,
        deprecationErrors: true,
    },
});

export async function run() {
    try {
        await client.connect();
        // TODO - set driver properly
        await client.db('admin').command({ ping: 1 });
        console.log('Pinged your deployment. You successfully connected to MongoDB!');
    } finally {
        await client.close();
    }
}
