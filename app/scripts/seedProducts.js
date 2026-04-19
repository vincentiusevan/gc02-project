/* eslint-disable @typescript-eslint/no-require-imports */
require('dotenv').config({ path: '.env.local' });

const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = process.env.MONGODB_DBNAME || 'vkea';

async function seedProducts() {
  const client = new MongoClient(uri);

  try {
    await client.connect();

    const db = client.db(dbName);
    const productsCollection = db.collection('products');

    const dbPath = path.join(__dirname, '../../db.json');
    const dbJson = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
    const products = dbJson.products;

    const operations = products.map((product) => {
      return {
        updateOne: {
          filter: { slug: product.slug },
          update: {
            $set: {
              ...product,
              createdAt: new Date(product.createdAt),
              updatedAt: new Date(product.updatedAt),
            },
          },
          upsert: true,
        },
      };
    });

    const result = await productsCollection.bulkWrite(operations);

    console.log('Seed products selesai');
    console.log(`Matched: ${result.matchedCount}`);
    console.log(`Modified: ${result.modifiedCount}`);
    console.log(`Inserted: ${result.upsertedCount}`);
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
}

seedProducts();
