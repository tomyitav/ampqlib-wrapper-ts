import messenger from './messaging/AppMessenger'

let startSending = async () => {
    try {
        await messenger.init()
        messenger.send("app.topic", "first rabbitmq message");
    }
    catch (err) {
        console.log('got error in sending- ', err);
    }
}

startSending();
