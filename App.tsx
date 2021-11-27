import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import PersonalInfo from './components/PersonalInfo';
import styles from './components/Styles';
import AppLoading from "expo-app-loading";
import Chat from './components/Chat';

export default function App() {
  const storageUserNameKey = "chatapp-username";
  const storageImageKey = "chatapp-image";
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUserName] = useState("");
  const [image, setImage] = useState("");

  // you want this to be called while the app is still loading before any component is rendered
  const fetchPersonalData = async () => {
    //let fetchedUsername = await AsyncStorage.getItem(storageUserNameKey);
    //let userName = fetchedUsername == null ? "" : fetchedUsername;
    //let fetchedImage = await AsyncStorage.getItem(storageImageKey);
    //let image = fetchedImage == null ? "" : fetchedImage;
    //setUserName(userName);
    //setImage(image);
  };

  const onPersonalInfoClosed = async (name: string, image: string) => { // made async since it updates the AsyncStorage
    setUserName(name);
    await AsyncStorage.setItem(storageUserNameKey, name);
    setImage(image);
    await AsyncStorage.setItem(storageImageKey, image);
  };

  // this check should come before the check for the active component
  if (isLoading) {
    return (
      <AppLoading
        startAsync={fetchPersonalData}
        onFinish={() => setIsLoading(false)}
        onError={() => {}}
      />
    );
  }

  let activeComponent = username != "" ? (<Chat username={username} image={image} />) 
    : (<PersonalInfo onClosed={onPersonalInfoClosed} />);
  return (
    <SafeAreaView style={styles.container}>
      { activeComponent }
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

