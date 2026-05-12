import { useState } from "react";
import {
    faBookBookmark,
    faBookOpen,
    faUser,
} from "@fortawesome/free-solid-svg-icons";
import { View } from "react-native";
import { UIIcon } from "../ui/UIIcon";
import { UIBottomNavBar } from "../ui/UIBottomNavBar";
import { LibraryScreen } from "./screens/LibraryScreen";
import { ProfileScreen } from "./screens/ProfileScreen";
import { StudyScreen } from "./screens/StudyScreen";

type HomeTab = "study" | "library" | "profile";

function isHomeTab(value: string): value is HomeTab {
    return value === "study" || value === "library" || value === "profile";
}

export default function Home() {
    const [activeTab, setActiveTab] = useState<HomeTab>("study");

    function handleTabChange(nextTab: string) {
        if (!isHomeTab(nextTab)) {
            return;
        }

        setActiveTab(nextTab);
    }

    return (
        <View className="flex-1 bg-surface">
            <View className="flex-1">
                {activeTab === "study" ? <StudyScreen /> : null}
                {activeTab === "library" ? <LibraryScreen /> : null}
                {activeTab === "profile" ? <ProfileScreen /> : null}
            </View>

            <UIBottomNavBar
                activeId={activeTab}
                itemStyle={{ minHeight: 68 }}
                onChange={handleTabChange}
                style={{ bottom: 12 }}
                items={[
                    {
                        id: "study",
                        label: "Study",
                        icon: <UIIcon icon={faBookOpen} />,
                    },
                    {
                        id: "library",
                        label: "Library",
                        icon: <UIIcon icon={faBookBookmark} />,
                    },
                    {
                        id: "profile",
                        label: "Profile",
                        icon: <UIIcon icon={faUser} />,
                    },
                ]}
            />
        </View>
    );
}
