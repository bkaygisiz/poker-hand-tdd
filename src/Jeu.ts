import { Joueur } from "./Joueur";
import { Paquet } from "./Paquet";
import { ComparateurMains } from "./Comparateur";

export class Jeu {
    public joueurs: Joueur[];
    private paquet: Paquet;

    constructor(nomsJoueurs: string[]) {
        this.paquet = new Paquet();
        this.joueurs = nomsJoueurs.map(nom => new Joueur(nom));
    }

    public demarrerPartie(): void {
        this.joueurs.forEach(joueur => joueur.recevoirCartes(this.paquet.distribuer(5)));
    }

    public determinerGagnant(): number {
        const [joueur1, joueur2] = this.joueurs;
        return ComparateurMains.comparerMains(joueur1.main, joueur2.main);
    }
}
