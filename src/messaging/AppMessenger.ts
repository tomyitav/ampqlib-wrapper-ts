import {MessageManager} from "./MessageManager";
let messenger: MessageManager = new MessageManager('amqp://localhost');

export default messenger;