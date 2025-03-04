import { describe, it, expect } from 'vitest';
import { Carte } from "../Carte"
import { Paquet } from '../Paquet'; 
import { Joueur } from '../Joueur';

describe('Distribution des cartes', () => {
    it('devrait distribuer 5 cartes à chaque joueur', () => {
        const paquet = new Paquet();
        const joueur1 = new Joueur('Joueur 1');
        const joueur2 = new Joueur('Joueur 2');

        joueur1.recevoirCartes(paquet.distribuer(5));
        joueur2.recevoirCartes(paquet.distribuer(5));

        expect(joueur1.main.length).toBe(5);
        expect(joueur2.main.length).toBe(5);
    });

    it('devrait retirer les cartes du paquet après distribution', () => {
        const paquet = new Paquet();
        const nombreInitialCartes = paquet.cartes.length;

        const joueur1 = new Joueur('Joueur 1');
        const joueur2 = new Joueur('Joueur 2');

        joueur1.recevoirCartes(paquet.distribuer(5));
        joueur2.recevoirCartes(paquet.distribuer(5));

        expect(paquet.cartes.length).toBe(nombreInitialCartes - 10);
    });
});
