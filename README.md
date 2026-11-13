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

## Réglages

- **Thèmes** : Nancy, Boulot, Avec mon fils, Mes passions, Technique pure.
- **Difficulté** : Facile, Moyen, Costaud.
- **Appareil du jour** : Canon EOS M50 ou R6 Mark II.

Certains défis sont saisonniers (brume d'automne, Saint-Nicolas) et n'apparaissent qu'aux bons mois.

## Utilisation

Aucune installation : ouvre `index.html` dans un navigateur, sur ordinateur ou téléphone.

L'historique et les réglages sont enregistrés dans le navigateur (`localStorage`) : ils restent sur l'appareil utilisé et ne sont envoyés nulle part. Le lien « Effacer mon historique » remet tout à zéro.

## Bon à savoir

Pour les photos au travail ou de passants, demande toujours l'accord des personnes reconnaissables.
