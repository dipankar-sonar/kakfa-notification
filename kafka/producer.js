const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    brokers: ['localhost:9092']
});

const producer = kafka.producer();

async function sendNotification(message) {
    await producer.connect();
    await producer.send({
        topic: 'notifications',
        messages: [{ value: message }]
    });
    await producer.disconnect();
}

module.exports = { sendNotification };