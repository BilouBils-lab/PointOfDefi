# Défis photo · Point of Nabil

Une petite application web, en un seul fichier, qui propose chaque jour un défi photo pour progresser en s'amusant.

## Ce que fait l'app

- **Défi du jour** : le même défi pour toute la journée, choisi automatiquement selon la date.
- **Défi pour maintenant** : choisit un défi adapté à l'endroit où tu es, à la météo et à la lumière du moment, en évitant ceux faits récemment.
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

## Mon rythme

Dans **Mon rythme**, indique tes jours travaillés, tes horaires, ta pause déjeuner et les jours où ton fils est avec toi. L'app sait alors où tu en es (« Au travail », « Pause déjeuner », « Après le travail », « Jour de repos ») et ne propose que des défis faisables à ce moment-là :

- **au travail** : les défis « Boulot » (nature morte de bureau, lignes de fuite…) ;
- **pendant la pause** : des défis courts à faire près du travail ;
- **avant ou après le travail** : les défis à la maison, avec ton fils ou pour tes passions ;
- **les jours de repos** : tout, y compris les sorties dans Nancy comme la place Stanislas.

Le « Défi du jour » suit la même logique : en semaine, il est faisable pendant la pause ou après le travail.

## Réglages

- **Thèmes** : Nancy, Boulot, Avec mon fils, Mes passions, Technique pure.
- **Difficulté** : Facile, Moyen, Costaud.
- **Appareil du jour** : choisis l'appareil que tu emportes parmi ceux de ton matériel.

## Mon matériel

Le bouton **Mon matériel**, en haut à droite, permet d'enregistrer tes appareils et tes objectifs :

- **Appareil** : nom, type de capteur (plein format, APS-C…) et ISO maximal que tu juges acceptable.
- **Objectif** : nom, focale minimale et maximale (la même valeur pour une focale fixe), ouverture maximale, macro ou non, et appareils avec lesquels il est compatible.

**Recherche d'objectifs** : indique la monture de chaque appareil (Canon RF, EF-M, EF, EF-S), puis choisis un appareil et tape quelques mots (« 50 », « 24-105 », « macro », « sigma »). L'app n'affiche que les objectifs compatibles avec cet appareil et signale ceux qui demandent un adaptateur ou font passer un boîtier plein format en mode recadrage APS-C. « Ajouter » remplit automatiquement focales, ouverture et compatibilité. Le catalogue est intégré à l'app (environ 70 objectifs Canon et Sigma courants, gratuit et sans connexion) ; un objectif absent peut toujours être saisi à la main.

Pour chaque défi, l'app conseille l'objectif le mieux adapté parmi ceux compatibles avec l'appareil du jour (grand-angle, focale de portrait, le plus lumineux…). Pour un zoom, elle indique la focale à utiliser. Elle précise aussi la focale « équivalente » sur un capteur APS-C (un 50 mm cadre comme un 80 mm sur un capteur Canon APS-C) et donne un conseil ISO pour les défis de nuit.

Certains défis sont saisonniers (brume d'automne, Saint-Nicolas) et n'apparaissent qu'aux bons mois.

## Utilisation

Aucune installation : ouvre `index.html` dans un navigateur, sur ordinateur ou téléphone.

L'historique et les réglages sont enregistrés dans le navigateur (`localStorage`) : ils restent sur l'appareil utilisé et ne sont envoyés nulle part. Le lien « Effacer mon historique » remet tout à zéro.

## Bon à savoir

Pour les photos au travail ou de passants, demande toujours l'accord des personnes reconnaissables.
