# CLAUDE.md

## Projet

« Défis photo » : application web personnelle qui propose des défis photo quotidiens. Interface et contenus en français (tutoiement).

## Structure

Tout tient dans `index.html` : HTML, CSS et JavaScript inline, sans build ni dépendance (hors polices Google Fonts : Young Serif et Instrument Sans).

## Code (dans le `<script>`)

- `THEMES`, `LEVELS`, `CAMS` : libellés des thèmes, difficultés et appareils.
- `D` : la liste des défis. Champs : `id` (préfixe du thème + numéro, ex. `n3`), `t` (thème), `n` (difficulté 1–3), `titre`, `brief`, `astuce`, `reg` (réglages affichés en étiquettes), et en option `nuit: true` (choisit la note appareil « nuit ») et `mois: [...]` (mois où le défi est disponible).
- Champs de contexte des défis : `ou` (`"in"`, `"out"` ou `"any"`), `pref` (conditions où le défi brille : `clair`, `nuageux`, `brouillard`, `pluie`, `neige`, `vent`, `jour`, `doree`, `bleue`, `nuit`), `req` (conditions obligatoires : le défi n'est proposé que si elles sont réunies, et jamais en « Défi du jour »).
- `BONUS` : contraintes bonus tirées au hasard.
- `obj` (champ des défis) : type d'objectif conseillé, `grand`, `normal`, `portrait`, `tele`, `lumineux` ou `macro`.
- État dans `localStorage`, clé `defis-photo-v1` : `{themes, levels, cam, history, gear, geo}`. Toujours entourer les accès de `try/catch`.
- `pickToday()` : défi déterministe selon un hash de la date (hors défis avec `req`). `pickRandom()` (bouton « Défi pour maintenant ») : tirage filtré par les réglages, pondéré par `score()`, en évitant les 10 derniers défis réalisés.

## Matériel

- `state.gear` : `{cams:[{id, nom, capteur, isoMax, monture}], lenses:[{id, nom, fmin, fmax, ouv, macro, monture?, cams:[ids d'appareils compatibles]}]}`. Valeurs par défaut dans `DEFAULT_GEAR` ; `state.cam` est l'id de l'appareil du jour.
- `CAPTEURS` : type de capteur et coefficient de recadrage (`crop`). `MONTURES` : monture d'un appareil (`cam.monture`).
- Recherche d'objectifs : `CATALOGUE` (liste intégrée `[nom, monture, fmin, fmax, ouv, macro]`, montures RF, RF-S, EF, EF-S, EF-M), `COMPAT` (monture appareil → monture objectif : `"natif"` ou nom de l'adaptateur), `recadre()` (objectif APS-C sur plein format), `renderSearch()`, `addFromCatalogue()`. Pour ajouter un objectif au catalogue : une ligne dans `CATALOGUE`, valeurs vérifiées sur la fiche du fabricant. La recherche ignore le mot « canon » et met la correspondance exacte en premier.
- `gearAdvice(c, nuit)` : texte du bloc appareil. `bestLens()` choisit l'objectif selon `OBJ` (plage de focale équivalente visée) ; `FAUTE` quand aucun objectif ne la couvre.
- Écran « Mon matériel » : `<dialog id="gearDlg">`, rendu par `renderGear()`, modifications via `onGearInput` (événements délégués). En-tête collant (`.dlg-top`) avec « Fermer » et « Rechercher un objectif » (`gotoSearch()`). Pendant que la fenêtre est ouverte, la page derrière est bloquée (`lockPage()` / `unlockPage()` sur l'événement `close`, plus `overscroll-behavior: contain`). Ne pas redessiner la liste pendant la saisie (ça fait perdre le champ en cours) ; échapper les noms saisis avec `esc()`.

## Contexte (lieu, météo, lumière)

- Gratuit, sans IA ni clé API : géolocalisation du navigateur et API Open-Meteo (sans clé, CORS ouvert). Ne jamais mettre de clé secrète dans le dépôt, il est publié tel quel sur GitHub Pages.
- `locate()` demande la position (mémorisée dans `state.geo`), sinon Nancy par défaut (`NANCY`). Coordonnées arrondies à 0,01° avant envoi.
- `loadContext()` construit `ctx` : `{temp, cat, vent, light, nancy, sr, ss}`. Météo en cache 30 min (clé `defis-photo-meteo`).
- `score(c)` : 0 si `req` non rempli ou défi Nancy hors de Nancy, bonus selon `POIDS` pour chaque `pref` remplie, pénalité pour l'extérieur sous la pluie ou la nuit, bonus pour l'intérieur. `reasons(c)` alimente le bloc « Pourquoi maintenant ».

## Conventions

- Couleurs en variables CSS sur `:root`, avec un thème sombre (`prefers-color-scheme` et `data-theme`).
- Garder un seul fichier, sans framework.
- Pour ajouter un défi : un objet dans `D` avec un `id` unique.
- Typographie française : apostrophes typographiques (’), guillemets « ».

## Workflow Git

- Augmenter `VERSION` (en haut du script, affichée en bas de l'app) dans chaque PR qui modifie `index.html` : c'est le seul moyen pour le propriétaire de vérifier que son navigateur n'affiche pas une ancienne version gardée en mémoire.

- Ne jamais pousser directement sur `main` : `main` est publiée telle quelle sur GitHub Pages (https://biloubils-lab.github.io/PointOfDefi/).
- Travailler sur une branche, la pousser, puis ouvrir une pull request vers `main`, avec une description en français (quoi, pourquoi, comment c'est testé).
- Une fois le changement testé, Claude fusionne lui-même la PR (le propriétaire l'a demandé) et donne le lien au propriétaire. Le site se met à jour automatiquement après la fusion.
- Un changement par PR, petit et facile à relire.

## Tester

Ouvrir `index.html` dans un navigateur ; vérifier en largeur mobile et en mode sombre. Pour tester une météo, simuler la réponse d'Open-Meteo (par exemple avec Playwright, `page.route`).
