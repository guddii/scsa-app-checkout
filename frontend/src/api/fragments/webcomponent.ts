import { EventDrivenConsumer, IEventDrivenConsumer, Logger, Message } from "@scsa/messaging";
import { cfg } from "../../config";
import tpl from "../../server/views/partials/entry.pug";
import "../../client/index.css";

const eventDrivenConsumer = new EventDrivenConsumer(cfg);

class CheckoutBasket extends HTMLElement implements IEventDrivenConsumer {
  private logger: Logger;

  constructor() {
    super();

    this.render();

    const button = this.shadowRoot.querySelector("button");
    button.addEventListener("click", this.handleClick);

    this.logger = new Logger({ctx: this.shadowRoot});

    eventDrivenConsumer.subscribe(this);
  }

  render() {
    const template = document.createElement("template");
    template.innerHTML += tpl();
    template.innerHTML += `<link type="text/css" rel="stylesheet" href="${cfg
      .CURRENT.options.url + "assets/client.css"}">`;
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  handleClick(event) {
    eventDrivenConsumer.publish(
      new Message({ purchase: { products: ["Product 1"] } })
    );
  }

  callback(data) {
    this.logger.write(data);
  }
}


window.customElements.define("checkout-basket", CheckoutBasket);
