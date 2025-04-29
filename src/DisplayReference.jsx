import { FlatList, Image, StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'

const DisplayReference = ({route, navigation}) => {
const {images} = route.params;
console.log(images);
const { width, height } = Dimensions.get('window');

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={images}
        keyExtractor={(item, index) => index.toString()}
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
    ></FlatList>
        </View>
  )
}

export default DisplayReference

const styles = StyleSheet.create({})