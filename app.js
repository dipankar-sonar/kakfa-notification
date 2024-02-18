const express = require("express");
const bodyParser = require('body-parser');

const notificationRoutes = require("./routes/notifications.js");
const { sendNotification } = require("./kafka/producer.js");
const { setupConsumer } = require("./kafka/consumer.js");

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.send('index: default route')
})

// app.use("/notifications", notificationRoutes);


app.post('/notifications', async (req, res) => {
    try {
        const { message } = req.body;
        await sendNotification(message);
        res.status(200).json({ success: true, message: 'Notification sent successfully' });
    } catch (error) {
        console.error('Error sending notification:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});






app.listen(port, async () => {
    console.log(`Server is listening at http://localhost:${port}`);
    await setupConsumer();
});