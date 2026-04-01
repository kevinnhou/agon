import { Tabs } from "expo-router";
import { useThemeColor } from "heroui-native";
import { Compass, Home } from "lucide-react-native";

export default function TabLayout() {
	const themeColorForeground = useThemeColor("foreground");
	const themeColorBackground = useThemeColor("background");

	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				headerStyle: {
					backgroundColor: themeColorBackground,
				},
				headerTintColor: themeColorForeground,
				headerTitleStyle: {
					color: themeColorForeground,
					fontWeight: "600",
				},
				tabBarStyle: {
					backgroundColor: themeColorBackground,
				},
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Primary",
					tabBarIcon: ({ color, size }: { color: string; size: number }) => (
						<Home color={color} size={size} />
					),
				}}
			/>
			<Tabs.Screen
				name="secondary"
				options={{
					title: "Secondary",
					tabBarIcon: ({ color, size }: { color: string; size: number }) => (
						<Compass color={color} size={size} />
					),
				}}
			/>
		</Tabs>
	);
}
