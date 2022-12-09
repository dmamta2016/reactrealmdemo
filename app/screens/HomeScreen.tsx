import React, { useCallback, useState } from 'react';
import { SafeAreaView, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../RootStackParams';
import { MovieRealmContext } from '../models';
import colors from '../styles/colors';

type homeScreenProp = StackNavigationProp<RootStackParamList, 'HomeScreen'>;

function HomeScreen() {
  const navigation = useNavigation<homeScreenProp>();
  const { RealmProvider } = MovieRealmContext;
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'column',
      }}>
      <RealmProvider>
        <Button
          title="Add Movie"
          color="#f194ff"
          onPress={() => navigation.navigate('AddMovieScreen')}
        />
        <Button
          title="Update Movie"
          color="#f194ff"
          onPress={() => navigation.navigate('UpdateMovieScreen')}
        />
        <Button
          title="Delete Movie"
          color="#f194ff"
          onPress={() => navigation.navigate('DeleteMovieScreen')}
        />
        <Button
          title="View Movies"
          color="#f194ff"
          onPress={() => navigation.navigate('ViewMovieScreen')}
        />
      </RealmProvider>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.darkBlue,
  },
});

export default HomeScreen;