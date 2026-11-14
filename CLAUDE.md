# CLAUDE.md

## Projet

« Défis photo » : application web personnelle qui propose des défis photo quotidiens. Interface et contenus en français (tutoiement).

## Structure

L'app tient dans `index.html` : HTML, CSS et JavaScript inline, sans build ni dépendance (hors polices Google Fonts : Instrument Sans pour l'interface, Cinzel pour le logo). S'y ajoutent les fichiers de l'app installable : `manifest.webmanifest`, `sw.js` (service worker) et `icons/` (192, 512, maskable 512, apple-touch-icon 180 : crochets et cercle du viseur, point doré).

## App installable (PWA)

- `sw.js` : la page est chargée d'abord depuis le réseau sans cache HTTP (toujours la dernière version), sinon depuis le cache (hors connexion) ; icônes et manifeste depuis le cache ; polices Google en cache mis à jour en arrière-plan ; météo, Gemini et `?maj=` passent directement par le réseau. **Changer `CACHE` dans `sw.js` en même temps que `VERSION`.**
- `index.html` : enregistre `sw.js` (https ou localhost), `verifierMaj()` compare la `VERSION` publiée (au plus toutes les 10 min, au retour sur l'app) et affiche la bannière `#maj` ; Réglages → « Installer l'app » (`instRender()`, invite `beforeinstallprompt` ou étapes iPhone/Android) ; première ouverture de l'app installée sans données : astuce `#tipRestore` vers la sauvegarde (sur iPhone, l'app installée ne partage pas son stockage avec Safari).
- Tester avec un serveur local (`python3 -m http.server`), pas en `file://` (pas de service worker).

## Interface

- Style léger : noir, blanc et or (comme le logo « Point of Nabil »), variables `--bg`, `--surface`, `--surface-2`, `--ink`, `--soft`, `--line`, `--accent`, `--accent-ink`, `--accent-soft`, `--ok`, `--danger` (thèmes clair et sombre).
- Logo : SVG inline provisoire (`.logo`, `currentColor`, texte en Cinzel), redessiné d'après une capture ; à remplacer par le fichier original. Favicon : crochets + cercle du viseur (data URI SVG).
- Écran principal : en-tête en grille (logo et `#stats` sur la même ligne, statistiques sur deux lignes centrées sur le texte du logo, « Défis photo » dessous ; `viewBox` du logo recadré au plus près du dessin pour l'aligner à gauche), bouton `#stats` qui ouvre l'historique, pastilles de contexte (`#ctx`, `.pill`, `.pill.moment` ouvre le planning), carte du défi (`.card.viewfinder`, coins dorés), bouton « Je l'ai fait » (devient « Défi suivant » une fois réalisé), « Changer de défi » (`#change`) et compteur de jokers (`#quota`). La pastille du moment ouvre « Là, maintenant, je suis… ».
- Barre d'onglets fixe en bas (`.tabbar`) : Défi, Planning (`#openPlan`), Matériel (`#gear`), Réglages (`#openSet`).
- Tiroirs `dialog.sheet` (montent du bas sur téléphone, centrés sur grand écran) : `#gearDlg`, `#planDlg`, `#setDlg` (thèmes, difficulté, IA, historique, à propos). `openSheet()` bloque la page ; croix `[data-close]`, clic à côté ou Échap pour fermer. Un style qui fixe `display` doit prévoir `[hidden]{display:none}`.

## Code (dans le `<script>`)

- `THEMES`, `LEVELS` : libellés des thèmes et difficultés (les appareils sont dans `state.gear`).
- Vérifier chaque écran sur un téléphone étroit (320 à 390 px), en clair et en sombre.
- `D` : la liste des défis (thèmes `nancy`, `boulot`, `famille`, `maison` (préfixe `h`), `couleurs` (préfixe `c`), `proche` (« Près de chez moi », préfixe `p` : rue, canal, quartier), `loisirs` (dont Lego, figurines manga, mangas), `technique` ; préfixe `m` pour les défis météo).
- **Défis à variantes** (`tpl:1`, `vars:["couleur"|"objet"|"forme"|"lettre"|"paire"]`) : textes avec `{au_couleur}`, `{le_couleur}`, `{couleur}`, `{objet}`, `{objets}`, `{un_objet}`, `{Le_objet}`, `{d_objet}`, `{differents}`, `{es}`, `{formes}`, `{les_formes}`, `{lettre}`, `{paire}` ; listes `COULEURS`, `OBJETS` (avec genre), `FORMES`, `LETTRES`, `PAIRES`. `poser()` tire les variantes (`tirerVariantes()`, selon la date pour le défi du jour) et `instancier()` remplit les textes ; la variante est gardée dans `state.encours.var` et reprise au chargement. Pour un nouvel objet : vérifier les accords (genre, élision). Champs : `id` (préfixe du thème + numéro, ex. `n3`), `t` (thème), `n` (difficulté 1–3), `titre`, `brief`, `astuce`, `reg` (réglages affichés en étiquettes), et en option `nuit: true` (choisit la note appareil « nuit ») et `mois: [...]` (mois où le défi est disponible).
- Champs de contexte des défis : `ou` (`"in"`, `"out"` ou `"any"`), `pref` (conditions où le défi brille : `clair`, `nuageux`, `brouillard`, `pluie`, `neige`, `vent`, `jour`, `doree`, `bleue`, `nuit`), `req` (conditions obligatoires : le défi n'est proposé que si elles sont réunies, et jamais en « Défi du jour »).
- `BONUS` : contraintes bonus tirées au hasard.
- `obj` (champ des défis) : type d'objectif conseillé, `grand`, `normal`, `portrait`, `tele`, `lumineux` ou `macro`.
- État dans `localStorage`, clé `defis-photo-v1` : `{themes, levels, cam, history, gear, geo, planning}` (`rythme` : ancien format, lu seulement pour la migration). Toujours entourer les accès de `try/catch`.
- **Défi en cours** : `poser(c, bonus)` fixe `current` et l'enregistre dans `state.encours = {date, bonus, id | ia}` ; au chargement, le défi en cours du jour est repris (défi IA reconstruit et nettoyé), sinon `pickToday()`. Un nouveau jour (chargement ou retour sur l'app) donne un nouveau défi du jour. Changer de thème ou de moment (« Là, maintenant ») ne remplace le défi que s'il ne fait plus partie des réglages ou n'est plus faisable.
- **Changer de défi** (`#chgDlg`, `openChange(libre)`, `changerDefi()`) : raison obligatoire (`RAISONS` : matériel, lieu, météo, trop difficile, pas envie). Raisons objectives gratuites dans la limite de 3 par jour (`gratuitsRestants()`), sinon un joker ; « pas envie » coûte un joker, 2 par semaine du lundi au dimanche (`jokersRestants()`, `coutChange()`). Historique dans `state.changes` (60 jours). Défi écarté dans `state.exclus[id] = {raison, jusqua}` : matériel jusqu'à un changement de matériel (`gearChanged()`), lieu et météo jusqu'à la fin du jour, sinon 7 jours ; `exclu(c)` filtre `pickRandom()`. « Trop difficile » : `pickRandom({facile:true})`, plus facile du même thème si possible. Après « Je l'ai fait », le défi suivant est offert (`openChange(true)`). Remplacement par un défi de la liste ou par l'IA (avec les 3 questions `Q` : lumière, temps disponible, envie, pré-remplies par `questionsParDefaut()`) ; un échec de l'IA ne consomme rien.
- `pickToday()` : choisi parmi `pool()` (thèmes et difficultés cochés, défis non écartés) ; les défis avec `req` n'y entrent que si la météo les satisfait. Le défi du jour est marqué `auto` ; s'il a été tiré avant l'arrivée de la météo (`meteo:false`), il est refait une fois quand elle arrive (`loadContext()`). Défi déterministe selon `hash(dayKey())` (date locale, hachage bien mélangé pour que deux jours qui se suivent ne donnent pas deux défis voisins ; hors défis avec `req`). Un nouveau thème doit être ajouté aux réglages enregistrés (voir `state.themesMaison`, `state.themesCouleurs`, `state.themesProche`). `pickRandom()` (bouton « Défi pour maintenant ») : tirage filtré par les réglages, pondéré par `score()`, en évitant les 10 derniers défis réalisés.

## Matériel

- `state.gear` : `{cams:[{id, nom, capteur, isoMax, monture}], lenses:[{id, nom, fmin, fmax, ouv, macro, monture?, cams:[ids d'appareils compatibles]}]}`. Valeurs par défaut dans `DEFAULT_GEAR` ; `state.cam` est l'id de l'appareil du jour.
- `CAPTEURS` : type de capteur et coefficient de recadrage (`crop`). `MONTURES` : monture d'un appareil (`cam.monture`).
- Recherche d'objectifs : `CATALOGUE` (liste intégrée `[nom, monture, fmin, fmax, ouv, macro]`, montures RF, RF-S, EF, EF-S, EF-M), `COMPAT` (monture appareil → monture objectif : `"natif"` ou nom de l'adaptateur), `recadre()` (objectif APS-C sur plein format), `renderSearch()`, `addFromCatalogue()`. Pour ajouter un objectif au catalogue : une ligne dans `CATALOGUE`, valeurs vérifiées sur la fiche du fabricant. La recherche ignore le mot « canon » et met la correspondance exacte en premier.
- **Smartphone** : capteur `phone` (focales équivalentes, `crop` 1) et monture `smartphone` (pas de recherche dans le catalogue). L'iPhone 13 Pro (`ip13`) et ses objectifs ×0,5 (13 mm, macro), ×1 (26 mm, f/1,5), ×3 (77 mm) sont ajoutés une seule fois (`state.iphone13`). `estPhone(cam)`. `PHONE[id]` : `"non"` pour les défis qui demandent un vrai appareil (Manuel intégral, Filé, Traînées de lumière ; exclus par `score()` et `pickToday()`, et remplacés gratuitement si on passe à l'iPhone), sinon un conseil iPhone précis ; `conseilPhone()` en déduit un des réglages du défi (mode Nuit, Live Photo « Pose longue », rafale, ProRAW, verrouillage AE/AF, curseur d'exposition, grille). `gearAdvice()` parle alors en zooms (« Passe en ×3 », « Reste en ×1 »). L'IA reçoit un contexte smartphone (pas d'ouverture ni de vitesse, gestes iPhone).
- `gearAdvice(c, nuit)` : texte du bloc appareil. `bestLens()` choisit l'objectif selon `OBJ` (plage de focale équivalente visée) ; `FAUTE` quand aucun objectif ne la couvre.
- Écran « Mon matériel » (`#gearDlg`) : appareil du jour (contrôle segmenté `#cams`), listes compactes d'appareils et d'objectifs (`.list` > `.item` avec résumé `.row-head` : `.rh-name`, `.rh-meta` via `camMeta()` / `lensMeta()`), fiche dépliée une à la fois (`gearOpen`, `[data-toggle]`). Recherche en haut des objectifs : résultats seulement quand on tape, « Compatible avec » (`#lsFor`) visible seulement pendant la recherche. `onGearInput` met à jour le résumé de la ligne sans redessiner la fiche (sinon la saisie en cours est perdue) ; échapper les noms saisis avec `esc()`. Page bloquée pendant l'ouverture (`lockPage()` / `unlockPage()`, `overscroll-behavior: contain`).

## Mon planning

- `state.planning` : `{0..6: [{type, debut, fin}]}` (0 = dimanche, heures `"HH:MM"`). Créé depuis l'ancien `state.rythme` par `planningDepuisRythme()` (valeurs par défaut `DEFAULT_RYTHME`).
- `TYPES` : `travail`, `tele`, `pause`, `crossfit`, `fils`, `libre` (sortie possible), avec libellé et priorité. Hors créneau : moment `perso`.
- `maintenant()` : créneaux en cours → `{types, principal}`. Une activité (priorité ≥ 4 : travail, télétravail, pause, CrossFit) l'emporte seule ; `libre` et `fils` se cumulent.
- **« Là, maintenant, je suis… »** (`#iciDlg`, ouvert par la pastille du moment `#momentBtn`) : choix rapide `ICI` (maison, fils, sortie, sortie avec le fils, télétravail, travail, CrossFit) gardé dans `state.ici = {cle, jusqua}`. Il remplace le planning pendant 2 h, ou jusqu'au prochain créneau s'il commence avant (et dans plus de 15 min) : `finIci()`. `maintenant()` renvoie le choix s'il est actif (`iciActif()`), sinon `maintenantPlanning()` ; `planningLabel()` décrit le planning seul. « Suivre mon planning » efface le choix ; un nouveau défi est tiré à chaque choix.
- `typeEffectif(slot, jour)` : une pause collée à du télétravail (sans travail au bureau autour), ou isolée dans une journée sans travail au bureau, devient `pausemaison` (pause chez soi ou dans le quartier).
- Champ des défis `quand` : moments où le défi est faisable (`travail`, `tele`, `pause`, `pausemaison`, `crossfit`, `fils`, `perso`, `libre`). Un défi qui demande la lumière du jour ne doit pas avoir `perso` (soirées) ; `req:["soleil"]` = ciel dégagé et jour ou heure dorée. `faisable(c, types)` : le thème `famille` exige `fils` ; un défi `perso` est aussi faisable pendant `fils`.
- `score(c)` renvoie 0 si le défi n'est pas faisable ; si plus rien n'est faisable, `pickRandom()` ignore le planning. `pickToday()` utilise les créneaux du jour plus `perso`.
- Écran : tiroir `#planDlg` (jours en contrôle segmenté `#planDays`), `renderWeek()` (barres, `fils` en moitié basse si la journée a d'autres créneaux), `renderPlanDay()`, copie d'une journée (`planCopy`). Couleurs des créneaux : variables `--k-<type>` (thèmes clair et sombre). Ne pas redessiner les créneaux pendant la saisie d'une heure.

## Contexte (lieu, météo, lumière)

- Gratuit, sans IA ni clé API : géolocalisation du navigateur et API Open-Meteo (sans clé, CORS ouvert). Ne jamais mettre de clé secrète dans le dépôt, il est publié tel quel sur GitHub Pages.
- `locate()` demande la position (mémorisée dans `state.geo`), sinon Nancy par défaut (`NANCY`). Coordonnées arrondies à 0,01° avant envoi. La position exacte (`posPrecise`) reste en mémoire seulement (jamais enregistrée, sauvegardée ni envoyée) et sert aux distances.
- **Défis liés à un lieu** (champ `lieu:{nom, lat, lon}`, coordonnées approximatives) : `distLieu()`, `lieuOk()` (rayon `state.distance` : `pied` 1,5 km par défaut, `velo` 5 km, `voiture` 15 km ; `DISTANCES`, réglage `#distance`), filtrés par `score()` et `pickToday()` ; sans position connue, on ne filtre pas. La carte affiche « 📍 lieu · à x km · environ n min à pied » (`lieuTexte()`). Quand la position arrive, un défi en cours trop lointain est remplacé sans coût ; changer de rayon aussi.
- `loadContext()` construit `ctx` : `{temp, cat, vent, light, nancy, sr, ss, humide}` (`humide` : au moins 1 mm de pluie hier ou aujourd'hui, `past_days=1`, données du jour en dernier). Tags de `ctxTags()` utilisables dans `req` : catégorie de ciel, lumière, `vent`, `soleil`, `humide` (« Ciel dramatique » exige `nuageux`, « Le monde dans une flaque » `humide`). Météo en cache 30 min (clé `defis-photo-meteo`).
- `score(c)` : 0 si `req` non rempli ou défi Nancy hors de Nancy, bonus selon `POIDS` pour chaque `pref` remplie, pénalité pour l'extérieur sous la pluie ou la nuit, bonus pour l'intérieur. `reasons(c)` alimente le bloc « Pourquoi maintenant ».

## Défis IA (Gemini)

- Clé API saisie par le propriétaire dans l'app, stockée uniquement dans `localStorage` (clé `defis-photo-gemini` : `{cle, modele, modeles}`). Jamais de clé dans le dépôt ni dans le code.
- Appels directs depuis le navigateur à `generativelanguage.googleapis.com/v1beta/` (en-tête `x-goog-api-key`) via `geminiFetch()` (messages d'erreur en français : clé refusée, quota, modèle indisponible, réseau).
- `iaTester()` liste les modèles et `classeModeles()` choisit un « flash » stable récent (pas de nom de modèle figé) ; modifiable dans `#iaModel`.
- `defiIA(btn, {q, raison, precedent})` (lance une erreur en cas d'échec) : consigne (dont « pas de soleil inventé sans soleil direct ») + `iaContexte(extra)` (date, créneau, lieu sans coordonnées, météo, lumière, appareil, objectifs, thèmes, difficultés, 15 derniers défis), réponse JSON imposée par `IA_SCHEMA`, validée et tronquée, puis affichée comme un défi (`ia:true`, champ `pourquoi`).
- `genererAvecSecours()` : sur une surcharge (5xx, délai dépassé), un nouvel essai après 2 s puis jusqu'à 2 autres modèles de `ia.modeles` (liste enregistrée au test de la clé, ou récupérée si absente) ; sur 429 ou 404, modèle suivant directement ; clé refusée ou réseau : arrêt.
- `genererAvecSecours(consigne, btn, {parts, schema, temperature, delai, rapide})` : `rapide` désactive la réflexion des modèles Gemini 2.5 Flash (`thinkingConfig.thinkingBudget: 0`), avec nouvel essai sans l'option si elle est refusée (400). Sert aussi au coach (image en `inlineData`, délai de 60 s).
- **Coach photo** (`#coach`, sous les boutons, `renderCoach()` appelé par `render()`, remis à zéro quand le défi change) : l'utilisateur choisit une photo (`#coachFile`) ; `lireExif()` lit sur l'appareil les réglages d'un JPEG (ouverture, vitesse, ISO, focale, appareil, objectif, logiciel) ; un export Lightroom ou autre logiciel coche « Photo retouchée » ; `reduirePhoto()` redimensionne à 1024 px via un canvas (supprime EXIF et GPS) ; `coachAnalyser()` envoie photo + défi + réglages à Gemini, réponse JSON `COACH_SCHEMA` (verdict, note /10, points forts, à améliorer, conseil, retouche). Mode coach : avis seulement, la validation reste au propriétaire (`validerDefi(note)`, note gardée dans `state.history[].note`). `comparerReglages()` compare l'EXIF aux réglages du défi (✓ à un diaphragme près, ≈ à deux ; ouverture ignorée pour un smartphone, focale équivalente `focale35` si présente). Boutons « 📷 Prendre la photo » (`#coachCamFile`, `capture="environment"`) et « 🖼️ Galerie » (`#coachFile`). Rappel de confidentialité, renforcé pour le thème famille et les portraits. Formats : JPEG, PNG, HEIC si le navigateur le décode ; pas de RAW.
- Le texte venant de l'IA est **toujours échappé** au rendu (`E = esc` dans `render()`), comme les titres de l'historique.

## Sauvegarde

- Réglages → Sauvegarde (`#bkSec`) : `sauvegarder()` crée un JSON `{app:"defis-photo", format:1, version, date, donnees:state, ia}` (clé IA seulement si `#bkKey` est cochée), partagé via `navigator.share` sur téléphone ou téléchargé ; date gardée dans `state.derniereSauvegarde`.
- `restaurer()` vérifie `app`, résume le contenu, demande confirmation, écrit `localStorage` puis recharge la page : les mises à niveau et le nettoyage au chargement (objectifs sans `cams`, historique non tableau, créneaux de type inconnu ou mal formés) protègent contre un fichier ancien ou abîmé.

## Conventions

- Couleurs en variables CSS sur `:root`, avec un thème sombre (`prefers-color-scheme` et `data-theme`).
- Garder un seul fichier, sans framework.
- Pour ajouter un défi : un objet dans `D` avec un `id` unique.
- Typographie française : apostrophes typographiques (’), guillemets « ».

## Workflow Git

- Augmenter `VERSION` (numéro seul, sans date ; en haut du script, affiché en bas de l'app) et `CACHE` dans `sw.js` dans chaque PR qui modifie `index.html` : c'est le seul moyen pour le propriétaire de vérifier que son navigateur n'affiche pas une ancienne version gardée en mémoire.

- Ne jamais pousser directement sur `main` : `main` est publiée telle quelle sur GitHub Pages (https://biloubils-lab.github.io/PointOfDefi/).
- Travailler sur une branche, la pousser, puis ouvrir une pull request vers `main`, avec une description en français (quoi, pourquoi, comment c'est testé).
- Une fois le changement testé, Claude fusionne lui-même la PR (le propriétaire l'a demandé) et donne le lien au propriétaire. Le site se met à jour automatiquement après la fusion.
- Un changement par PR, petit et facile à relire.

## Tester

Ouvrir `index.html` dans un navigateur ; vérifier en largeur mobile et en mode sombre. Pour tester une météo, simuler la réponse d'Open-Meteo (par exemple avec Playwright, `page.route`).
