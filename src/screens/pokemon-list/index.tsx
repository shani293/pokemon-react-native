import React, { useState, useEffect, useCallback, useRef } from 'react';
import { FlatList, View, ActivityIndicator, Text, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { styles } from './styles';
import { PokemonItem } from '@models/pokemon';
import { RootStackParamList } from '@navigation/AppNavigator';
import { useGetPokemonListQuery } from '@api/pokemonApi';
import PokemonListItem from 'components/PokemonListItem';

const LIMIT = 20;

type PokemonListScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'PokemonList'
>;

export default function PokemonList() {
  const navigation = useNavigation<PokemonListScreenNavigationProp>();

  const [offset, setOffset] = useState(0);
  const [items, setItems] = useState<PokemonItem[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const previousDataRef = useRef<any>(null);

  //fetch pokeman data
  const { data, isFetching, isLoading, error } = useGetPokemonListQuery({ offset, limit: LIMIT });

  useEffect(() => {
    if (!data?.results) return;
  
    // Only run when data actually changed
    if (data !== previousDataRef.current) {
      if (offset === 0) {
        setItems(data.results);
      } else {
        setItems(prev => [...prev, ...data.results]);
      }
  
      previousDataRef.current = data;
    }
  }, [data, offset]);

  // Handle pagination
  const loadMore = useCallback(() => {
    if (data?.next && !isFetching) {
      setOffset(prev => prev + LIMIT);
    }
  }, [data?.next, isFetching]);

  // Handle pull-to-refresh
  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    setOffset(0);
  }, []);

  useEffect(() => {
    if (!isFetching && isRefreshing) {
      setIsRefreshing(false);
    }
  }, [isFetching, isRefreshing]);

  if (isLoading && items.length === 0) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" testID="loading-indicator" />
      </View>
    );
  }

  //error fallback
  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Failed to load Pokémon list.</Text>
      </View>
    );
  }

  //pokemon render item
  const renderPokemonItem = ({ item }: { item: PokemonItem }) => {
    const id = item.url.split('/').filter(Boolean).pop()!;
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  
    return (
      <PokemonListItem
        name={item.name}
        imageUrl={imageUrl}
        onPress={() => navigation.navigate('PokemonDetail', { id })}
      />
    );
  };

  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.name}
      renderItem={renderPokemonItem}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        isFetching && !isRefreshing ? (
          <View style={styles.footer}>
            <ActivityIndicator size="small" />
          </View>
        ) : null
      }
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
      }
      initialNumToRender={20}
      removeClippedSubviews
      testID="pokemon-flatlist"
    />
  );
}
