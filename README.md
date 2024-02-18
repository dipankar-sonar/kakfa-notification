# kakfa-notification
Kafka Notification using Node.js Express

A kafka server is needed. Please follow: https://www.youtube.com/watch?v=BwYFuhVhshI&pp=ygUQa2Fma2Egb24gd2luZG93cw%3D%3D

Mysql db: Database: Demo and Table: Notifications \
CREATE TABLE notifications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  message VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

Send Message from Postman to Node Express Server which then pushes it into Kafka Message broker service and listened to by Another Consumer service on the same Express Server (Can be another server in a distributed system).
Stores the Message in the database
