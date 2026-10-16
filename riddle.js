// 1) Es gibt fünf Häuser mit je einer anderen Farbe
// 2) In jedem Haus wohnt eine Person einer anderen Nationalität
// 3) Jeder Hausbewohner bevorzugt ein bestimmtes Getränk, raucht eine bestimmte Zigarettenmarke und hält ein bestimmtes Haustier
// 4) Keine der 5 Personen bevorzugt das gleiche Getränk, raucht die gleiche Zigarettenmarke oder hält das gleiche Tier wie irgend eine der anderen Personen

// 5) Der Brite lebt im roten Haus
// 6) Der Schwede hält einen Hund
// 7) Der Däne trinkt gerne Tee
// 8) Der Deutsche raucht Rothmanns
// 9) Der Besitzer des grünen Hauses trinkt Kaffee
// 10) Der Winfield-Raucher trinkt gerne Bier
// 11) Der Norweger wohnt im ersten Haus
// 12) Der Norweger wohnt neben dem blauen Haus
// 13) Der Besitzer des gelben Hauses raucht Dunhill
// 14) Die Person, die Pall Mall raucht, hält einen Vogel
// 15) Der Mann, der im mittleren Haus wohnt, trinkt Milch
// 16) Das grüne Haus steht unmittelbar links vom weißen Haus
// 17) Der Marlboro-Raucher wohnt neben dem, der eine Katze hält
// 18) Der Marlboro-Raucher hat einen Nachbarn, der Wasser trinkt
// 19) Der Mann, der ein Pferd hält, wohnt neben dem, der Dunhill raucht
// Frage: wer hält einen Fisch als Haustier?

// Ansatz mit Brute Force und Backtracking

// Hilfsfunktion zur Generierung aller Permutationen eines Arrays
// Generiert alle 120 möglichen Reihenfolgen eines Arrays
function getPermutations(arr) {
    if (arr.length <= 1) return [arr];
    let result = [];
    for (let i = 0; i < arr.length; i++) {
        let current = arr[i];
        let remaining = arr.slice(0, i).concat(arr.slice(i + 1));
        for (let p of getPermutations(remaining)) {
            result.push([current, ...p]);
        }
    }
    return result;
}

function solveRiddle() {
    const nationen = ["Brite", "Schwede", "Daene", "Deutscher", "Norweger"];
    const farben = ["rot", "gruen", "blau", "gelb", "weiss"];
    const getraenke = ["Tee", "Kaffee", "Milch", "Bier", "Wasser"];
    const zigaretten = ["Rothmanns", "Winfield", "Dunhill", "Pall Mall", "Marlboro"];
    const tiere = ["Hund", "Vogel", "Katze", "Pferd", "Fisch"];

    // Permutationen für alle Kategorien
    const alleNationenPerms = getPermutations(nationen);
    const alleFarbenPerms = getPermutations(farben);
    const alleGetraenkePerms = getPermutations(getraenke);
    const alleZigarettenPerms = getPermutations(zigaretten);
    const alleTierePerms = getPermutations(tiere);

    // Verschachtelte Schleifen mit Abbrichbedingungen continue
    for (let n of alleNationenPerms) {
        // Bedingung 11: Der Norweger wohnt im ersten Haus
        if (n[0] !== "Norweger") continue;

        // Überprüfen der Farben
        for (let f of alleFarbenPerms) {
            // Bedingung 5: Der Brite lebt im roten Haus
            if (f[n.indexOf("Brite")] !== "rot") continue;

            // Bedingung 16: Das grüne Haus steht unmittelbar links vom weißen Haus
            let gruenIdx = f.indexOf("gruen");
            let weissIdx = f.indexOf("weiss");
            if (weissIdx !== gruenIdx + 1) continue;

            // Bedingung 12: Der Norweger wohnt neben dem blauen Haus
            let blauIdx = f.indexOf("blau");
            if (Math.abs(0 - blauIdx) !== 1) continue;

            // Überprüfen der Getränke
            for (let g of alleGetraenkePerms) {
                // Bedingung 7: Der Däne trinkt gerne Tee
                if (g[n.indexOf("Daene")] !== "Tee") continue;
                // Bedingung 9: Der Besitzer des grünen Hauses trinkt Kaffee
                if (g[gruenIdx] !== "Kaffee") continue;
                // Bedingung 15: Der Mann im mittleren Haus trinkt Milch
                if (g[2] !== "Milch") continue;

                // Überprüfen der Zigaretten
                for (let z of alleZigarettenPerms) {
                    // Bedingung 8: Der Deutsche raucht Rothmanns
                    if (z[n.indexOf("Deutscher")] !== "Rothmanns") continue;
                    // Bedingung 10: Der Winfield-Raucher trinkt gerne Bier
                    if (z[g.indexOf("Bier")] !== "Winfield") continue;
                    // Bedingung 13: Der Besitzer des gelben Hauses raucht Dunhill
                    if (z[f.indexOf("gelb")] !== "Dunhill") continue;

                    // Überprüfen der Tiere
                    for (let t of alleTierePerms) {
                        // Bedingung 6: Der Schwede hält einen Hund
                        if (t[n.indexOf("Schwede")] !== "Hund") continue;
                        // Bedingung 14: Pall Mall Raucher hält einen Vogel
                        if (t[z.indexOf("Pall Mall")] !== "Vogel") continue;

                        // Bedingung 17: Marlboro-Raucher wohnt neben dem, der eine Katze hält
                        let marlboroIdx = z.indexOf("Marlboro");
                        let katzeIdx = t.indexOf("Katze");
                        if (Math.abs(marlboroIdx - katzeIdx) !== 1) continue;

                        // Bedingung 18: Marlboro-Raucher hat Nachbarn, der Wasser trinkt
                        let wasserIdx = g.indexOf("Wasser");
                        if (Math.abs(marlboroIdx - wasserIdx) !== 1) continue;

                        // Bedingung 19: Pferd-Halter wohnt neben Dunhill-Raucher
                        let pferdIdx = t.indexOf("Pferd");
                        let dunhillIdx = z.indexOf("Dunhill");
                        if (Math.abs(pferdIdx - dunhillIdx) !== 1) continue;

                        // Wenn alle Bedingungen erfüllt sind -> Ergebnis
                        let solution = [];
                        for (let i = 0; i < 5; i++) {
                            solution.push({
                                haus: i + 1,
                                farbe: f[i],
                                nation: n[i],
                                getraenk: g[i],
                                zigarette: z[i],
                                tier: t[i]
                            });
                        }
                        return solution;
                    }
                }
            }
        }
    }
    return null;
}
const outcome = solveRiddle();
if (outcome) {
    console.log("Found solution:\n");
    console.table(outcome);

    const fischHalter = outcome.find(h => h.tier === "Fisch");
    console.log(`Der ${fischHalter.nation} hält den Fisch.`);
} else {
    console.log("Found no solution");
}
