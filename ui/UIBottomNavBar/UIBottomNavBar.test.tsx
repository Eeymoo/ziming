import type { UIBottomNavBarProps } from './types'

const props: UIBottomNavBarProps = {
  activeId: 'library',
  items: [
    { id: 'study', label: 'Study' },
    { id: 'library', label: 'Library' },
    { id: 'profile', label: 'Profile', accessibilityLabel: 'Open profile tab' },
  ],
  onChange: (id) => {
    void id
  },
}

void props
