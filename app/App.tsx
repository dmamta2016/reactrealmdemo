import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import 'react-native-gesture-handler';
import {RootStackParamList} from './RootStackParams';
import HomeScreen from './screens/HomeScreen';
import AddMovieScreen from './screens/AddMovieScreen';
import ViewMovieScreen from './screens/ViewMovieScreen';
import DeleteMovieScreen from './screens/DeleteMovieScreen';
import { MovieRealmContext } from './models';
const Stack = createStackNavigator<RootStackParamList>();

export default function App() {  
  const {RealmProvider} = MovieRealmContext;    
  return (
    <NavigationContainer>
      <RealmProvider>
      <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="AddMovieScreen" component={AddMovieScreen}/>          
      <Stack.Screen name="ViewMovieScreen" component={ViewMovieScreen} />
      <Stack.Screen name="DeleteMovieScreen" component={DeleteMovieScreen} />  
      </Stack.Navigator>
      </RealmProvider>
    </NavigationContainer>
  );
}