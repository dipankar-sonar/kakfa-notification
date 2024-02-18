// consumer.js
const { Kafka } = require('kafkajs');

const { storeNotification } = require('../controllers/notification-controller');

const kafka = new Kafka({
    brokers: ['localhost:9092']
});

const consumer = kafka.consumer({ groupId: 'notifications-group' });

async function setupConsumer() {
    await consumer.connect();
    await consumer.subscribe({ topic: 'notifications', fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log({
                partition,
                offset: message.offset,
                value: message.value.toString(),
            });

            // Store notification in the database
            try {
                const notificationMessage = message.value.toString();
                const result = await storeNotification(notificationMessage);
                console.log('Notification stored in database:', result);
            } catch (error) {
                console.error('Error storing notification in database:', error);
            }
        }
    });
}

module.exports = { setupConsumer };
