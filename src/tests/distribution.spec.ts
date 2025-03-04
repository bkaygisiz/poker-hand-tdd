import { describe, it, expect } from 'vitest';
//import { Paquet } from './paquet';
//import { Joueur } from './joueur';

class Carte {
    constructor(public valeur: string, public couleur: string) {}

    toString(): string {
        return `${this.valeur}${this.couleur}`;
    }
}

class Paquet {
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

class Joueur {
    public main: Carte[] = [];

    constructor(public nom: string) {}

    recevoirCartes(cartes: Carte[]): void {
        this.main.push(...cartes);
    }

    afficherMain(): string {
        return `${this.nom}: ${this.main.join(' ')}`;
    }
}

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
