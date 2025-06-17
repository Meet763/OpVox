import { MongoClient } from 'mongodb';

const randomChoice = (arr) => arr[Math.floor(Math.random() * arr.length)];

function generateUsers(count) {
    const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'];
    const names = ['Alice', 'Bob', 'Charlie', 'David', 'Eva', 'Frank', 'Grace', 'Helen'];
    const users = [];

    for (let i = 1; i <= count; i++) {
        users.push({
            _id: i,
            name: `${randomChoice(names)} ${i}`,
            email: `user${i}@example.com`,
            addresses: [
                { type: 'home', city: randomChoice(cities), zip: `${10000 + i}` },
                { type: 'work', city: randomChoice(cities), zip: `${20000 + i}` }
            ],
            createdAt: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1)
        });
    }

    return users;
}

function generateProducts(count) {
    const categories = ['Electronics', 'Furniture', 'Books', 'Clothing', 'Toys'];
    const tags = ['new', 'sale', 'popular', 'tech', 'home', 'kids'];
    const products = [];

    for (let i = 1; i <= count; i++) {
        products.push({
            _id: 100 + i,
            name: `Product ${i}`,
            price: Math.floor(Math.random() * 500) + 20,
            category: randomChoice(categories),
            tags: [randomChoice(tags), randomChoice(tags)],
        });
    }

    return products;
}

function generateOrders(userCount, productCount, count) {
    const statuses = ['processing', 'shipped', 'delivered', 'cancelled'];
    const orders = [];

    for (let i = 1; i <= count; i++) {
        const itemCount = Math.floor(Math.random() * 3) + 1;
        const items = Array.from({ length: itemCount }, () => ({
            productId: 100 + Math.floor(Math.random() * productCount) + 1,
            quantity: Math.floor(Math.random() * 4) + 1
        }));

        orders.push({
            _id: 1000 + i,
            userId: Math.floor(Math.random() * userCount) + 1,
            items,
            status: randomChoice(statuses),
            orderedAt: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1)
        });
    }

    return orders;
}

async function seed() {
    const client = new MongoClient('mongodb://localhost:27017');
    await client.connect();
    const db = client.db('ecommerceDB');

    const users = db.collection('users');
    const products = db.collection('products');
    const orders = db.collection('orders');

    await users.deleteMany({});
    await products.deleteMany({});
    await orders.deleteMany({});

    const userDocs = generateUsers(40);
    const productDocs = generateProducts(40);
    const orderDocs = generateOrders(40, 40, 40);

    await users.insertMany(userDocs);
    await products.insertMany(productDocs);
    await orders.insertMany(orderDocs);

    console.log('✅ 40 entries per collection inserted successfully!');
    await client.close();
}

seed().catch(console.error);
