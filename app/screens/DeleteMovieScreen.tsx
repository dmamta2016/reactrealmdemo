import React from 'react';
import { View, StyleSheet, Pressable, Text, FlatList, SafeAreaView } from 'react-native';
import { Movie } from '../models/Movie';
import { MovieRealmContext } from '../models';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../RootStackParams';
import { useNavigation } from '@react-navigation/native';
import colors from '../styles/colors';
const { useRealm, useQuery } = MovieRealmContext;
type delScreenProp = StackNavigationProp<RootStackParamList, 'DeleteMovieScreen'>;

function DeleteMovieScreen() {
  const navigation = useNavigation<delScreenProp>();
  const realm = useRealm();
  const movies = useQuery(Movie);

  return (
    <SafeAreaView style={styles.listContainer}>
      <View style={{ flexDirection: 'row', justifyContent: 'center', margin: 10 }}>
      </View>
      <FlatList data={movies.sorted("releaseyear")} renderItem={({ item }) => {
        return (
          <View style={{ flexDirection: 'row', justifyContent: 'center', margin: 10 }}>
            <Text style={styles.text} >{item.title}</Text>
            <Pressable style={styles.button}
              onPress={() => {
                realm.write(() => {
                  realm.delete(item)
                })
              }} ><Text style={styles.buttontext}>{"Delete 🗑️"}</Text></Pressable>
          </View>
        );
      }} ></FlatList>
      <Pressable style={styles.button} onPress={() => navigation.navigate('HomeScreen')}>
        <Text style={styles.buttontext}>Go Home</Text>
      </Pressable>
    </SafeAreaView >
  );
}
const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: colors.purpleDark,

    justifyContent: 'center',
  },
  text: {
    paddingHorizontal: 10
  },
  buttontext: {
    color: colors.white,
    paddingHorizontal: 10
  }
});

export default DeleteMovieScreen;