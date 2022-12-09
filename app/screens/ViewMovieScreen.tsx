import React from 'react';
import { View, StyleSheet, Pressable, Text, FlatList } from 'react-native';
import { Movie } from '../models/Movie';
import { MovieRealmContext } from '../models';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../RootStackParams';
import { useNavigation } from '@react-navigation/native';
/* import { ViewMovieItem } from '../components/ViewMovieItem'; */
import { shadows } from '../styles/shadows';
import colors from '../styles/colors';

type updateScreenProp = StackNavigationProp<RootStackParamList, 'ViewMovieScreen'>;

function ViewMovieScreen() {
  const navigation = useNavigation<updateScreenProp>();
  const { useQuery } = MovieRealmContext;
  const result = useQuery(Movie);
  const movies = result.sorted("releaseyear");
  return (
    <View style={styles.listContainer}>
      <FlatList
        data={movies}
        renderItem={({ item }) => (
          <ViewMovieItem
            movie={item}
          />
        )}
      />
      <Pressable style={styles.button} onPress={() => navigation.navigate('HomeScreen')}>
        <Text style={styles.buttontext}>Go Home</Text>
      </Pressable>
    </View>
  );
}

type ViewMovieItemProps = {
  movie: Movie & Realm.Object;
};

export const ViewMovieItem = React.memo<ViewMovieItemProps>(
  ({ movie }) => {
    return (
      <View style={styles.movie}>
        <View style={styles.movieContainer}>
          <Text numberOfLines={1} style={styles.text}>
            {movie.title}
          </Text>
          <Text numberOfLines={1} style={styles.text}>
            {movie.description}
          </Text>
          <Text numberOfLines={1} >
            {movie.releaseyear}
          </Text>
        </View>
      </View>
    );
  },
);
const styles = StyleSheet.create({
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
  },
  listContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  movie: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 5,
    ...shadows,
  },
  movieContainer: {
    flex: 1,
    justifyContent: 'center',
  }
});

export default ViewMovieScreen;