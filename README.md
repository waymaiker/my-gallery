**Screens de l'application**

- Un screen home avec la galerie de photos enregistrées
- Un screen de type "card" pour consulter le détail d'une photo (nom de la photo + voir la photo en grand)
- Un screen de type "modal" contenant un formulaire pour ajouter une photo (Ajouter un nom à la photo, après l'avoir selectionnée ou prise)

**Détails techniques**

- L'application permet
  * d'ajouter des photos depuis sa gallery (cliquer sur +)
  * de prendre une photo et de l'ajouter  
  * de supprimer des photos (rester appuyer une photo pour la selectionne. Possibilité de supprimer plusieurs photos en même temps)
  * d'avoir les photos enregistrées localement => AsyncStorage
  * la demande de permission (via un hook)
  * via le hook de redemander la permission tant que celle-ci n'a pas été donnée
