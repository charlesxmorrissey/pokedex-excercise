import { useEffect, useState } from 'react'

import {
  fetchAllPokemon,
  fetchEvolutionChainById,
  fetchPokemonDetailsByName,
} from './api'
import styles from './App.module.css'

const App = () => {
  const [filteredResults, setFilteredResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [pokemonDetails, setPokemonDetails] = useState(null)
  const [pokemonResults, setPokemonResults] = useState([])
  const [searchValue, setSearchValue] = useState('')

  const handleGetDetails = (name) => async () => {
    if (name === pokemonDetails?.name) {
      return
    }

    try {
      const { id, moves, types } = await fetchPokemonDetailsByName(name)
      const { chain } = await fetchEvolutionChainById(id)

      const getEvolutions = (obj) => {
        const array = Array.isArray(obj) ? obj : [obj]

        return array.reduce((acc, value) => {
          acc.push(value?.species?.name)

          if (value?.evolves_to) {
            acc = acc.concat(getEvolutions(value.evolves_to))

            delete value.evolves_to
          }

          return acc
        }, [])
      }

      setPokemonDetails({
        evolutions: getEvolutions(chain),
        moves: moves.slice(0, 4).map(({ move }) => move.name),
        name,
        types: types.map(({ type }) => type.name),
      })
    } catch (error) {
      console.error(error)
    }
  }

  const handleSearchValueChange = (event) => {
    const value = event.target.value

    setSearchValue(value)

    if (value.trim().length) {
      const filteredData = pokemonResults.filter(({ name }) =>
        Object.values(name).join('').toLowerCase().includes(value.toLowerCase())
      )

      setFilteredResults(filteredData)
    } else {
      setFilteredResults(pokemonResults)
    }

    setPokemonDetails(null)
  }

  const fetchPokemon = async () => {
    try {
      setIsLoading(true)

      const { results } = await fetchAllPokemon()

      setPokemonResults(results)
      setFilteredResults(results)
      setIsLoading(false)
    } catch (error) {
      console.error(error)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPokemon()
  }, [])

  return (
    <div className={styles.pokedexWrapper}>
      <div className={styles.pokedexSearchInputWrapper}>
        <input
          className={styles.pokedexSearchInput}
          onChange={handleSearchValueChange}
          placeholder="Search Pokemon"
          value={searchValue}
        />
      </div>

      <div className={styles.pokedexContent}>
        {!!filteredResults.length ? (
          <div className={styles.pokedexSearchResults}>
            {filteredResults.map(({ name }, index) => (
              <div className={styles.pokedexListItem} key={`name-${index}`}>
                <div>{name}</div>
                <button onClick={handleGetDetails(name)}>Get Details</button>
              </div>
            ))}
          </div>
        ) : (
          <p>{isLoading ? 'Loading' : 'No Results Found'}</p>
        )}

        {pokemonDetails && (
          <div className={styles.pokedexDetails}>
            <h4 className={styles.pokedexDetailsName}>{pokemonDetails.name}</h4>

            <div className={styles.pokedexDetailsMetaWrapper}>
              <div className={styles.pokedexDetailsMetaContainer}>
                <h4>Types</h4>

                {!!pokemonDetails.types.length ? (
                  <ul className={styles.pokedexDetailsMetaList}>
                    {pokemonDetails.types.map((type, index) => (
                      <li
                        className={styles.pokedexDetailsMetaListItem}
                        key={`type-${index}`}
                      >
                        {type}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No Types Found</p>
                )}
              </div>

              <div className={styles.pokedexDetailsMetaItem}>
                <h4>Moves</h4>

                {!!pokemonDetails.moves.length ? (
                  <ul className={styles.pokedexDetailsMetaList}>
                    {pokemonDetails.moves.map((move, index) => (
                      <li
                        className={styles.pokedexDetailsMetaListItem}
                        key={`move-${index}`}
                      >
                        {move}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No Moves Found</p>
                )}
              </div>
            </div>

            <div className={styles.pokedexDetailsEvolutions}>
              <h4>Evolutions</h4>

              {!!pokemonDetails.evolutions.length ? (
                <div className={styles.pokedexDetailsEvolutionItems}>
                  {pokemonDetails.evolutions.map((evolution, index) => (
                    <em key={`evolution-${index}`}>{evolution}</em>
                  ))}
                </div>
              ) : (
                <p>No Evolutions Found</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
