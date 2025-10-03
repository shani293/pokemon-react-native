import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { useGetPokemonListQuery } from '../src/api/pokemonApi';
import { NavigationContainer } from '@react-navigation/native';
import PokemonList from '../src/screens/pokemon-list';

jest.mock('../src/api/pokemonApi', () => ({
  useGetPokemonListQuery: jest.fn(),
}));

// Mock navigation since the screen uses useNavigation()
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
  };
});

describe('PokemonList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows loading indicator initially', () => {
    (useGetPokemonListQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      isFetching: true,
      error: undefined,
    });

    render(
      <NavigationContainer>
        <PokemonList />
      </NavigationContainer>
    );

    expect(screen.getByTestId('loading-indicator')).toBeTruthy();
  });

  it('renders list of Pokémon', () => {
    (useGetPokemonListQuery as jest.Mock).mockReturnValue({
      data: {
        results: [
          { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
          { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
        ],
        next: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20',
      },
      isLoading: false,
      isFetching: false,
      error: undefined,
    });

    render(
      <NavigationContainer>
        <PokemonList />
      </NavigationContainer>
    );

    expect(screen.getByText('bulbasaur')).toBeTruthy();
    expect(screen.getByText('charmander')).toBeTruthy();
  });

  it('shows error message when API fails', () => {
    (useGetPokemonListQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      isFetching: false,
      error: { message: 'Failed' },
    });

    render(
      <NavigationContainer>
        <PokemonList />
      </NavigationContainer>
    );

    expect(screen.getByText('Failed to load Pokémon list.')).toBeTruthy();
  });

  it('loads more when end is reached', () => {
    (useGetPokemonListQuery as jest.Mock).mockReturnValue({
      data: {
        results: [
          { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' },
        ],
        next: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20',
      },
      isLoading: false,
      isFetching: false,
      error: undefined,
    });

    const { getByTestId } = render(
      <NavigationContainer>
        <PokemonList />
      </NavigationContainer>
    );

    // Trigger FlatList's onEndReached
    fireEvent.scroll(getByTestId('pokemon-flatlist'), {
      nativeEvent: {
        contentOffset: { y: 1000 },
        contentSize: { height: 500 },
        layoutMeasurement: { height: 300 },
      },
    });

  });
});
