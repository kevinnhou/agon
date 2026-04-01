import "@/global.css";
import { Stack } from "expo-router";
import { HeroUINativeProvider } from "heroui-native";
import { type ReactNode, useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { useUniwind } from "uniwind";

import { useAppThemeStore } from "@/stores/theme-store";

export const unstable_settings = {
	initialRouteName: "(tabs)",
};

function AppTheme({ children }: { children: ReactNode }) {
	const { theme } = useUniwind();
	const syncTheme = useAppThemeStore((s) => s._syncTheme);

	useEffect(() => {
		syncTheme(theme as "light" | "dark");
	}, [theme, syncTheme]);

	return <>{children}</>;
}

function StackLayout() {
	return (
		<Stack screenOptions={{}}>
			<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
		</Stack>
	);
}

export default function Layout() {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<KeyboardProvider>
				<AppTheme>
					<HeroUINativeProvider>
						<StackLayout />
					</HeroUINativeProvider>
				</AppTheme>
			</KeyboardProvider>
		</GestureHandlerRootView>
	);
}
