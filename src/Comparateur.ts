import { Carte } from "./Carte";

export class ComparateurMains {
    private static valeursOrdre = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

    private static evaluerMain(main: Carte[]): number {
        const valeurs = main.map(carte => this.valeursOrdre.indexOf(carte.valeur)).sort((a, b) => b - a);
        const occurrences = valeurs.reduce((acc, val) => {
            acc[val] = (acc[val] || 0) + 1;
            return acc;
        }, {} as Record<number, number>);
        
        const counts = Object.values(occurrences).sort((a, b) => b - a);
        if (counts[0] === 4) return 7; // Carré
        if (counts[0] === 3 && counts[1] === 2) return 6; // Full
        if (this.isFlush(main) && this.isStraight(valeurs)) return valeurs.includes(12) ? 9 : 8; // Quinte Flush Royale ou normale
        if (this.isFlush(main)) return 5; // Couleur
        if (this.isStraight(valeurs)) return 4; // Quinte
        if (counts[0] === 3) return 3; // Brelan
        if (counts[0] === 2 && counts[1] === 2) return 2; // Deux Paires
        if (counts[0] === 2) return 1; // Paire
        return 0; // Carte Haute
    }

    private static isFlush(main: Carte[]): boolean {
        return main.every(carte => carte.couleur === main[0].couleur);
    }

    private static isStraight(valeurs: number[]): boolean {
        valeurs.sort((a, b) => a - b);
        return valeurs.every((val, i) => i === 0 || val === valeurs[i - 1] + 1);
    }

    public static comparerMains(main1: Carte[], main2: Carte[]): number {
        const score1 = this.evaluerMain(main1);
        const score2 = this.evaluerMain(main2);
        
        if (score1 > score2) return 1; // Joueur 1 gagne
        if (score2 > score1) return 2; // Joueur 2 gagne
        return 0; // Égalité
    }
}
