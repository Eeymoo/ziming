import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import { Pressable, Text, View } from 'react-native'
import { UIIcon } from '../../UIIcon'
import { studyFlashcardColorTokens, studyFlashcardTokens } from '../tokens'
import type { UIFlashcardStatus } from '../types'

interface FlashcardMetaProps {
  category?: string
  status: UIFlashcardStatus
  showMoreButton: boolean
  disabled?: boolean
  onMore?: () => void
}

const tokens = studyFlashcardTokens

export function FlashcardMeta({
  category,
  status,
  showMoreButton,
  disabled = false,
  onMore,
}: FlashcardMetaProps) {
  const pillClassName = [
    tokens.categoryPill,
    status === 'unknown' ? tokens.categoryPillUnknown : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <View className={tokens.metaRow}>
      <View className={tokens.metaGrow}>
        {category ? (
          <Text className={pillClassName} numberOfLines={1}>
            {category}
          </Text>
        ) : null}
      </View>

      {showMoreButton ? (
        <Pressable
          accessibilityLabel="More options"
          accessibilityRole="button"
          className={tokens.moreButton}
          disabled={disabled || !onMore}
          onPress={onMore}
        >
          <UIIcon color={studyFlashcardColorTokens.more} icon={faEllipsisVertical} size={16} />
        </Pressable>
      ) : null}
    </View>
  )
}
