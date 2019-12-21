import {
  EventDrivenConsumerGT,
  IEventDrivenConsumer,
  Logger,
  Message
} from "@scsa/messaging";
import "../../client/index.css";
import { cfg } from "../../config";

interface IIframeOptions {
  ctx?: Element | Document;
  edc?: any;
}

export class Controller implements IEventDrivenConsumer {
  public button = document.querySelector("button");
  private logger: Logger;
  private options: IIframeOptions;

  constructor(
    options: IIframeOptions = {
      ctx: document,
      edc: new EventDrivenConsumerGT(cfg)
    }
  ) {
    this.options = options;
    this.options.edc.subscribe(this);

    const button = options.ctx.querySelector("button");
    button.addEventListener("click", this.handleClick);

    this.logger = new Logger({
      ctx: options.ctx
    });
  }

  public handleClick = event => {
    this.options.edc.publish(
      new Message({ purchase: { products: ["Product 1"] } })
    );
  };

  public callback(data) {
    this.logger.write(data);
  }
}
