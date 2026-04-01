import { Uniwind } from "uniwind";
import { create } from "zustand";

type ThemeName = "light" | "dark";

interface AppThemeState {
	_syncTheme: (theme: ThemeName) => void;
	currentTheme: ThemeName;
	isDark: boolean;
	isLight: boolean;
	setTheme: (theme: ThemeName) => void;
	toggleTheme: () => void;
}

export const useAppThemeStore = create<AppThemeState>((set, get) => ({
	currentTheme: "light",
	isDark: false,
	isLight: true,

	setTheme: (theme) => {
		Uniwind.setTheme(theme);
	},

	toggleTheme: () => {
		Uniwind.setTheme(get().currentTheme === "light" ? "dark" : "light");
	},

	_syncTheme: (theme) => {
		set({
			currentTheme: theme,
			isDark: theme === "dark",
			isLight: theme === "light",
		});
	},
}));
