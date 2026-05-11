import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import type { FontAwesomeIconStyle } from '@fortawesome/react-native-fontawesome'
import type { StyleProp, TextStyle, ViewStyle } from 'react-native'

export interface UIIconProps {
  /** Font Awesome 图标定义。 */
  icon: IconDefinition
  /** 图标尺寸，默认 24。 */
  size?: number
  /** 图标颜色；未传入时继承 UIIconProvider 提供的父级颜色。 */
  color?: string
  /** 容器样式覆盖。 */
  style?: StyleProp<ViewStyle>
  /** 图标本身样式覆盖。 */
  iconStyle?: FontAwesomeIconStyle
}

export interface UIIconProviderProps {
  /** 传递给子级 UIIcon 的继承颜色。 */
  color: string
  children?: React.ReactNode
}
