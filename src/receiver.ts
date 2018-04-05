import messenger from './messaging/AppMessenger'
import {Message} from "amqplib";

let onMessage = (msg: Message) => {
    console.log('got message- ', msg.content);
}

let listenToMessages = async () => {
    try {
        await messenger.init();
        messenger.receive("app.topic", onMessage);
    }
    catch (err) {
        console.log('got error in sending- ', err);
    }
}

listenToMessages();