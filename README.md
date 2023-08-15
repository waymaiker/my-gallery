# MY GALLERY

My react-native playground 

### Screens de l'application

- Un screen home avec la galerie de photos enregistrées
- Un screen de type "card" pour consulter le détail d'une photo (nom de la photo + voir la photo en grand)
- Un screen de type "modal" contenant un formulaire pour ajouter une photo (Ajouter un nom à la photo, après l'avoir selectionnée ou prise)

### Détails techniques

- L'application permet
  * d'ajouter des photos depuis sa gallery (cliquer sur +)
  * de prendre une photo et de l'ajouter  
  * de supprimer des photos (rester appuyer une photo pour la selectionne. Possibilité de supprimer plusieurs photos en même temps)
  * demande de confirmation avant la suppression des photos sélectionnées
  * d'avoir les photos enregistrées localement => AsyncStorage
  * la demande de permission (via un hook)
  * via le hook de redemander la permission tant que celle-ci n'a pas été donnée

### L'application
<img src="https://github.com/waymaiker/my-gallery/blob/main/screenshots/homescreen.png" width="200" height="450" /> <img src="https://github.com/waymaiker/my-gallery/blob/main/screenshots/modalscreen.png" width="200" height="450" /> <img src="https://github.com/waymaiker/my-gallery/blob/main/screenshots/choose_a_picture_from_media.png" width="200" height="450" />
<img src="https://github.com/waymaiker/my-gallery/blob/main/screenshots/crop_the_picture.png" width="200" height="450" />
<img src="https://github.com/waymaiker/my-gallery/blob/main/screenshots/picture_selected.png" width="200" height="450" />
<img src="https://github.com/waymaiker/my-gallery/blob/main/screenshots/grid_view.png" width="200" height="450" />
<img src="https://github.com/waymaiker/my-gallery/blob/main/screenshots/single_view.png" width="200" height="450" />
<img src="https://github.com/waymaiker/my-gallery/blob/main/screenshots/see_picture_details.png" width="200" height="450" />
<img src="https://github.com/waymaiker/my-gallery/blob/main/screenshots/select_pictures.png" width="200" height="450" />
<img src="https://github.com/waymaiker/my-gallery/blob/main/screenshots/delete_pictures.png" width="200" height="450" />
<img src="https://github.com/waymaiker/my-gallery/blob/main/screenshots/landscape_orientation.png" width="500" height="250" />

## Resources
* https://reactnative.dev/
* https://docs.expo.dev/
* https://jestjs.io/
* https://www.typescriptlang.org/
* https://react-native-async-storage.github.io/async-storage/docs/install/
