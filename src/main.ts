import { Paquet } from './Paquet';
import { Joueur } from './Joueur';
import { ComparateurMains } from './Comparateur';
import { Jeu } from './Jeu';

function main() {
    console.log("Début de la partie de Poker !");
    
    const jeu = new Jeu(['Joueur 1', 'Joueur 2']);
    
    jeu.demarrerPartie();
    
    jeu.joueurs.forEach(joueur => {
        console.log(`${joueur.nom} a : ${joueur.main.map(carte => `${carte.valeur}${carte.couleur}`).join(', ')}`);
    });
    
    const gagnant = jeu.determinerGagnant();
    if (gagnant === 1) {
        console.log("Le gagnant est Joueur 1 !");
    } else if (gagnant === 2) {
        console.log("Le gagnant est Joueur 2 !");
    } else {
        const meilleurJoueur = jeu.determinerGagnantEnCasDEgalite();
        if (meilleurJoueur === 1) {
            console.log("Égalité, mais Joueur 1 a la meilleure main !");
        } else if (meilleurJoueur === 2) {
            console.log("Égalité, mais Joueur 2 a la meilleure main !");
        } else {
            console.log("Égalité parfaite !");
        }
    }
}

main();
