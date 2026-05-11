import { View } from 'react-native'
import type { ComponentTempProps } from './types'

export function ComponentTemp({ children, style }: ComponentTempProps) {
  return (
    <View style={style}>
      {children}
    </View>
  )
}