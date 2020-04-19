import { AsyncStorage } from "react-native";
// import AsyncStorage from "@react-native-community/async-storage";

async function setItemInStorage(item, data) {
  try {
    await AsyncStorage.setItem(item, JSON.stringify(data));
  } catch (e) {
    // saving error
    console.log(e);
  }
}
async function getItemInStorage(item) {
  let data = undefined;
  try {
    data = await AsyncStorage.getItem(item);
  } catch (e) {
    // saving error
    console.log(e);
  }
  if (!data) {
    return undefined;
  }
  return JSON.parse(data);
}
async function remove(item) {
  try {
    await AsyncStorage.removeItem(item);
  } catch (e) {
    // saving error
    console.log(e);
  }
  return true;
}

export { setItemInStorage, getItemInStorage, remove };
