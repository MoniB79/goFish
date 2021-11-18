import { v4 as uuid4 } from 'uuid';
import Karte from '../value-types/Karte';
import { SpielerTyp } from '../value-types/SpielerTyp';

export default class Spieler {
    get id() {return this._id;}
    private readonly _id: string = uuid4();
    
    get karten() {return this._karten;}
    private _karten: ReadonlyArray<Karte> = [];

    get saetze() {return this._saetze;}
    private _saetze: ReadonlyArray<Karte> = [];

    constructor(public readonly name: string, public readonly spielerType: SpielerTyp) {


    }
}