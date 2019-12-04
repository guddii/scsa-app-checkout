import { EndpointProperties } from "@scsa/messaging";
import { cfg } from "../../config";

export const Applications = {
    MAIN: new EndpointProperties(
        cfg.CURRENT.options.text,
        cfg.CURRENT.options.url.href
    ),
    ACCOUNT: new EndpointProperties(
        cfg.APPLICATIONS.Account.options.text,
        cfg.APPLICATIONS.Account.options.url.href
    ),
    CATALOGUE: new EndpointProperties(
        cfg.APPLICATIONS.Catalogue.options.text,
        cfg.APPLICATIONS.Catalogue.options.url.href
    ),
    CHECKOUT: new EndpointProperties(
        cfg.APPLICATIONS.Checkout.options.text,
        cfg.APPLICATIONS.Checkout.options.url.href
    )
};
