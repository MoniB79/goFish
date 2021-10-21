import Karte from "../src/value-types/Karte"
import SpielkartenFactory from "../src/factories/SpielkartenFactory"

describe('Spielablauf GoFish testen', () => {
    it('52 Karten vorbereiten', () => {
        const spielkartenFactory = new SpielkartenFactory();

        const karten: Karte[] = spielkartenFactory.erzeugen();

        expect(karten.length).toBe(52);
    })

    it('Spiel hat 52 Spielkarten erhalten', () => {
        const spiel = new Spiel();
        spiel.starten(spielkarten, spieler);

        expect(spiel.deck.length).toBe(52);
    })
})