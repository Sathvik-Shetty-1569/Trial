import { FlatList, Image, StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import React ,{useState} from 'react'
import { launchImageLibrary } from 'react-native-image-picker';
import color from '../android/config/color';


const DisplayReference = ({route, navigation}) => {
  const { images: initialImages = [] } = route.params || {};
  const [images, setImages] = useState(initialImages); // ✅ Store in useStateconsole.log(images);
const { width, height } = Dimensions.get('window');

const Addmorefiles = async() => {
  try{
    const result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 10,
      includeBase64: true,
    })

    if(result.assets){
      const newimages = result.assets.map(item => ({
        uri: item.uri,
        base64: item.base64,
        type: item.type || 'image/jpeg',
        name: item.fileName || `image_${Date.now()}`,
      }))
      setImages([...images,...newimages])
    }

  }
  catch(error){
    console.log(error);
  }
}
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={images}
        keyExtractor={item => item.uri}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item.uri }}
            style={{ width, height }}
            resizeMode="contain"
            />
        )}
        pagingEnabled
        showsVerticalScrollIndicator={true}
        snapToInterval={height}
        decelerationRate="fast"
    />
    <View style={styles.buttonContainer}>
    <TouchableOpacity
    style={[styles.button, styles.uploadButton]}
    onPress={Addmorefiles}
    >
    <Text style={styles.buttonText}>Add More Files</Text>
    </TouchableOpacity>
    </View>
        </View>
  )
}

export default DisplayReference

const styles = StyleSheet.create({
  button:{
    backgroundColor: '#6200ee',
    padding: 15,
    borderRadius: 10,
    elevation: 10,
    alignItems: 'center',
  }, 
  buttonContainer:{
    position: 'absolute',
    bottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
  },
  uploadButton:{
    backgroundColor: '#03dac6',

  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
})