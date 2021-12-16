import Karte from "../src/value-types/Karte"
import SpielkartenFactory from "../src/factories/SpielkartenFactory"
import Spiel from "../src/Spiel"
import {Spielerliste} from "../src/Spiel"
import Spieler from "../src/Entities/Spieler";
import { SpielerTyp } from "../src/value-types/SpielerTyp";
import SpielerGewechselt from "../src/domain-events/SpielerGewechselt";
import { Wert } from "../src/value-types/Werte";
import { Farbe } from "../src/value-types/Farbe";

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

    it('Spiel hat 52 Spielkarten und 2 Spieler erhalten', () => {
        const spiel = new Spiel();
        
        jest.spyOn<any, any>(spiel, 'verteileFuenfKartenAnSpieler').mockImplementation();
        spiel.starten(_spielkarten, _spieler);

        expect(spiel.deck.length).toBe(52);
    })

    it('Jedem Spieler 5 zufällige Karten vom Deck geben', () => {
        const spiel = new Spiel();
        spiel.starten(_spielkarten, _spieler);
        expect(spiel.deck.length).toBe(42);
        expect(spiel.spieler[0].karten.length).toBe(5);
        expect(spiel.spieler[1].karten.length).toBe(5);
    })

    it('Nächster Spieler an der Reihe', (done) => {
        const spiel = new Spiel();

        spiel.spielerGewechselt.subscribe((spielerGewechselt) => {
            expect(spiel.aktuellerSpielerId).toBe(_spieler[0].id);
            expect(spielerGewechselt.neuerSpielerId).toBe(_spieler[0].id);

            done();
        })

        spiel.starten(_spielkarten, _spieler);

    });
    it('Spieler fragt Gegenspieler nach vorhandenen Karten mit Wert, dann erhält Spieler die Karten...', (done) => {
        const computerSpieler = _spieler[1];
        computerSpieler.kartenNehmen([
            new Karte(Farbe.Herz, Wert.Fünf),
            new Karte(Farbe.Karo, Wert.Fünf)
        ]);
        const spiel = new Spiel();

        spiel.spielerGewechselt.subscribe( (SpielerGewechselt) => {
            spiel.spielerFragtNachKarten(spiel.spieler[1].id, Wert.Fünf);
        })

        spiel.spielerHatKartenErhalten.subscribe((kartenErhaltenVomSpieler) => {
            expect(kartenErhaltenVomSpieler.spielerId).toBe(_spieler[0].id);
            expect(kartenErhaltenVomSpieler.erhalteneKarten.length).toBeGreaterThanOrEqual(2);
            expect(kartenErhaltenVomSpieler.erhalteneKarten[0].wert).toBe(Wert.Fünf);
            expect(kartenErhaltenVomSpieler.erhalteneKarten[1].wert).toBe(Wert.Fünf);
            expect(spiel.spieler[0].karten.filter(karten => karten.wert === Wert.Fünf).length).toBeGreaterThanOrEqual(2);
            expect(spiel.spieler[1].karten.filter(karten => karten.wert === Wert.Fünf).length).toBe(0);

            done();
        })

        spiel.starten(_spielkarten, _spieler);

    });
})