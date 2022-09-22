const base = 'https://pokeapi.co/api/v2'

export const fetchAllPokemon = () =>
  fetch(`${base}/pokemon/?limit=151`).then((response) => response.json())

export const fetchPokemonSpeciesByName = (name) =>
  fetch(`${base}/pokemon-species/${name}`).then((response) => response.json())

export const fetchPokemonDetailsByName = (name) =>
  fetch(`${base}/pokemon/${name}`).then((response) => response.json())

export const fetchEvolutionChainById = (id) =>
  fetch(`${base}/evolution-chain/${id}`).then((response) => response.json())
