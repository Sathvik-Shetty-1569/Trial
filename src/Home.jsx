import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { launchImageLibrary } from 'react-native-image-picker';


const Home = ({navigation}) => {


  const pickimages = async () => {
    try{
      const result = await launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: 10,
        includeBase64: true,
      })
      if(result.errorCode){
        console.log('Error: ', result.errorMessage);
    }
    else{
      const newimages = result.assets.map(item => ({
        uri: item.uri,
        base64: item.base64,
        type: item.type || 'image/jpeg',
        name: item.fileName || `image_${Date.now()}`,
    }));
    console.log('Selected Images: ', newimages);
    navigation.navigate('DisplayReference', {images: newimages})

    }
    }
    catch(error){
      console.log('Error: ', error);
    }
  }
  return (
    <View style={styles.buttoncontainer}>
      <TouchableOpacity 
      style={styles.button}
      onPress={pickimages}
      >
        <Text style={styles.buttontext}>Pick Images from Gallery</Text>
      </TouchableOpacity>
      </View>
  )
}

export default Home


const styles = StyleSheet.create({
  buttoncontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button:{
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
  }
  , buttontext:{
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
    fontWeight: '900'
  }
})