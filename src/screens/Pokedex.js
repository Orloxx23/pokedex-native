import { SafeAreaView as View, Text } from 'react-native'
import React, { useState, useEffect} from 'react'
import { getPokemons } from '../api/pokemon'

export default function Pokedex() {
  useEffect(() => {
    (async () => {
      await loadPokemons();
    })()
  }, [])

  const loadPokemons = async () => {
    try {
      const res = await getPokemons();
      console.log(res)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <View>
      <Text>Pokedex</Text>
    </View>
  )
}