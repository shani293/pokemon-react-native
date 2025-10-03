import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PokemonList from '@screens/pokemon-list';
import PokemonDetail from '@screens/pokemon-detail';

export type RootStackParamList = {
  PokemonList: undefined;
  PokemonDetail: { id: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
      <Stack.Navigator>
        <Stack.Screen 
          name="PokemonList" 
          component={PokemonList} 
          options={{ title: 'Pokémon List' }} 
        />
        <Stack.Screen 
          name="PokemonDetail" 
          component={PokemonDetail} 
          options={{ title: 'Details' }} 
        />
      </Stack.Navigator>
  );
}
