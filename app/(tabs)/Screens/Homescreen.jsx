import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Change 1
import Allitems from './Allitems'
import Create from './Create'





const Homescreen = () => {
  const [view, setview] = useState(0)
  const [data, setdata] = useState([
    // { "id": 1, "name": "Wheat", "Stock": "5", "Unit": "kg" },
    // { "id": 2, "name": "Rice", "Stock": "10", "Unit": "kg" },
    // { "id": 3, "name": "Sugar", "Stock": "21", "Unit": "kg" },
    // { "id": 4, "name": "salt", "Stock": "25", "Unit": "kg" },
    // { "id": 5, "name": "Milk", "Stock": "30", "Unit": "Kg" }
  ])

  useEffect(() => { // Change 2
    const loadData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('data');
        if (storedData) {
          setdata(JSON.parse(storedData));
        }
      } catch (error) {
        console.error('Failed to load data', error);
      }
    };
    loadData();
  }, []); 

  return (
    <View style={styles.container}>
      <Text style={styles.tittle} >Shop Stock</Text>
      <View style={styles.buttoncontainer}> 
        <Pressable style={[styles.button, view === 0 ? {backgroundColor:"#72C37AFF"}: null]} onPress={()=>setview(0)} >
          <Text style={[styles.BtnText, view === 0 ? {color:"white"}: null]}>All Items</Text>
        </Pressable>
        <Pressable style={[styles.button, view === 1 ? {backgroundColor:"#72C37AFF"}: null]} onPress={()=>setview(1)}>
          <Text style={[styles.BtnText, view === 1 ? {color:"white"}: null]}>Low Stock</Text>
        </Pressable>
        <Pressable style={[styles.button, view === 2 ? {backgroundColor:"#72C37AFF"}: null]} onPress={()=>setview(2)}>
          <Text style={[styles.BtnText, view === 2 ? {color:"white"}: null]}>Create</Text>
        </Pressable>
      </View>


      {view === 0 && <Allitems data={data}  />}
      {view === 1 && <Allitems data={data.filter((item)=> item.Stock<20)} />}
      {view === 2 && <Create data={data} setdata={setdata} />}

    </View>
  )
}

export default Homescreen

const styles = StyleSheet.create({
  container: {
height:"100%" ,
width: "100%",
padding: "4%",
backgroundColor: "#F0F0F0FF",
  },
  tittle:{
    fontSize: 36,
    fontWeight: "bold",
    color: "#333",
    marginBottom: "4%",
  },
  buttoncontainer:{
    flexDirection: "row",
    alignItems: "center",
    marginVertical: "2%",
    gap: "2%",

  },
  button:{
    borderRadius: 50,
    paddingVertical: "1%",
    paddingHorizontal: "3%",
    borderColor: "#72C37AFF",
    borderWidth: 0.8,
  },
  BtnText:{
    fontSize: 14,
    color: "#72C37AFF",
    // fontWeight: ,

  }
  
})