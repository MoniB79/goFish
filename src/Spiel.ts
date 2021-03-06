import { NIL as NIL_UUID, v4 as uuidv4 } from 'uuid';
import Karte from './value-types/Karte';
import Spieler from './Entities/Spieler';
import { Subject } from 'rxjs';
import SpielerGewechselt from './domain-events/SpielerGewechselt';
import SpielerHatKartenErhalten from './domain-events/SpielerHatKartenErhalten';
import { Wert } from './value-types/Werte';

export default class Spiel {
    get id() {
        return this._id;
    }
    private readonly _id: string = uuidv4();

    get deck() {
        return this._deck;
    }
    private _deck: ReadonlyArray<Karte> = [];

    get spieler() {
        return this._spieler;
    }
    private _spieler: ReadonlyArray<Spieler> = [];

    get aktuellerSpielerId() {
        return this._aktuellerSpielerId;
    }
    
    private _aktuellerSpielerId: string = NIL_UUID;


    get spielerGewechselt() {
        return this.spielerGewechseltSubject.asObservable();
    }
    private readonly spielerGewechseltSubject = new Subject<SpielerGewechselt>();
    
    get spielerHatKartenErhalten() {
        return this.spielerHatKartenErhaltenSubject.asObservable();
    }
    private readonly spielerHatKartenErhaltenSubject = new Subject<SpielerHatKartenErhalten>();

    starten(spielkarten: Karte[], spieler: Spielerliste) {
        this._deck = [...spielkarten];
        this._spieler = [...spieler];
        this.verteileFuenfKartenAnSpieler();
        this.naechsterSpieler();
    }

    private verteileFuenfKartenAnSpieler() {
        this.spieler.forEach(spieler => {
            for (let index = 0; index < 5; index++) {
                const randomIndex = Math.floor(Math.random() * this.deck.length);
                const deck = [...this.deck];
                const karte: Karte[] = deck.splice(randomIndex, 1);
                spieler.kartenNehmen(karte);
                this._deck = [...deck];
            }
        })
    }

    private naechsterSpieler() {
        if(this.aktuellerSpielerId === NIL_UUID) {
            this._aktuellerSpielerId = this.spieler[0].id;
        }
        this.spielerGewechseltSubject.next(new SpielerGewechselt(this._aktuellerSpielerId));
    }

    spielerFragtNachKarten(gefragterSpielerId: string, kartenWert: Wert) {
        const gefragterSpieler = this.gebeSpieler(gefragterSpielerId);
        const aktuellerSpieler = this.gebeSpieler(this.aktuellerSpielerId);
        const erhalteneKarten = gefragterSpieler.gebeKarten(kartenWert);

        if (erhalteneKarten?.length) {
            aktuellerSpieler.kartenNehmen(erhalteneKarten);
            this.spielerHatKartenErhaltenSubject.next(new SpielerHatKartenErhalten(this.aktuellerSpielerId, [...erhalteneKarten]));
        }
    }
    private gebeSpieler(spielerId: string) {
       const spieler = this.spieler.find(spieler => spieler.id === spielerId);
       if (!spieler) {
           throw new Error(`Es gibt keinen Spieler mit der ID ${spielerId}`);
       }
       return spieler;
    }


}
export type Spielerliste = [Spieler, Spieler] |
[Spieler, Spieler, Spieler] |
[Spieler, Spieler, Spieler, Spieler] |
[Spieler, Spieler, Spieler, Spieler, Spieler] |
[Spieler, Spieler, Spieler, Spieler, Spieler, Spieler];