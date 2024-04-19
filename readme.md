À partir des informations fournies, nous pouvons extraire le modèle de données suivant :

## Entités :

### Cobaye
- ID
- Nom
- userId
- Prénom
- Date de naissance
- Sexe
- Résultats des tests ophtalmiques (initial et après 6 semaines)
### Port de lentilles
- ID
- ID Cobaye
- Date et heure de début de port
- Durée totale de port
- Pauses

### Statistiques par Cobaye
- ID Cobaye
- Durée moyenne de port
- Durée minimale de port
- Durée maximale de port
- Durée médiane de port
- Écart maximal entre deux ports

### Associations :

- Un Cobaye peut avoir plusieurs Ports de lentilles
- Chaque Port de lentilles est associé à un seul Cobaye
- Chaque Statistique par Cobaye est associée à un seul Cobaye

## Remarques :

La "journée" de port peut être considérée comme une période de 24 heures consécutives, peu importe l'heure de début.
Les pauses dans le port peuvent être enregistrées sous forme d'événements distincts, liés au port correspondant.
Le dashboard permettra de visualiser et de modifier les sessions de port enregistrées pour chaque cobaye.


### endpoint:
 ##### Cobaye
 - get Cobayes
 - get cobayed by id
 