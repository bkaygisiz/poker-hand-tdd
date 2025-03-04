import { describe, it, expect } from 'vitest';
import { Paquet } from '../Paquet';
import { Joueur } from '../Joueur';
import { ComparateurMains } from '../Comparateur';

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

    it('devrait gérer une égalité si les mains sont identiques', () => {
        const joueur1 = new Joueur('Joueur 1');
        const joueur2 = new Joueur('Joueur 2');

        joueur1.recevoirCartes([
            { valeur: 'K', couleur: '♦' },
            { valeur: 'K', couleur: '♣' },
            { valeur: 'K', couleur: '♠' },
            { valeur: 'K', couleur: '♥' },
            { valeur: '10', couleur: '♦' }
        ]);

        joueur2.recevoirCartes([
            { valeur: 'K', couleur: '♦' },
            { valeur: 'K', couleur: '♣' },
            { valeur: 'K', couleur: '♠' },
            { valeur: 'K', couleur: '♥' },
            { valeur: '10', couleur: '♦' }
        ]);

        expect(ComparateurMains.comparerMains(joueur1.main, joueur2.main)).toBe(0);
    });
});

