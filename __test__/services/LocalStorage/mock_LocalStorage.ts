import  AsyncStorage  from '@react-native-community/async-storage';

export const getDataFromLocalStorage = async (key: string, defaultData: any) => {
  const data = await AsyncStorage.getItem(key);
  return data?.length ? JSON.parse(data) : defaultData;
}

export const setDataIntoLocalStorage = async (key: string, data: any) => {
  await AsyncStorage.setItem(key, JSON.stringify(data));
}
