import { useEffect, useState } from 'react'
import { FlatList, useToast } from 'native-base'

import { api } from '../services/api'

import { Loading } from './Loading'
import { Game, GameProps } from '../components/Game'
import { EmptyMyPoolList } from './EmptyMyPoolList'

interface Props {
  poolId: string
  code: string
}

export function Guesses({ poolId, code }: Props) {
  const [isLoading, setIsLoading] = useState(true)
  const [games, setGames] = useState<GameProps[]>([])
  const [firstTeamPoints, setFirstTeamPoints] = useState('')
  const [secondTeamPoints, setSecondTeamPoints] = useState('')

  const toast = useToast()

  async function fetchGames() {
    try {
      setIsLoading(true)

      const response = await api.get(`/pools/${poolId}/games`)
      setGames(response.data.games)
      console.log(response.data.games)
    } catch (error) {
      toast.show({
        title: 'Não foi possível listar os jogos',
        placement: 'top',
        bgColor: 'red.600'
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function handleGuessConfirm(gameId: string) {
    try {
      if (!firstTeamPoints || !secondTeamPoints) {
        return toast.show({
          title: 'Informe o placar para dar o palpite',
          placement: 'top',
          bgColor: 'red.600'
        })
      }

      await api.post(`/pools/${poolId}/games/${gameId}/guesses`, {
        firstTeamPoints: Number(firstTeamPoints),
        secondTeamPoints: Number(secondTeamPoints)
      })

      toast.show({
        title: 'Palpite realizado com sucesso',
        placement: 'top',
        bgColor: 'green.600'
      })

      fetchGames()
    } catch (error) {
      console.log(error)

      toast.show({
        title: 'Não foi possível enviar o palpite',
        placement: 'top',
        bgColor: 'red.600'
      })
    }
  }

  useEffect(() => {
    fetchGames()
  }, [])

  if (isLoading) {
    return <Loading />
  }

  return (
    <FlatList
      data={games}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <Game
          data={item}
          setFirstTeamPoints={setFirstTeamPoints}
          setSecondTeamPoints={setSecondTeamPoints}
          onGuessConfirm={() => handleGuessConfirm(item.id)}
        />
      )}
      _contentContainerStyle={{ pb: 10 }}
      ListEmptyComponent={() => <EmptyMyPoolList code={code} />}
    />
  )
}
