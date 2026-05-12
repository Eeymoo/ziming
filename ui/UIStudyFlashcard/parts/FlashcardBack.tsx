import { Text, View } from 'react-native'
import { studyFlashcardTokens } from '../tokens'

interface FlashcardBackProps {
  title: string
  question: string
  explanation?: string
  answer?: string
}

type ExplanationLine = {
  kind: 'paragraph' | 'bullet'
  text: string
  marker?: string
}

const tokens = studyFlashcardTokens

function parseExplanation(explanation?: string): ExplanationLine[] {
  if (!explanation) {
    return []
  }

  // 兼容长解释文本与步骤列表，两者都按照 Stitch 的说明卡样式排版。
  return explanation
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const orderedMatch = line.match(/^(\d+[.)])\s+(.*)$/)
      if (orderedMatch) {
        return {
          kind: 'bullet',
          marker: orderedMatch[1],
          text: orderedMatch[2],
        }
      }

      const bulletMatch = line.match(/^[-•]\s+(.*)$/)
      if (bulletMatch) {
        return {
          kind: 'bullet',
          marker: '•',
          text: bulletMatch[1],
        }
      }

      return {
        kind: 'paragraph',
        text: line,
      }
    })
}

export function FlashcardBack({ title, question, explanation, answer }: FlashcardBackProps) {
  const explanationLines = parseExplanation(explanation)
  const showExplanationBox = explanationLines.length > 0 || Boolean(answer)

  return (
    <View className={`flex min-w-0 flex-col ${tokens.textBlock}`}>
      <Text className={tokens.title}>{title}</Text>
      <Text className={tokens.question}>{question}</Text>

      {showExplanationBox ? (
        <View className={tokens.explanationBox}>
          <View className={tokens.explanationEdge} />

          <View className={`flex min-w-0 flex-col ${tokens.explanationStack}`}>
            <Text className={tokens.explanationTitle}>Explanation</Text>

            {explanationLines.length > 0 ? (
              <View className="gap-2">
                {explanationLines.map((line, index) =>
                  line.kind === 'bullet' ? (
                    <View className={tokens.explanationListRow} key={`${line.marker ?? 'bullet'}-${index}`}>
                      <Text className={tokens.explanationBullet}>{line.marker}</Text>
                      <Text className={`flex-1 ${tokens.explanationParagraph}`}>{line.text}</Text>
                    </View>
                  ) : (
                    <Text className={tokens.explanationParagraph} key={`paragraph-${index}`}>
                      {line.text}
                    </Text>
                  ),
                )}
              </View>
            ) : null}

            {answer ? (
              <View className={tokens.explanationAnswer}>
                <Text className={tokens.explanationAnswerText}>{answer}</Text>
              </View>
            ) : null}
          </View>
        </View>
      ) : null}
    </View>
  )
}
