import { Farbe } from "./Farbe";
import { Wert } from "./Werte";
export default class Karte {
    readonly wert: Wert;
    readonly farbe: Farbe;
    constructor(wert: Wert, farbe: Farbe);
}
