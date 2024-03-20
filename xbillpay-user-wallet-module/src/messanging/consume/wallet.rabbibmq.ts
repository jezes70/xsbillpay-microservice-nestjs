
import { Injectable } from '@nestjs/common';
import * as amqp from 'amqplib';

@Injectable()
export class WalletConsumerService {
  private readonly url: string;
  private readonly queueName: string;

  constructor() {
    this.url = 'amqp://guest:guest@localhost'; // Corrected URL
    this.queueName = 'wallet_creation'; 
  }

  async consumeMessages() {
    try {
      const connection = await amqp.connect(this.url)
      const channel = await connection.createChannel();
      await channel.assertQueue(this.queueName);
      console.log(`Waiting for messages in ${this.queueName}.`);

      channel.consume(this.queueName, (message) => {
        if (message !== null) {
          console.log(`Received message: ${message.content.toString()}`);
      
          channel.ack(message);
        }
      });
    } catch (error) {
      console.error('Error consuming messages from RabbitMQ:', error);
    }
  }
}
