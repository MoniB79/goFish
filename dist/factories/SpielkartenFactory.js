"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Farbe_1 = require("../value-types/Farbe");
const Karte_1 = __importDefault(require("../value-types/Karte"));
const Werte_1 = require("../value-types/Werte");
class SpielkartenFactory {
    erzeugen() {
        const karten = [];
        for (const farbe in Farbe_1.Farbe) {
            for (const wert in Werte_1.Wert) {
                karten.push(new Karte_1.default(wert, farbe));
            }
        }
        return karten;
    }
}
exports.default = SpielkartenFactory;
//# sourceMappingURL=SpielkartenFactory.js.map