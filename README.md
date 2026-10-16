# Einstein's Riddle Solver (JavaScript)

Ein kleines Node.js-Skript, das das Einstein-Rätsel mithilfe eines Brute-Force- und Backtracking-Ansatzes löst und die Frage beantwortet, wer den Fisch hält.

## Voraussetzungen

Um das Programm auszuführen, benötigt man [Node.js](https://nodejs.org/).

* **Debian / Ubuntu / Derivate:**

  ```
  sudo apt install nodejs
  
  ```

* **Arch Linux / Derivate:**

  ```
  pacman -S nodejs
  
  ```

## Ausführung

Zum Ausführen folgender Befehl in der Command Line:

```
node riddle.js

```

Das Skript berechnet die Lösung, gibt eine übersichtliche Tabelle der fünf Häuser in der Konsole aus und zeigt am Ende direkt an, wer den Fisch besitzt.

## Funktionsweise

Das Programm löst das Logikrätsel algorithmisch durch systematisches Durchprobieren (Brute Force mit frühzeitigen Abbrüchen):

1. **Permutationen generieren:** Für jede der fünf Kategorien (Nationen, Hausfarben, Getränke, Zigarettenmarken und Haustiere) werden alle $120$ möglichen Anordnungen ($5! = 5 \times 4 \times 3 \times 2 \times 1$) als Arrays ermittelt.

2. **Backtracking / Filterung:** Mithilfe verschachtelter Schleifen und `continue`-Bedingungen werden die Einschränkungen und Hinweise des Rätsels (z. B. *„Der Norweger wohnt im ersten Haus“*, *„Der Brite lebt im roten Haus“*) Schritt für Schritt geprüft.

3. **Frühzeitiger Abbruch:** Ungültige Kombinationen werden sofort verworfen, noch bevor alle Kategorien vollständig durchlaufen sind.

4. **Ergebnis:** Sobald eine Kombination alle Bedingungen erfüllt, wird sie als Tabelle ausgegeben.
