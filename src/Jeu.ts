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
    public determinerGagnantEnCasDEgalite(): number {
        const [joueur1, joueur2] = this.joueurs;
        const valeursOrdre = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        
        const triValeurs = (main: any[]) =>
            main.map(carte => valeursOrdre.indexOf(carte.valeur)).sort((a, b) => b - a);

        const valeurs1 = triValeurs(joueur1.main);
        const valeurs2 = triValeurs(joueur2.main);

        for (let i = 0; i < valeurs1.length; i++) {
            if (valeurs1[i] > valeurs2[i]) return 1;
            if (valeurs2[i] > valeurs1[i]) return 2;
        }

        return 0; // Égalité parfaite
    }
}
