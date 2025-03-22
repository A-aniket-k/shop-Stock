import { useState, useEffect } from 'react'
import { FlatList ,StyleSheet, Text, View, Pressable, TextInput,Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'; // Change 1
import Allitems from './Allitems'



const Create = ({data,setdata}) => {
  const [iname, setiname] = useState("")
  const [iStock, setiStock] = useState("")
  // understand down 
  const [isedit, setisedit] = useState(false)
  const [edititemid, setedititemid] = useState(null)

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

  const saveData = async (newData) => { // Change 3
    try {
      await AsyncStorage.setItem('data', JSON.stringify(newData));
    } catch (error) {
      console.error('Failed to save data', error);
    }
  };

  const Additemhandler = () => {
    if (data.some(item => item.name === iname)) {
      Alert.alert("Error", "Item with the same name already exists.");
      return;
    }
       const newitem = {
        id: Date.now(),
        name: iname,
        Stock: iStock
       }
       const newData = [...data, newitem];
       setdata(newData);
       saveData(newData); // Change 4
       setiname("")
       setiStock("")

  }

  const Deleteitemhandler = (id) => {
    const newData = data.filter((item)=> item.id !== id);
    setdata(newData);
    saveData(newData); // Change 5
  }


  const Edititemhandler = (item) => {
    setisedit(true)
    setiname(item.name)
    setiStock(item.Stock)
    setedititemid(item.id)

  }

  const Updateitemhandler = () => {
    const newData = data.map((item)=>( 
      item.id === edititemid ? {...item, name: iname, Stock: iStock} : item
    ));
    setdata(newData);
    saveData(newData); // Change 6
    setiname("")
    setiStock("")
    setisedit(false);
    setedititemid(null);
  }

  const handleNameChange = (text) => {
    // Allow only letters and spaces
    const validName = text.replace(/[^a-zA-Z\s]/g, '');
    setiname(validName);
  };

  const handleStockChange = (text) => {
    // Allow only numbers
    const validStock = text.replace(/[^0-9]/g, '');
    setiStock(validStock);
  };


  return (
    <View>
      <TextInput
      style={styles.input}
      placeholder='Enter Item Name...'
      value={iname}
      onChangeText={handleNameChange}
      keyboardType='default'
      />

<TextInput
      style={styles.input}
      placeholder='Enter Stock Amount...'
      value={iStock}
      onChangeText={handleStockChange}
      // keyboardType='numeric'
      />

      <Pressable style={styles.button} onPress={() => isedit ? Updateitemhandler(): Additemhandler()}> 
        <Text style={styles.btntext}>{isedit ? ' Edit Item in Stock':' Add Item in Stock'}</Text>
      </Pressable>

    {/* <Text style={styles.headtext} >All Items In The Stock</Text> */}
      {/* <Allitems data={data}  /> */}
          <View>
            <View style={styles.itemheadContainer}>
      
            <Text style={styles.headtext} > All Items In The Stock</Text>
            {/* <Text style={styles.headtext}>Stock</Text> */}
              {/* {showDetails && (
                <>
                      <Text style={styles.headtext} >Items</Text>
                      <Text style={styles.headtext}>Stock</Text>
                      </>      
              )} */}
      
            </View>    
      
            {data.length === 0 ? (
          <Text style={styles.emptyText}>Stock is empty...</Text>
        ) : (
          <FlatList
            data={data}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <View style={[styles.itemContainer, { backgroundColor: item.Stock < 20 ? "#FFCCCC" : "#D7F6BF" }]}>
                <Text style={[styles.itemtext]}>{item.name}</Text>
                <View style={{ flexDirection: "row", gap: 15 }}>
                  <Text style={[styles.itemtext]}>{item.Stock}</Text>
                  <Pressable onPress={() => Edititemhandler(item)}>
                    <Text style={styles.itemtext}>Edit</Text>
                  </Pressable>
                  <Pressable onPress={() => Deleteitemhandler(item.id)}>
                    <Text style={styles.itemtext}>Delete</Text>
                  </Pressable>
                </View>
              </View>
            )}
            contentContainerStyle={{ gap: 10 }}
          />
        )}
      
      
      
          </View>
      {/* showDetails={false} */}







    </View>
  )
}

export default Create

const styles = StyleSheet.create({
  input:{
    backgroundColor: "#F0F0F0FF",
    borderColor: "#72C37AFF",
    borderWidth: 1,
    padding: "3%",
    margin: "2%",
    borderRadius: 10
  },
  button:{
    backgroundColor: "#72C37AFF",
    padding: "2%",
    margin: "2%",
    borderRadius: 10,
    alignItems: "center"
  },
  btntext:{
    color: "white",
    fontSize: 20
  },

  // 
  itemheadContainer:{
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: "2%",
    // borderBottomWidth: 1,
    borderBottomColor: "#333",
    marginBottom: "4%"
  },
  headtext:{
    fontSize: 20,
    fontWeight: "bold",
    color: "#333"
  },
  itemContainer:{
    paddingVertical: "3%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: "2%",
    // borderBottomWidth: 1,
    borderBottomColor: "#333",
    borderRadius: 10
  },
  itemtext:{
    fontSize: 18,
    color: "#333"
  },
  // 
  emptyText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#333',
    marginTop: 20
  }
})