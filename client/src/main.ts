import "./main.css";

import { SecurityChecks } from "../lib/messaging/src/SecurityChecks";
import { Applications } from "./scripts/Constant";
import { App } from "./scripts/App";

const secureContexts = Object.values(Applications).map(app => app.url.host);
const securityChecks = new SecurityChecks(secureContexts);

new App(Applications.CHECKOUT, Applications.MAIN, securityChecks);
