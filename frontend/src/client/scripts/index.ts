import { SecurityChecks } from "@scsa/messaging";
import { Applications } from "./Constant";
import { App } from "./App";

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
const secureContexts = Object.values(Applications).map(
  (app: any) => app.url.host
);
const securityChecks = new SecurityChecks(secureContexts);

new App(Applications.CHECKOUT, Applications.MAIN, securityChecks);
