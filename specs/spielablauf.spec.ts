import Karte from "../src/value-types/Karte"
import SpielkartenFactory from "../src/factories/SpielkartenFactory"

describe('Spielablauf GoFish testen', () => {
    it('52 Karten vorbereiten', () => {
        const spielkartenFactory = new SpielkartenFactory();

        const karten: Karte[] = spielkartenFactory.erzeugen();

        expect(karten.length).toBe(52);
    })
})