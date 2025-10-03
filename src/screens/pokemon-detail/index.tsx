import React from 'react';
import { View, Text, Image, ScrollView, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { styles } from './styles';
import { useGetPokemonByIdQuery } from '@api/pokemonApi';

export default function PokemonDetail() {
  const route = useRoute();
  const { id } = route.params as { id: string };

  //fetch pokemon item details
  const { data, isLoading, error } = useGetPokemonByIdQuery(id);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" testID="loading-indicator-detail" />
      </View>
    );
  }

  //error fallback
  if (error || !data) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Failed to load Pokémon details.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Pokémon Image */}
      {data.sprites?.front_default && (
        <Image
          source={{ uri: data.sprites.front_default }}
          style={styles.image}
          resizeMode="contain"
          testID="pokemon-image"
        />
      )}

      {/* Info Table */}
      <View style={styles.infoTable}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Name</Text>
          <Text style={styles.infoValue}>{data.name}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Height</Text>
          <Text style={styles.infoValue}>{data.height} cm</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Weight</Text>
          <Text style={styles.infoValue}>{data.weight} kg</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Types</Text>
          <Text style={styles.infoValue}>
            {data.types.map((t: any) => t.type.name).join(', ')}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
