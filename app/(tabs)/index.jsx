import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Homescreen from './Screens/Homescreen'
import Allitems from './Screens/Allitems'

const index = () => {
  return (
    <View>
      <Homescreen />
      {/* <Allitems /> */}
    </View>
  )
}

export default index

const styles = StyleSheet.create({})


































// import {FlatList, StyleSheet, Text, View } from "react-native";
// // // import React from "react";
// // // import { FlatList } from "react-native-gesture-handler";

// const dummy = [
//   {id:1, name: 'name1', email: 'email1'},
//   {id:2, name: 'name2', email: 'email2'},
//   {id:3, name: 'name3', email: 'email3'},
//   {id:4, name: 'name4', email: 'email4'},
// ];

// const index = () => {
//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={dummy}
//         renderItem={({ item }) => (
//           <View style={styles.card}>
//             <Text>{item.name}</Text>
//             <Text>{item.email}</Text>
//           </View>
//         )}
//         keyExtractor={item => item.id}
//       />
//     </View>
//   );
// };

// export default index;

// const styles = StyleSheet.create({});
