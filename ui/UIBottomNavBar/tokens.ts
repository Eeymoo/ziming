// UIBottomNavBar 专属 Token 到 NativeWind className 的映射，后续调整该组件样式时集中修改这里。
export const bottomNavBarTokens = {
  container: 'absolute inset-x-1 bottom-0 z-50 flex-row items-center justify-around gap-2 rounded-[20px] bg-surface px-3 py-2.5 shadow-lg',
  item: 'min-h-[72px] flex-1 items-center justify-center gap-1 rounded-full px-3.5 py-2 active:scale-90',
  activeItem: 'bg-primary-container',
  icon: 'items-center justify-center',
  activeContent: 'text-primary',
  inactiveContent: 'text-on-surface-variant',
  label: 'text-base leading-5 font-label-bold',
} as const

// 颜色 Token 单独导出给不支持 currentColor 的图标组件使用，例如 Font Awesome。
export const bottomNavBarColorTokens = {
  activeContent: '#007F3D',
  inactiveContent: '#4F5B53',
} as const
