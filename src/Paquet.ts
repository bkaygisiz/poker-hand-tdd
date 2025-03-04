import { Carte } from "./Carte";

export class Paquet {
    private valeurs = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    private couleurs = ['♥', '♦', '♣', '♠'];
    public cartes: Carte[];

    constructor() {
        this.cartes = this.creerPaquet();
        this.melanger();
    }

    private creerPaquet(): Carte[] {
        return this.valeurs.flatMap(valeur => 
            this.couleurs.map(couleur => new Carte(valeur, couleur))
        );
    }

    private melanger(): void {
        this.cartes.sort(() => Math.random() - 0.5);
    }

    distribuer(nombre: number): Carte[] {
        return this.cartes.splice(0, nombre);
    }
}
