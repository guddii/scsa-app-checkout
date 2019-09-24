import { EndpointProperties } from "../../lib/messaging/src/endpoints/Endpoint";

export const Applications = {
    MAIN: new EndpointProperties("MainApp", env.HOST_MAIN),
    ACCOUNT: new EndpointProperties("AccountApp", env.HOST_ACCOUNT),
    CATALOGUE: new EndpointProperties("CatalogueApp", env.HOST_CATALOGUE),
    CHECKOUT: new EndpointProperties("CheckoutApp", env.HOST_CHECKOUT)
};
