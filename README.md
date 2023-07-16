# technical-test-react-native

**Screens de l'application à mettre en place**

- Un screen home avec la galerie de photo déjà enregistrée
- Un screen de type "card" pour consulter le détail d'une photo
- Un screen de type "modal" contenant un formulaire pour ajouter une photo

**Détails techniques**

- L'application doit permettre
  * d'ajouter des photos (cliquer sur +), selectionnant via sa gallery ou en prenant directement une photo  
  * de supprimer des photos (rester appuyer sur une ou plusieurs photos)
  * les photos doivent être enregistrées localement => AsyncStorage
  * déplacer toute la logique dans un store avec zustand ou dans un React Context
  * la demande de permission doit être faite dans un hook
  * le hook doit proposer une redirection vers les settings du téléphone si la demande de permission a déjà été refusée
