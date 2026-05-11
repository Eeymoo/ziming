import { View } from 'react-native'
import type { UICardProps } from './types'

export function UICard({ children, style }: UICardProps) {
  return (
    <View style={style}>
      {children}
    </View>
  )
}