import type { ReactNode } from 'react'
import type { StyleProp, TextStyle, ViewStyle } from 'react-native'

export interface UIBottomNavBarItem {
  /** 导航项唯一标识，用于匹配 activeId。 */
  id: string
  /** 展示在底部导航中的标签文本。 */
  label: string
  /** 可选图标；若使用 UIIcon，会自动继承当前导航项内容颜色。 */
  icon?: ReactNode
  /** 无障碍标签，未传入时默认使用 label。 */
  accessibilityLabel?: string
}

export interface UIBottomNavBarProps {
  /** 当前激活的导航项 id。 */
  activeId: string
  /** 底部导航项列表。 */
  items: UIBottomNavBarItem[]
  /** 点击导航项时触发，返回被点击项 id。 */
  onChange?: (id: string) => void
  /** 容器原生样式覆盖，优先用于布局定位。 */
  style?: StyleProp<ViewStyle>
  /** 单个导航项原生样式覆盖。 */
  itemStyle?: StyleProp<ViewStyle>
  /** 激活导航项原生样式覆盖。 */
  activeItemStyle?: StyleProp<ViewStyle>
  /** 标签原生文本样式覆盖。 */
  labelStyle?: StyleProp<TextStyle>
}
