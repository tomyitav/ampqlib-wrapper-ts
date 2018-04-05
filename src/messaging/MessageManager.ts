import * as AmqpLib from "amqplib";
import {Channel} from "amqplib";
import {Message} from "amqplib";

export class MessageManager {

    private channel: Channel;
    private messagesExchange = "messages";
    private wasInitCalled: boolean = false;
    constructor(private brokerUrl: string) {
    }

    public async init() {
        if(this.wasInitCalled) {
            console.log('Init was already called');
            return;
        }
        try {
            this.wasInitCalled = true;
            const connection = await AmqpLib.connect(this.brokerUrl, {});
            console.log('Connected to broker...');
            this.channel = await connection.createChannel();
            console.log('Manager init complete!');
        }
        catch (err) {
            console.log('Could not initialize manager...');
        }
    }

    public send(topicName: string, msg: string) {
        console.log('Sending message- ', msg);
        this.channel.assertExchange(this.messagesExchange, 'topic', {durable: false});
        this.channel.publish(this.messagesExchange, topicName, new Buffer(msg));
    }

    public async receive(topicName: string, onMessage: (msg: Message | null) => any) {
        this.channel.assertExchange(this.messagesExchange, 'topic', {durable: false});
        let q = await this.channel.assertQueue('', {exclusive: true});
        this.channel.bindQueue(q.queue, this.messagesExchange, topicName);
        return this.channel.consume(q.queue, onMessage, {noAck: true});
    }
}