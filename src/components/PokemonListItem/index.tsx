// src/components/PokemonListItem.tsx
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from './styles';

interface PokemonListItemProps {
  name: string;
  imageUrl?: string;
  onPress: () => void;
}

const PokemonListItem: React.FC<PokemonListItemProps> = ({ name, imageUrl, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.imageContainer}>
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="contain" />
        ) : (
          <View style={styles.placeholder} />
        )}
      </View>
      <Text style={styles.name}>{name}</Text>
    </TouchableOpacity>
  );
};

export default PokemonListItem;
