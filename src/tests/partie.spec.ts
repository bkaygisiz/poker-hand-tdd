import { describe, it, expect, vi } from 'vitest';
import { Paquet } from '../Paquet';
import { Joueur } from '../Joueur';
import { ComparateurMains } from '../Comparateur'
import { Jeu } from '../Jeu';

describe('Partie complète de Poker', () => {
    it('Partie complete avec J1 gagnant grace a une main predefinie', () => {
        const jeu = new Jeu(['Joueur 1', 'Joueur 2']);
        
        // Mock de recevoirCartes pour assigner des mains spécifiques
        vi.spyOn(jeu.joueurs[0], 'recevoirCartes').mockImplementation(function (this: Joueur) {
            this.main = [
                { valeur: 'A', couleur: '♥' },
                { valeur: 'K', couleur: '♥' },
                { valeur: 'Q', couleur: '♥' },
                { valeur: 'J', couleur: '♥' },
                { valeur: '10', couleur: '♥' }
            ];
        });

        vi.spyOn(jeu.joueurs[1], 'recevoirCartes').mockImplementation(function (this: Joueur) {
            this.main = [
                { valeur: '2', couleur: '♠' },
                { valeur: '3', couleur: '♠' },
                { valeur: '4', couleur: '♠' },
                { valeur: '5', couleur: '♠' },
                { valeur: '6', couleur: '♠' }
            ];
        });

        jeu.demarrerPartie();

        expect(jeu.joueurs[0].main.length).toBe(5);
        expect(jeu.joueurs[1].main.length).toBe(5);

        const gagnant = jeu.determinerGagnant();
        expect(gagnant).toBe(1); // Joueur 1 devrait gagner avec une quinte flush royale
    });

    it('devrait déclarer un gagnant avec un full contre une couleur', () => {
        const jeu = new Jeu(['Joueur 1', 'Joueur 2']);
        
        vi.spyOn(jeu.joueurs[0], 'recevoirCartes').mockImplementation(function (this: Joueur) {
            this.main = [
                { valeur: 'K', couleur: '♦' },
                { valeur: 'K', couleur: '♠' },
                { valeur: 'K', couleur: '♣' },
                { valeur: '10', couleur: '♥' },
                { valeur: '10', couleur: '♦' }
            ];
        });

        vi.spyOn(jeu.joueurs[1], 'recevoirCartes').mockImplementation(function (this: Joueur) {
            this.main = [
                { valeur: 'A', couleur: '♣' },
                { valeur: 'J', couleur: '♣' },
                { valeur: '9', couleur: '♣' },
                { valeur: '5', couleur: '♣' },
                { valeur: '3', couleur: '♣' }
            ];
        });

        jeu.demarrerPartie();
        const gagnant = jeu.determinerGagnant();
        expect(gagnant).toBe(1); // Joueur 1 gagne avec un full contre une couleur
    });

    it('devrait gérer une égalité entre deux brelans de même valeur', () => {
        const jeu = new Jeu(['Joueur 1', 'Joueur 2']);
        
        vi.spyOn(jeu.joueurs[0], 'recevoirCartes').mockImplementation(function (this: Joueur) {
            this.main = [
                { valeur: 'Q', couleur: '♠' },
                { valeur: 'Q', couleur: '♥' },
                { valeur: 'Q', couleur: '♦' },
                { valeur: '8', couleur: '♣' },
                { valeur: '6', couleur: '♠' }
            ];
        });

        vi.spyOn(jeu.joueurs[1], 'recevoirCartes').mockImplementation(function (this: Joueur) {
            this.main = [
                { valeur: 'Q', couleur: '♣' },
                { valeur: 'Q', couleur: '♦' },
                { valeur: 'Q', couleur: '♠' },
                { valeur: '8', couleur: '♦' },
                { valeur: '6', couleur: '♣' }
            ];
        });

        jeu.demarrerPartie();
        const gagnant = jeu.determinerGagnant();
        expect(gagnant).toBe(0); // Égalité entre deux brelans de même valeur
    });
});

