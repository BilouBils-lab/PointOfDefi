# CLAUDE.md

## Projet

« Défis photo » : application web personnelle qui propose des défis photo quotidiens. Interface et contenus en français (tutoiement).

## Structure

Tout tient dans `index.html` : HTML, CSS et JavaScript inline, sans build ni dépendance (hors polices Google Fonts : Young Serif et Instrument Sans).

## Code (dans le `<script>`)

- `THEMES`, `LEVELS`, `CAMS` : libellés des thèmes, difficultés et appareils.
- `D` : la liste des défis. Champs : `id` (préfixe du thème + numéro, ex. `n3`), `t` (thème), `n` (difficulté 1–3), `titre`, `brief`, `astuce`, `reg` (réglages affichés en étiquettes), et en option `nuit: true` (choisit la note appareil « nuit ») et `mois: [...]` (mois où le défi est disponible).
- `BONUS` : contraintes bonus tirées au hasard.
- `CAM_NOTE` : conseils par appareil, en version jour et nuit.
- État dans `localStorage`, clé `defis-photo-v1` : `{themes, levels, cam, history}`. Toujours entourer les accès de `try/catch`.
- `pickToday()` : défi déterministe selon un hash de la date. `pickRandom()` : tirage filtré par les réglages, en évitant les 10 derniers défis réalisés.

## Conventions

- Couleurs en variables CSS sur `:root`, avec un thème sombre (`prefers-color-scheme` et `data-theme`).
- Garder un seul fichier, sans framework.
- Pour ajouter un défi : un objet dans `D` avec un `id` unique.
- Typographie française : apostrophes typographiques (’), guillemets « ».

## Tester

Ouvrir `index.html` dans un navigateur ; vérifier en largeur mobile et en mode sombre.
