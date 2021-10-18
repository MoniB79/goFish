describe('Spielablauf GoFish testen', () => {
    it('52 Karten vorbereiten', () => {
        const spielkartenFactory = new SpielkartenFactory();

        const karten: Karte[] = spielkartenFactory.erzeugen();

        expect(karten.length).toBe(52);
    })
})