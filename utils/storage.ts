import AsyncStorage from '@react-native-async-storage/async-storage';

type StringValue = string | null;
type Key = string;

async function getValue(key: Key): Promise<StringValue> {
  try {
    const result = await AsyncStorage.getItem(key);
    return result ? JSON.parse(result) : null;
  } catch (error) {
    console.error(`Error getting value for key "${key}"`, error);
    return null;
  }
}

async function setValue(key: Key, value: string | number | Object): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting value for key "${key}"`, error);
  }
}

async function removeValue(key: Key): Promise<void> {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing value for key "${key}"`, error);
  }
}

async function clear(): Promise<void> {
  try {
    await AsyncStorage.clear();
  } catch {}
}

export const asyncStorageService = {
  getValue,
  setValue,
  removeValue,
  clear,
};
