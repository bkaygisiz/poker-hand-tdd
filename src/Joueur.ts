import { Carte } from "./Carte";

export class Joueur {
    public main: Carte[] = [];

    constructor(public nom: string) {}

    recevoirCartes(cartes: Carte[]): void {
        this.main.push(...cartes);
    }

    afficherMain(): string {
        return `${this.nom}: ${this.main.join(' ')}`;
    }
}
