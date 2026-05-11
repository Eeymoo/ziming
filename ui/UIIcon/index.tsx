import { createContext, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { View } from 'react-native'
import type { UIIconProps, UIIconProviderProps } from './types'

const UIIconColorContext = createContext<string | undefined>(undefined)

export function UIIconProvider({ color, children }: UIIconProviderProps) {
  return (
    <UIIconColorContext.Provider value={color}>
      {children}
    </UIIconColorContext.Provider>
  )
}

export function UIIcon({ icon, size = 24, color, style, iconStyle }: UIIconProps) {
  // FontAwesomeIcon 不会自动继承 Text 颜色，因此在 UIIcon 中统一接入父级颜色上下文。
  const inheritedColor = useContext(UIIconColorContext)

  return (
    <View style={style}>
      <FontAwesomeIcon color={color ?? inheritedColor} icon={icon} size={size} style={iconStyle} />
    </View>
  )
}
