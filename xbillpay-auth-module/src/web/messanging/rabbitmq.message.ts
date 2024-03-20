import { Injectable } from '@nestjs/common';
import * as amqp from 'amqplib';

@Injectable()
export class RabbitMQService {
  private readonly url: string;

  constructor() {
    this.url = 'amqp://guest:guest@localhost'; // Corrected URL
  }

  async sendMessageOTP(message: any, queueName: string) {
    try {
      const connection = await amqp.connect(this.url);
      const channel = await connection.createChannel();
      
      await channel.assertQueue(queueName);
      
      const messageBuffer = Buffer.from(JSON.stringify(message)); // Convert message to buffer
      await channel.sendToQueue(queueName, messageBuffer);

      console.log(`Message sent to RabbitMQ queue: ${JSON.stringify(message)}`);
      
      await channel.close();
      await connection.close();
    } catch (error) {
      console.error('Error sending message to RabbitMQ:', error);
    }
  }
}
