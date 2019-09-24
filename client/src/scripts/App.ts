import { MessageEndpoint } from "../../lib/messaging/src/endpoints/MessageEndpoint";
import { Message } from "../../lib/messaging/src/constructors/Message";
import { EndpointProperties } from "../../lib/messaging/src/endpoints/Endpoint";
import { SecurityChecks } from "../../lib/messaging/src/SecurityChecks";

export class App extends MessageEndpoint {
    button = document.querySelector("button");
    products: Array<any> = [];

    constructor(
        endpointProperties: EndpointProperties,
        mainProperties: EndpointProperties,
        securityChecks: SecurityChecks = new SecurityChecks()
    ) {
        super(endpointProperties, mainProperties, securityChecks);
        this.button.addEventListener("click", (event: MouseEvent) => {
            const target: HTMLElement = event.target as HTMLElement;
            this.publish(
                new Message({ clicked: `${target.innerText} Button` })
            );
        });
    }

    subscribe(event: MessageEvent) {
        super.subscribe(event);
        if (event.data.body.hasOwnProperty("product")) {
            this.products.push(event.data.body.product);
            this.button.querySelector(
                "span"
            ).innerText = `(${this.products.length})`;
        }
    }
}