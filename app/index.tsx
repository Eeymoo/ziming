import { useState } from 'react'
import { faBookOpen, faBookBookmark, faUser } from '@fortawesome/free-solid-svg-icons'
import { Text, View } from 'react-native'
import { UIIcon } from '../ui/UIIcon'
import { UIBottomNavBar } from '../ui/UIBottomNavBar'

export default function Home() {
  const [activeTab, setActiveTab] = useState('library')

  return (
    <View className="flex-1 bg-surface" style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <View className="flex-1 items-center justify-center">
        <Text className="text-xl font-label-bold text-primary">{activeTab}</Text>
      </View>
      <UIBottomNavBar
        activeId={activeTab}
        onChange={setActiveTab}
        items={[
          {
            id: 'study',
            label: 'Study',
            icon: <UIIcon icon={faBookOpen} />,
          },
          {
            id: 'library',
            label: 'Library',
            icon: <UIIcon icon={faBookBookmark} />,
          },
          {
            id: 'profile',
            label: 'Profile',
            icon: <UIIcon icon={faUser} />,
          },
        ]}
      />
    </View>
  )
}
