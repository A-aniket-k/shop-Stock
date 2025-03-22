import { FlatList, StyleSheet, Text, View } from 'react-native' 


const Allitems = ({data }) => {
  // , showDetails = true
  return (
    <View>
      <View style={styles.itemheadContainer}>

      <Text style={styles.headtext} >Items</Text>
      <Text style={styles.headtext}>Stock</Text>
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
        keyExtractor={item => item.id}
        renderItem={({item})=>(
          <View style={[styles.itemContainer, {backgroundColor: item.Stock < 20 ? "#FFCCCC" :"#D7F6BF"}]}>
            <Text style={[styles.itemtext , ]}>{item.name}</Text>
            <Text style={styles.itemtext}>{item.Stock}  </Text>
            {/* {item.Unit} */}
          </View>
        )}

        contentContainerStyle={{gap: 10}}
       />
      )} 



    </View>
  )
}

export default Allitems

const styles = StyleSheet.create({
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