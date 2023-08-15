import  AsyncStorage  from '@react-native-community/async-storage';
import { getDataFromLocalStorage } from './mock_LocalStorage';

describe('LocalStorage service', () => {
  it('if no result exist at key, return an empty array', async () => {    
    const results = await getDataFromLocalStorage('', []);
    expect(results).toEqual([]);
  });

  it('if a result exist at key "myGallery", return an array containing objects', async () => {    
    const onePicture = {
      id: 0,
      uri: 'uri' ,
      title: 'title' ,
      size: {},
      sizeImage: null
    }

    await AsyncStorage.setItem('myGallery', JSON.stringify([onePicture]))
    const results = await getDataFromLocalStorage('myGallery', []);
    expect(results).toEqual([onePicture]);
  });
})