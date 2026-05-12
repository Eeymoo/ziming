import { faFaceFrown, faFaceSmile } from '@fortawesome/free-solid-svg-icons'
import { Pressable, Text, View } from 'react-native'
import { UIIcon } from '../../UIIcon'
import { studyFlashcardColorTokens, studyFlashcardTokens } from '../tokens'
import type { UIFlashcardStatus } from '../types'

interface FlashcardActionBarProps {
  status: UIFlashcardStatus
  disabled?: boolean
  onKnown?: () => void
  onUnknown?: () => void
}

const tokens = studyFlashcardTokens

function getUnknownButtonClassName(status: UIFlashcardStatus, locked: boolean) {
  return [
    tokens.actionButton,
    tokens.actionDivider,
    status === 'unknown' ? tokens.actionUnknownSelected : '',
    status === 'known' ? tokens.actionMuted : '',
    locked ? tokens.actionButtonDisabled : '',
  ]
    .filter(Boolean)
    .join(' ')
}

function getKnownButtonClassName(status: UIFlashcardStatus, locked: boolean) {
  return [
    tokens.actionButton,
    status === 'known' ? tokens.actionKnownSelected : '',
    status === 'unknown' ? tokens.actionMuted : '',
    locked ? tokens.actionButtonDisabled : '',
  ]
    .filter(Boolean)
    .join(' ')
}

function getUnknownContentClassName(status: UIFlashcardStatus) {
  if (status === 'unknown') {
    return 'text-study-on-surface-variant'
  }

  return status === 'known' ? 'text-outline' : tokens.actionUnknownIdle
}

function getKnownContentClassName(status: UIFlashcardStatus) {
  if (status === 'known') {
    return 'text-study-primary'
  }

  return status === 'unknown' ? 'text-outline' : tokens.actionKnownIdle
}

function getUnknownColor(status: UIFlashcardStatus) {
  return status === 'unknown'
    ? studyFlashcardColorTokens.onSurfaceVariant
    : studyFlashcardColorTokens.outline
}

function getKnownColor(status: UIFlashcardStatus) {
  return status === 'unknown'
    ? studyFlashcardColorTokens.outline
    : studyFlashcardColorTokens.studyPrimary
}

export function FlashcardActionBar({
  status,
  disabled = false,
  onKnown,
  onUnknown,
}: FlashcardActionBarProps) {
  const unknownLocked = disabled || status !== 'idle' || !onUnknown
  const knownLocked = disabled || status !== 'idle' || !onKnown
  const unknownContentClassName = getUnknownContentClassName(status)
  const knownContentClassName = getKnownContentClassName(status)

  return (
    <View className={tokens.actionBar}>
      <Pressable
        accessibilityLabel="Mark as unknown"
        accessibilityRole="button"
        accessibilityState={{ disabled: unknownLocked, selected: status === 'unknown' }}
        className={getUnknownButtonClassName(status, unknownLocked)}
        disabled={unknownLocked}
        onPress={onUnknown}
      >
        <UIIcon color={getUnknownColor(status)} icon={faFaceFrown} size={18} />
        <Text className={`${tokens.actionLabel} ${unknownContentClassName}`}>UNKNOWN</Text>
      </Pressable>

      <Pressable
        accessibilityLabel="Mark as known"
        accessibilityRole="button"
        accessibilityState={{ disabled: knownLocked, selected: status === 'known' }}
        className={getKnownButtonClassName(status, knownLocked)}
        disabled={knownLocked}
        onPress={onKnown}
      >
        <UIIcon color={getKnownColor(status)} icon={faFaceSmile} size={18} />
        <Text className={`${tokens.actionLabel} ${knownContentClassName}`}>KNOWN</Text>
      </Pressable>
    </View>
  )
}
