export class Carte {
    constructor(public valeur: string, public couleur: string) {}

    toString(): string {
        return `${this.valeur}${this.couleur}`;
    }
}