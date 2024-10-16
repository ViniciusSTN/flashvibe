import { useEffect, useState } from 'react'

const useTimeAgo = (timestamp: number) => {
  const [timeAgo, setTimeAgo] = useState<string>('')

  useEffect(() => {
    const calculateTimeAgo = () => {
      const now = Date.now()
      const elapsed = now - timestamp

      const seconds = Math.floor(elapsed / 1000)
      const minutes = Math.floor(seconds / 60)
      const hours = Math.floor(minutes / 60)
      const days = Math.floor(hours / 24)
      const weeks = Math.floor(days / 7)
      const months = Math.floor(days / 30)
      const years = Math.floor(days / 365)

      if (years > 0) return `${years} ano(s)`
      if (months > 0) return `${months} mês(es)`
      if (weeks > 0) return `${weeks} semana(s)`
      if (days > 0) return `${days} dia(s)`
      if (hours > 0) return `${hours} hora(s)`
      if (minutes > 0) return `${minutes} minuto(s)`
      return `${seconds} segundo(s)`
    }

    setTimeAgo(calculateTimeAgo())

    // Atualiza a cada minuto (60000 ms)
    const intervalId = setInterval(() => {
      setTimeAgo(calculateTimeAgo())
    }, 60000)

    // Limpeza do intervalo ao desmontar o componente
    return () => clearInterval(intervalId)
  }, [timestamp])

  return timeAgo
}

export default useTimeAgo
