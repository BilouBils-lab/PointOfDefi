# Défis photo · Point of Nabil

Une petite application web, en un seul fichier, qui propose chaque jour un défi photo pour progresser en s'amusant.

## L'interface

- **Écran principal** : le logo, tes statistiques (touche-les pour voir ton historique), le contexte en pastilles (créneau du planning, lieu, météo, lumière), la carte du défi, puis « Je l'ai fait » et trois choix : « Maintenant », « Défi du jour », « ✨ IA ».
- **Barre d'onglets en bas** : Défi, Planning, Matériel, Réglages. Chaque écran s'ouvre dans un tiroir qui monte du bas ; la croix, un geste à côté ou Échap le referment.
- Style noir, blanc et or, comme le logo, en mode clair ou sombre selon le téléphone.

## Ce que fait l'app

- **Défi du jour** : le même défi pour toute la journée, choisi automatiquement selon la date.
- **Maintenant** : choisit un défi adapté à l'endroit où tu es, à la météo et à la lumière du moment, en évitant ceux faits récemment.
- **Je l'ai fait** : enregistre le défi dans ton historique et fait avancer ta série de jours d'affilée.
- **Contrainte bonus** : une règle en plus (format vertical, noir et blanc, mise au point manuelle…) pour corser le défi.

Chaque défi indique un brief, une astuce, des réglages conseillés (ouverture, vitesse, ISO…) et une note adaptée à l'appareil choisi.

## Défis selon le lieu, la météo et la lumière

En haut de l'app, une ligne résume le contexte : lieu, température, temps qu'il fait, moment de la journée et prochain rendez-vous avec la lumière (heure dorée, coucher du soleil, heure bleue).

- **Météo** : pluie, brouillard, neige ou vent font remonter les défis qui en profitent (« Gouttes sur la vitre », « Brume à la Pépinière »…), et ceux en intérieur quand il fait mauvais.
- **Lumière** : l'heure dorée, l'heure bleue et la nuit favorisent les défis faits pour elles.
- **Lieu** : les défis nancéiens ne sont proposés que si tu es à Nancy.
- Le bloc **« Pourquoi maintenant »** explique le choix.

Tout est gratuit, sans compte ni clé : la position vient du navigateur (avec ta permission, via « Utiliser ma position ») et la météo du service Open-Meteo. Sans permission, l'app prend Nancy comme position par défaut. Seules des coordonnées arrondies (à environ 1 km) quittent ton appareil.

## Mon planning

Dans l'onglet **Planning**, remplis ta semaine jour par jour avec des créneaux :

| Créneau | Ce que l'app propose |
|---|---|
| Travail | Les défis « Boulot » (nature morte de bureau, lignes de fuite…) |
| Télétravail | Des défis faisables à ton poste, à la maison (lumière de fenêtre, autoportrait en visio, reflet dans l'écran noir, tasse de café…) |
| Pause déjeuner | Des défis courts à faire près du travail ; un jour de télétravail, des défis chez toi ou dans ton quartier (nature morte de cuisine, tour du pâté de maisons…) |
| CrossFit | « Craie et sueur » |
| Avec mon fils | Les défis avec ton fils, et ceux à faire chez toi |
| Sortie possible | Tout, y compris les sorties dans Nancy (place Stanislas…) |

- En dehors des créneaux, l'app considère que tu es chez toi, sans sortie prévue.
- « Sortie possible » et « Avec mon fils » peuvent se chevaucher : sortie photo avec ton fils.
- Une activité (travail, télétravail, pause, CrossFit) passe avant les autres créneaux.
- Une vue de la semaine en couleurs résume le planning ; « Copier cette journée vers » recopie une journée sur un autre jour.
- La ligne du haut indique le créneau en cours (« Au travail jusqu'à 12:00 », « CrossFit jusqu'à 19:30 ») ; la toucher ouvre le planning.

Le « Défi du jour » est choisi parmi les défis faisables à un moment de ta journée.

## Défis inventés par l'IA

Avec une clé API Gemini (gratuite sur [aistudio.google.com/apikey](https://aistudio.google.com/apikey)), le bouton **✨ Défi IA** fait inventer un défi neuf, adapté au moment présent : créneau du planning, météo, lumière, lieu, appareil et objectifs, thèmes et difficulté choisis. L'IA évite aussi tes derniers défis.

- La clé se saisit dans **Défis inventés par l'IA** puis « Enregistrer et tester ». Elle reste **dans le navigateur de l'appareil** : elle n'est jamais publiée dans le dépôt.
- L'app choisit automatiquement un modèle Gemini « Flash » récent, modifiable dans la liste. Si Gemini est surchargé (erreur 503) ou si le quota d'un modèle est atteint, elle réessaie puis passe automatiquement à un autre modèle.
- L'app n'envoie ni la position précise ni le nom : seulement le contexte du défi. Avec l'offre gratuite, Google peut utiliser les échanges pour améliorer ses services.
- Ne jamais mettre une clé API dans le code ou dans le dépôt : il est public.

## Coach photo

Avec la clé Gemini, le bouton **📷 Faire analyser ma photo** (sous la carte du défi) envoie ta photo à un coach IA, pour progresser :

- un verdict (« Défi réussi », « Presque », « Pas encore ») et une note sur 10 ;
- ce qui marche, ce qui peut progresser, un prochain exercice ;
- un commentaire sur ta retouche, ou une piste de retouche Lightroom si la photo est brute ;
- **tes réglages réels** (lus sur le téléphone dans les données de la photo) comparés à ceux du défi.

C'est un avis, pas un juge : tu valides le défi toi-même, et la note est gardée dans ton historique. Photos acceptées : JPEG (sorti de l'appareil ou exporté de Lightroom, la case « Photo retouchée » se coche alors toute seule), PNG ; pas de fichiers RAW. La photo est réduite et ses métadonnées (dont le GPS) sont retirées avant l'envoi. Avec l'offre gratuite, Google peut utiliser les photos envoyées : évite celles où ton fils ou d'autres personnes sont reconnaissables.

## Installer l'app sur le téléphone

L'app s'installe sur l'écran d'accueil, sans App Store (application web progressive) : icône du viseur, ouverture en plein écran, fonctionnement hors connexion (sauf la météo et l'IA). Quand une nouvelle version est publiée, un bandeau « Nouvelle version disponible » propose de la charger.

- **iPhone** : ouvre l'app dans Safari, bouton **Partager**, puis **« Sur l'écran d'accueil »**. ⚠️ L'app installée ne voit pas les données de Safari : fais une sauvegarde dans Safari, puis restaure-la dans l'app (un message le rappelle à la première ouverture).
- **Android / ordinateur** : bouton « Installer l'app » dans Réglages, ou menu du navigateur → « Installer l'application ».

## Sauvegarde

Toutes tes données (historique et notes, matériel, planning) sont enregistrées **dans le navigateur de l'appareil uniquement**. Dans **Réglages → Sauvegarde** :

- **Sauvegarder** crée un fichier `defis-photo-sauvegarde-AAAA-MM-JJ.json` (sur téléphone, via le menu de partage : « Enregistrer dans Fichiers », iCloud Drive…). La clé IA n'y est incluse que si tu coches la case.
- **Restaurer** recharge ce fichier, après confirmation : pour retrouver tes données sur un autre appareil, après avoir vidé le navigateur, ou dans l'app installée sur l'écran d'accueil (sur iPhone, elle ne partage pas ses données avec Safari).

## Réglages

- **Thèmes** : Nancy, Boulot, Avec mon fils, À la maison, Mes passions, Technique pure.
- **Difficulté** : Facile, Moyen, Costaud.
- **Appareil du jour** : choisis l'appareil que tu emportes parmi ceux de ton matériel.

## Mon matériel

L'onglet **Matériel** permet d'enregistrer tes appareils et tes objectifs :

- **Appareil** : nom, type de capteur (plein format, APS-C…) et ISO maximal que tu juges acceptable.
- **Objectif** : nom, focale minimale et maximale (la même valeur pour une focale fixe), ouverture maximale, macro ou non, et appareils avec lesquels il est compatible.

**Recherche d'objectifs** : indique la monture de chaque appareil (Canon RF, EF-M, EF, EF-S), puis choisis un appareil et tape quelques mots (« 50 », « 24-105 », « macro », « sigma »). L'app n'affiche que les objectifs compatibles avec cet appareil et signale ceux qui demandent un adaptateur ou font passer un boîtier plein format en mode recadrage APS-C. « Ajouter » remplit automatiquement focales, ouverture et compatibilité. Le catalogue est intégré à l'app (environ 70 objectifs Canon et Sigma courants, gratuit et sans connexion) ; un objectif absent peut toujours être saisi à la main.

Pour chaque défi, l'app conseille l'objectif le mieux adapté parmi ceux compatibles avec l'appareil du jour (grand-angle, focale de portrait, le plus lumineux…). Pour un zoom, elle indique la focale à utiliser. Elle précise aussi la focale « équivalente » sur un capteur APS-C (un 50 mm cadre comme un 80 mm sur un capteur Canon APS-C) et donne un conseil ISO pour les défis de nuit.

Certains défis sont saisonniers (brume d'automne, Saint-Nicolas) et n'apparaissent qu'aux bons mois.

## Utilisation

Ouvre l'adresse du site dans un navigateur, ou installe l'app sur l'écran d'accueil (voir plus haut).

L'historique et les réglages sont enregistrés dans le navigateur (`localStorage`) : ils restent sur l'appareil utilisé et ne sont envoyés nulle part. Le lien « Effacer mon historique » remet tout à zéro.

## Bon à savoir

Pour les photos au travail ou de passants, demande toujours l'accord des personnes reconnaissables.
