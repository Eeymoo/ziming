import { faHandPointer, faRotateLeft } from '@fortawesome/free-solid-svg-icons'
import { Pressable, Text, View } from 'react-native'
import { UIIcon } from '../../UIIcon'
import { studyFlashcardColorTokens, studyFlashcardTokens } from '../tokens'
import type { UIFlashcardSide, UIFlashcardStatus } from '../types'

interface FlashcardFlipAreaProps {
  side: UIFlashcardSide
  status: UIFlashcardStatus
  disabled?: boolean
  onFlip?: () => void
}

const tokens = studyFlashcardTokens

export function FlashcardFlipArea({
  side,
  status,
  disabled = false,
  onFlip,
}: FlashcardFlipAreaProps) {
  const isRevealed = status !== 'idle'
  const isDisabled = disabled || isRevealed || !onFlip
  const buttonClassName = [
    tokens.flipButton,
    isDisabled ? tokens.flipButtonDisabled : '',
  ]
    .filter(Boolean)
    .join(' ')
  const label = isRevealed
    ? 'Revealed'
    : side === 'back'
      ? 'Tap to flip back'
      : 'Tap to view explanation'
  const icon = side === 'back' ? faRotateLeft : faHandPointer

  return (
    <View className={tokens.flipArea}>
      <Pressable
        accessibilityLabel={label}
        accessibilityRole="button"
        className={buttonClassName}
        disabled={isDisabled}
        onPress={onFlip}
      >
        {isRevealed ? null : (
          <UIIcon color={studyFlashcardColorTokens.outline} icon={icon} size={16} />
        )}
        <Text className={tokens.flipLabel}>{label}</Text>
      </Pressable>
    </View>
  )
}
