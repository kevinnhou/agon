import * as Haptics from "expo-haptics";
import { Moon, Sun } from "lucide-react-native";
import { Platform, Pressable } from "react-native";
import Animated, { FadeOut, ZoomIn } from "react-native-reanimated";
import { withUniwind } from "uniwind";

import { useAppThemeStore } from "@/stores/theme-store";

const StyledMoon = withUniwind(Moon);
const StyledSun = withUniwind(Sun);

export function ThemeToggle() {
	const toggleTheme = useAppThemeStore((s) => s.toggleTheme);
	const isLight = useAppThemeStore((s) => s.isLight);

	return (
		<Pressable
			className="px-2.5"
			onPress={() => {
				if (Platform.OS === "ios") {
					Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
				}
				toggleTheme();
			}}
		>
			{isLight ? (
				<Animated.View entering={ZoomIn} exiting={FadeOut} key="moon">
					<StyledMoon className="text-foreground" size={20} />
				</Animated.View>
			) : (
				<Animated.View entering={ZoomIn} exiting={FadeOut} key="sun">
					<StyledSun className="text-foreground" size={20} />
				</Animated.View>
			)}
		</Pressable>
	);
}
