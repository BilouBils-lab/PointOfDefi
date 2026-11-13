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
- `CAM_NOTE` : conseils par appareil, en version jour et nuit.
- État dans `localStorage`, clé `defis-photo-v1` : `{themes, levels, cam, history}`. Toujours entourer les accès de `try/catch`.
- `pickToday()` : défi déterministe selon un hash de la date (hors défis avec `req`). `pickRandom()` (bouton « Défi pour maintenant ») : tirage filtré par les réglages, pondéré par `score()`, en évitant les 10 derniers défis réalisés.

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

## Tester

Ouvrir `index.html` dans un navigateur ; vérifier en largeur mobile et en mode sombre. Pour tester une météo, simuler la réponse d'Open-Meteo (par exemple avec Playwright, `page.route`).
