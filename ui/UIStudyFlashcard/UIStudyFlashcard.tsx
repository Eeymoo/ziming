import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { View } from 'react-native'
import { UIIcon } from '../UIIcon'
import { FlashcardActionBar } from './parts/FlashcardActionBar'
import { FlashcardBack } from './parts/FlashcardBack'
import { FlashcardFlipArea } from './parts/FlashcardFlipArea'
import { FlashcardFront } from './parts/FlashcardFront'
import { FlashcardMeta } from './parts/FlashcardMeta'
import { studyFlashcardColorTokens, studyFlashcardTokens } from './tokens'
import type { UIFlashcardStatus, UIStudyFlashcardProps } from './types'

const tokens = studyFlashcardTokens

function getContainerClassName(status: UIFlashcardStatus) {
  switch (status) {
    case 'known':
      return tokens.knownContainer
    case 'unknown':
      return tokens.unknownContainer
    case 'idle':
    default:
      return tokens.idleContainer
  }
}

export function UIStudyFlashcard({
  category,
  title,
  question,
  tip,
  explanation,
  answer,
  side = 'front',
  status = 'idle',
  disabled = false,
  onFlip,
  onKnown,
  onUnknown,
  onMore,
  className,
}: UIStudyFlashcardProps) {
  const isSelected = status !== 'idle'
  // 已选择态会冻结顶部更多按钮与翻面区，保持和 Stitch 选中示例一致。
  const isInteractionLocked = disabled || isSelected
  const rootClassName = [
    tokens.container,
    getContainerClassName(status),
    disabled ? tokens.disabledContainer : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ')
  const contentClassName = [
    tokens.content,
    isSelected ? tokens.contentSelectedBottom : tokens.contentDefaultBottom,
  ].join(' ')

  return (
    <View className={rootClassName}>
      {status === 'known' ? (
        <View className={tokens.selectionIndicator}>
          <UIIcon
            color={studyFlashcardColorTokens.selectedIndicator}
            icon={faCircleCheck}
            size={22}
          />
        </View>
      ) : null}

      <View className={contentClassName}>
        <View className={`flex min-w-0 flex-col ${tokens.contentStack}`}>
          <FlashcardMeta
            category={category}
            disabled={disabled}
            onMore={onMore}
            showMoreButton={status === 'idle' && typeof onMore === 'function'}
            status={status}
          />

          {side === 'back' ? (
            <FlashcardBack answer={answer} explanation={explanation} question={question} title={title} />
          ) : (
            <FlashcardFront question={question} tip={tip} title={title} />
          )}
        </View>
      </View>

      <FlashcardFlipArea
        disabled={isInteractionLocked}
        onFlip={onFlip}
        side={side}
        status={status}
      />

      <FlashcardActionBar
        disabled={isInteractionLocked}
        onKnown={onKnown}
        onUnknown={onUnknown}
        status={status}
      />
    </View>
  )
}
