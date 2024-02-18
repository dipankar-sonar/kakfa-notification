
const db = require('../db/mysql-connection');

const getAllNotifications = (req, res) => {
    try {
        db.query('SELECT * FROM notifications', (error, results, fields) => {
            if (error) {
                throw error; // Throw the error to be caught by the catch block
            }
            res.json(results);
        });
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


const storeNotification = (notificationMessage) => {
    return new Promise((resolve, reject) => {
        const insertQuery = `INSERT INTO notifications (message) VALUES ('${notificationMessage}')`;

        db.query(insertQuery, (error, result) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(result);
        });
    });
};

module.exports = {
    getAllNotifications,
    storeNotification
};
