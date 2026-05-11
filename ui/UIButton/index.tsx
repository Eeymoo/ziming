import { View } from 'react-native'
import type { UIButtonProps } from './types'

export function UIButton({ children, style }: UIButtonProps) {
  return (
    <View style={style}>
      {children}
    </View>
  )
}