import { View, StyleSheet, ScrollView, KeyboardAvoidingView, TextInput, Text, Pressable, Platform } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../RootStackParams';
import { Movie } from '../models/Movie';
import { MovieRealmContext } from '../models';
import React, { useState, useCallback } from 'react';

import colors from '../styles/colors';
import { shadows } from '../styles/shadows';
import { buttonStyles } from '../styles/button';
import { useNavigation } from '@react-navigation/native';

type addScreenProp = StackNavigationProp<RootStackParamList, 'AddMovieScreen'>;
const { useRealm } = MovieRealmContext;
const NewAddMovieScreen = () => {
  const realm = useRealm();
  const handleAddMovie = useCallback(
    (description: string, title: string, releaseyear: number, userId: string): void => {
      if (!description) {
        return;
      }
      realm.write(() => {
        return new Movie(realm, description, title, releaseyear, userId);
      });
    },
    [realm],
  );

  return (
    <View style={styles.content}>
      {<AddMovieForm onSubmit={handleAddMovie} />}
    </View>
  );
};
type AddMovieFormProps = {
  onSubmit: (description: string, title: string, releaseyear: number, userId: string) => void;
};

export const AddMovieForm: React.FC<AddMovieFormProps> = ({ onSubmit }) => {
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [releaseyear, setYear] = useState('');
  const [userId] = useState('');
  const navigation = useNavigation<addScreenProp>();
  const convertdate = (textyear: string) => {
    var dt = new Date(textyear);
    return dt.getFullYear();
  }

  const handleSubmit = () => {
    onSubmit(description, title, convertdate(releaseyear), userId);
    setDescription('');
    setTitle('');
    setYear('');
  };

  return (
    <View style={styles.listContainer}>
      <ScrollView keyboardShouldPersistTaps="handled" >
        <KeyboardAvoidingView
          behavior="padding"
          style={{ flex: 1, justifyContent: 'space-between' }}>
          <TextInput
            value={title}
            placeholder="Enter new movie title"
            onChangeText={setTitle}
            autoCorrect={false}
            autoCapitalize="none"
            style={styles.textInput}
          />
          <TextInput
            value={description}
            placeholder="Enter new movie description"
            onChangeText={setDescription}
            autoCorrect={false}
            autoCapitalize="none"
            style={styles.textInput}
          />
          <TextInput
            value={releaseyear}
            placeholder="Enter new movie year"
            onChangeText={setYear}
            maxLength={4}
            keyboardType="numeric"
            style={styles.textInput}
          />
          <View >
            <Pressable onPress={handleSubmit} style={styles.submit}>
              <Text>Submit</Text>
            </Pressable>
          </View>
          <Pressable style={styles.button} onPress={() => navigation.navigate('HomeScreen')}>
            <Text style={styles.buttontext}>Go Home</Text>
          </Pressable>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: colors.purpleDark,
    padding: 10,
    justifyContent: 'center',
  },
  text: {
    paddingHorizontal: 10
  },
  buttontext: {
    color: colors.white,
    paddingHorizontal: 10
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  form: {
    height: 50,
    marginBottom: 20,
    flexDirection: 'row',
    ...shadows,
  },
  inputContainer: {
    padding: 10,
    marginHorizontal: 10,
    backgroundColor: colors.purple,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === 'ios' ? 15 : 0,
    borderRadius: 5,
    backgroundColor: colors.gray,
    fontSize: 17,
  },
  submit: {
    backgroundColor: "#f194ff",

  },
  icon: {
    ...buttonStyles.text,
  }
});
export default NewAddMovieScreen;