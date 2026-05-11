import type { UIBottomNavBarProps } from './types'
import { Pressable, Text, View } from 'react-native'
import { bottomNavBarColorTokens, bottomNavBarTokens } from './tokens'
import { UIIconProvider } from '../UIIcon'

const tokens = bottomNavBarTokens

export function UIBottomNavBar({
  activeId,
  items,
  onChange,
  style,
  itemStyle,
  activeItemStyle,
  labelStyle,
}: UIBottomNavBarProps) {
  return (
    <View className={tokens.container} style={style}>
      {items.map((item) => {
        const isActive = item.id === activeId
        const contentClassName = isActive ? tokens.activeContent : tokens.inactiveContent
        const contentColor = isActive
          ? bottomNavBarColorTokens.activeContent
          : bottomNavBarColorTokens.inactiveContent

        return (
          <Pressable
            key={item.id}
            accessibilityLabel={item.accessibilityLabel ?? item.label}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
            onPress={() => onChange?.(item.id)}
            className={`${tokens.item} ${isActive ? tokens.activeItem : ''}`}
            style={[itemStyle, isActive && activeItemStyle]}
          >
            {item.icon ? (
              // 图标容器使用内容态 Token，便于 NativeWind 后续统一管理图标颜色。
              <View className={`${tokens.icon} ${contentClassName}`}>
                <UIIconProvider color={contentColor}>{item.icon}</UIIconProvider>
              </View>
            ) : null}
            <Text
              numberOfLines={1}
              className={`${tokens.label} ${contentClassName}`}
              style={labelStyle}
            >
              {item.label}
            </Text>
          </Pressable>
        )
      })}
    </View>
  )
}
