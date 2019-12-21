import { ApplicationKeys, Config } from "@scsa/global";
import json from "../../package.json";

export const cfg = new Config(ApplicationKeys.Checkout, "applications");
export const pkg = json;
