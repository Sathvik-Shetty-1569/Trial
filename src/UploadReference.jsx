import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { db } from '../firebaseConfig';
import { addDoc, collection, getDoc, serverTimestamp } from 'firebase/firestore';

const UploadReference = ({route}) => {
    const { results } = route.params;

    const [marks, setMarks] = useState({});
  const [expandedItems, setExpandedItems] = useState({});
  const [modelName, setModelName] = useState(''); // State for model name input

  const handleMarkChange = (resultIndex, pairIndex, value) => {
    setMarks(prev => ({
      ...prev,
      [`${resultIndex}-${pairIndex}`]: value
    }));
  };

  const handleSave = async () => {
      try{
        await addDoc(collection(db, 'models'), {
          data : results,
          timestamp: serverTimestamp()
        })
      }
      catch (error) {
          
      }
  }



  const toggleExpand = (resultIndex, pairIndex) => {
    setExpandedItems(prev => ({
      ...prev,
      [`${resultIndex}-${pairIndex}`]: !prev[`${resultIndex}-${pairIndex}`]
    }));
  };

  return (
   <View style={{padding:20}}>
    <ScrollView>
        <View style={styles.headercontainer}>
    <Text style={styles.heading}>Detected Reference</Text>
    </View>
    {results.map((result, resultIndex) => (
        <View key={resultIndex}>
          {result.cropped_pairs.map((base64Image, pairIndex) => (

    <View key = {pairIndex} style = {styles.card}>

        <TouchableOpacity 
        style={styles.button}
        onPress={() => toggleExpand(resultIndex, pairIndex)}>
<Text style={{fontSize: 15, fontWeight: 'bold'}}>Question {resultIndex + 1}-{pairIndex + 1}</Text>
            <Text style={{fontSize: 15, fontWeight: 'bold'}}>
            {expandedItems[`${resultIndex}-${pairIndex}`] ? '▲' : '▼'}
            </Text>
        </TouchableOpacity>
        {expandedItems[`${resultIndex}-${pairIndex}`] && (
            <View style={{flexDirection:'column'}}>
                <View style={{flexDirection:'row' ,justifyContent:'space-between'}}>
                <Text style={{fontSize: 15, fontWeight: 'bold', padding:10}}>Marks :</Text>
                <TextInput
                style={styles.input}
                keyboardType='numeric'
                placeholder='0'
                placeholderTextColor={'#000'}
                value={marks[`${resultIndex}-${pairIndex}`] || ''}
                maxLength={2}
                onChangeText={(text) =>
                    handleMarkChange(resultIndex, pairIndex, text)
                  }></TextInput>
                    </View>
                <View style={{marginRight:10}}>
                <Image
                source={{ uri: base64Image }}
                style={styles.image}
                resizeMode="contain">
                </Image>
                </View>
        
            </View>
        )}
    
    </View>
  ))}
    </View>
))}



    </ScrollView>
   </View>
  )
}

export default UploadReference;

const styles = StyleSheet.create({
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },

    headercontainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10,
    },

    input: {
        width: '20%',
        textAlign: 'center',
        marginEnd: 10,
        borderColor: '#000',
        borderWidth: 1,
        flexDirection: 'row',
        backgroundColor: '#f5f5f5',
        color: '#000',
        borderRadius: 10,
    },

    button: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },


    card: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10
    },

    image: {
        width: '100%',
        height: 200,
        marginBottom: 10,
        marginTop: 10,
        marginStart:5,
        marginRight:10,
        borderWidth: 2,
        borderColor: '#000',
    }
 
    
})