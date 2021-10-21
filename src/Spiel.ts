import { v4 as uuidv4 } from 'uuid';
import Karte from './value-types/Karte';

export default class Spiel {
    get id() { 
        return this._id;
    }
    private readonly _id: string = uuidv4();

    get deck() {
        return this._deck;
    }
    private readonly _deck: ReadonlyArray<Karte> = [];

    get spieler() {
        return this._spieler;
    }
    private readonly _spieler: ReadonlyArray<Spieler> = [];

    starten(spielkarten: Karte[], spieler: Spieler[]) {
        throw new Error('Method not implemented');
    }
}