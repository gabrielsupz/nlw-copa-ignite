import { Heading, useToast, VStack } from 'native-base'
import { useState } from 'react'
import { api } from '../services/api'
import { Button } from '../components/Button'

import { Header } from '../components/Header'
import { Input } from '../components/Input'
import { useNavigation } from '@react-navigation/native'

export function Find() {
  const [isLoading, setIsLoading] = useState(false)
  const [code, setCode] = useState('')
  const { navigate } = useNavigation()
  const toast = useToast()

  async function handleJoinPoll() {
    try {
      setIsLoading(true)
      if (!code.trim()) {
        return toast.show({
          title: 'Informe um código!',
          placement: 'top',
          bgColor: 'red.600'
        })
      }

      await api.post('/pools/join', { code })

      toast.show({
        title: 'Entrada no bolão ocorrida com sucesso!',
        placement: 'top',
        bgColor: 'green.600'
      })

      navigate('pools')

      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
      if (error.response?.data?.message === 'Poll not found') {
        return toast.show({
          title: 'Não foi possivel encontrar o bolão!',
          placement: 'top',
          bgColor: 'red.600'
        })
      }
      if (error.response?.data?.message === 'You already joined this poll') {
        return toast.show({
          title: 'Você já participa deste bolão!',
          placement: 'top',
          bgColor: 'red.600'
        })
      }
    }
  }
  return (
    <VStack flex={1} bg="gray.900">
      <Header title="Buscar por código" showBackButton />

      <VStack mt={8} mx={5} alignItems="center">
        <Heading
          fontFamily="heading"
          color="white"
          fontSize="xl"
          mb={8}
          textAlign="center"
        >
          Encontre um bolão através de{'\n'}
          seu código único
        </Heading>

        <Input
          mb={2}
          placeholder="Qual o código do bolão?"
          onChangeText={setCode}
          autoCapitalize="characters"
        />

        <Button
          title="BUSCAR POR CÓDIGO"
          isLoading={isLoading}
          onPress={handleJoinPoll}
        />
      </VStack>
    </VStack>
  )
}