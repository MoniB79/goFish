import { Farbe } from "./Farbe";
import { Wert } from "./Werte";

export default class Karte {

    constructor(public readonly wert: Wert, readonly farbe: Farbe) {
        Object.freeze(this);
    }
}