import {
    MessageEndpoint,
    EndpointProperties,
    Message,
    SecurityChecks
} from "@scsa/messaging";

export class App extends MessageEndpoint {
    button = document.querySelector("button");
    products: Array<any> = [];

    constructor(
      endpointProperties: EndpointProperties,
      mainProperties: EndpointProperties,
      securityChecks: SecurityChecks = new SecurityChecks()
    ) {
        super(endpointProperties, mainProperties, securityChecks);
        this.button.addEventListener("click", () => {
            this.publish(
              new Message({ purchase: { products: this.products } })
            );
            this.products = [];
            this.button.querySelector("span").innerText = "";
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
        if (event.data.body.hasOwnProperty("hello")) {
            this.publish(
              new Message({
                  hello: `Hello Main, ${this.endpointProperties.options.text} is here.`
              })
            );
        }
    }
}
