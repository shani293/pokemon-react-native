import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { useRoute } from '@react-navigation/native';
import { useGetPokemonByIdQuery } from '../src/api/pokemonApi';
import PokemonDetail from '../src/screens/pokemon-detail';

// ✅ Mock navigation route
jest.mock('@react-navigation/native', () => ({
  useRoute: jest.fn(),
}));

// ✅ Mock the API hook
jest.mock('../src/api/pokemonApi', () => ({
  useGetPokemonByIdQuery: jest.fn(),
}));

describe('PokemonDetail Screen', () => {
  const mockUseRoute = useRoute as jest.Mock;
  const mockUseGetPokemonByIdQuery = useGetPokemonByIdQuery as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseRoute.mockReturnValue({
      params: { id: '25' }, // e.g., Pikachu's ID
    });
  });

  it('renders loading indicator when data is loading', () => {
    mockUseGetPokemonByIdQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
      error: undefined,
    });

    const { getByTestId } = render(<PokemonDetail />);
    expect(getByTestId('loading-indicator-detail')).toBeTruthy();
  });

  it('renders error message when fetch fails', () => {
    mockUseGetPokemonByIdQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: { message: 'Something went wrong' },
    });

    const { getByText } = render(<PokemonDetail />);
    expect(getByText('Failed to load Pokémon details.')).toBeTruthy();
  });

  it('renders pokemon details when data is available', async () => {
    mockUseGetPokemonByIdQuery.mockReturnValue({
      isLoading: false,
      error: undefined,
      data: {
        name: 'pikachu',
        height: 40,
        weight: 60,
        sprites: { front_default: 'https://example.com/pikachu.png' },
        types: [{ type: { name: 'electric' } }],
      },
    });

    const { getByText, getByTestId } = render(<PokemonDetail />);

    await waitFor(() => {
      expect(getByTestId('pokemon-image')).toBeTruthy();
      expect(getByText('pikachu')).toBeTruthy();
      expect(getByText('40 cm')).toBeTruthy();
      expect(getByText('60 kg')).toBeTruthy();
      expect(getByText('electric')).toBeTruthy();
    });
  });
});
