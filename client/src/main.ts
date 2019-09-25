import "./main.css";

import { SecurityChecks } from "scsa-lib-messaging/src/SecurityChecks";
import { Applications } from "./scripts/Constant";
import { App } from "./scripts/App";

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
const secureContexts = Object.values(Applications).map(
    (app: any) => app.url.host
);
const securityChecks = new SecurityChecks(secureContexts);

new App(Applications.CHECKOUT, Applications.MAIN, securityChecks);
