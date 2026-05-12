import { Text, View } from 'react-native'
import { studyFlashcardTokens } from '../tokens'

interface FlashcardFrontProps {
  title: string
  question: string
  tip?: string
}

const tokens = studyFlashcardTokens

export function FlashcardFront({ title, question, tip }: FlashcardFrontProps) {
  return (
    <View className={`flex min-w-0 flex-col ${tokens.textBlock}`}>
      <Text className={tokens.title}>{title}</Text>
      <Text className={tokens.question}>{question}</Text>

      {tip ? (
        <View className={tokens.tipBox}>
          <Text className={tokens.tipText}>{tip}</Text>
        </View>
      ) : null}
    </View>
  )
}
