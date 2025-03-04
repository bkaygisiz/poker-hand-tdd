import { describe, it, expect, vi } from 'vitest';
import { Paquet } from '../Paquet';
import { Joueur } from '../Joueur';
import { ComparateurMains } from '../Comparateur';
import { Jeu } from '../Jeu';

describe('Comparaison des mains', () => {
    it('devrait déclarer gagnant le joueur avec la meilleure main donc J1', () => {
        const joueur1 = new Joueur('Joueur 1');
        const joueur2 = new Joueur('Joueur 2');

        joueur1.recevoirCartes([
            { valeur: 'A', couleur: '♥' },
            { valeur: 'K', couleur: '♥' },
            { valeur: 'Q', couleur: '♥' },
            { valeur: 'J', couleur: '♥' },
            { valeur: '10', couleur: '♥' }
        ]);

        joueur2.recevoirCartes([
            { valeur: '2', couleur: '♠' },
            { valeur: '3', couleur: '♠' },
            { valeur: '4', couleur: '♠' },
            { valeur: '5', couleur: '♠' },
            { valeur: '6', couleur: '♠' }
        ]);

        expect(ComparateurMains.comparerMains(joueur1.main, joueur2.main)).toBe(1);
    });

    it('devrait déclarer Joueur 1 gagnant avec une meilleure combinaison de même score', () => {
        const jeu = new Jeu(['Joueur 1', 'Joueur 2']);
        
        vi.spyOn(jeu.joueurs[0], 'recevoirCartes').mockImplementation(function (this: Joueur) {
            this.main = [
                { valeur: '10', couleur: '♥' },
                { valeur: '10', couleur: '♠' },
                { valeur: '10', couleur: '♦' },
                { valeur: '5', couleur: '♣' },
                { valeur: '5', couleur: '♥' }
            ];
        });

        vi.spyOn(jeu.joueurs[1], 'recevoirCartes').mockImplementation(function (this: Joueur) {
            this.main = [
                { valeur: '9', couleur: '♣' },
                { valeur: '9', couleur: '♦' },
                { valeur: '9', couleur: '♠' },
                { valeur: '6', couleur: '♥' },
                { valeur: '6', couleur: '♦' }
            ];
        });

        jeu.demarrerPartie();
        const gagnant = jeu.determinerGagnantEnCasDEgalite();
        expect(gagnant).toBe(1);
    });

    it('devrait déclarer Joueur 2 gagnant avec une meilleure combinaison de même score', () => {
        const jeu = new Jeu(['Joueur 1', 'Joueur 2']);
        
        vi.spyOn(jeu.joueurs[0], 'recevoirCartes').mockImplementation(function (this: Joueur) {
            this.main = [
                { valeur: '8', couleur: '♥' },
                { valeur: '8', couleur: '♠' },
                { valeur: '8', couleur: '♦' },
                { valeur: '4', couleur: '♣' },
                { valeur: '4', couleur: '♥' }
            ];
        });

        vi.spyOn(jeu.joueurs[1], 'recevoirCartes').mockImplementation(function (this: Joueur) {
            this.main = [
                { valeur: 'J', couleur: '♣' },
                { valeur: 'J', couleur: '♦' },
                { valeur: 'J', couleur: '♠' },
                { valeur: '2', couleur: '♥' },
                { valeur: '2', couleur: '♦' }
            ];
        });

        jeu.demarrerPartie();
        const gagnant = jeu.determinerGagnantEnCasDEgalite();
        expect(gagnant).toBe(2);
    });

    it('devrait détecter une égalité parfaite', () => {
        const jeu = new Jeu(['Joueur 1', 'Joueur 2']);
        
        vi.spyOn(jeu.joueurs[0], 'recevoirCartes').mockImplementation(function (this: Joueur) {
            this.main = [
                { valeur: 'A', couleur: '♥' },
                { valeur: 'K', couleur: '♦' },
                { valeur: 'Q', couleur: '♠' },
                { valeur: 'J', couleur: '♣' },
                { valeur: '10', couleur: '♥' }
            ];
        });

        vi.spyOn(jeu.joueurs[1], 'recevoirCartes').mockImplementation(function (this: Joueur) {
            this.main = [
                { valeur: 'A', couleur: '♠' },
                { valeur: 'K', couleur: '♣' },
                { valeur: 'Q', couleur: '♦' },
                { valeur: 'J', couleur: '♥' },
                { valeur: '10', couleur: '♦' }
            ];
        });

        jeu.demarrerPartie();
        const gagnant = jeu.determinerGagnantEnCasDEgalite();
        expect(gagnant).toBe(0);
    });
});

