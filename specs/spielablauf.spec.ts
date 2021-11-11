import Karte from "../src/value-types/Karte"
import SpielkartenFactory from "../src/factories/SpielkartenFactory"
import Spiel from "../src/Spiel"
import {Spielerliste} from "../src/Spiel"
import Spieler from "../src/Entities/Spieler";
import { SpielerTyp } from "../src/value-types/SpielerTyp";

describe('Spielablauf GoFish testen', () => {
    let _spielkarten: Karte[];
    let _spieler: Spielerliste;

    beforeEach( () => {
        const spielkartenFactory = new SpielkartenFactory();
        _spielkarten = spielkartenFactory.erzeugen();
        _spieler = [new Spieler('Gregor', SpielerTyp.Mensch), new Spieler('Lorem', SpielerTyp.Computer)];
    })
    it('52 Karten vorbereiten', () => {
        const spielkartenFactory = new SpielkartenFactory();
        const karten: Karte[] = spielkartenFactory.erzeugen();

        expect(karten.length).toBe(52);
    })

    it('Spiel hat 52 Spielkarten erhalten', () => {
        const spiel = new Spiel();
        

        spiel.starten(_spielkarten, _spieler);

        expect(spiel.deck.length).toBe(52);
    })
})