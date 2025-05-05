import { beforeEach, describe, expect, it, vi } from "vitest";

import { useTheme } from "@/components/theme/theme-provider";
import { act, renderHook } from "~/tests/test-utils";

describe("useTheme", () => {
	beforeEach(() => {
		// 清理 localStorage
		localStorage.clear();
		// 清理 document root 的主题类
		document.documentElement.classList.remove("light", "dark");
		// 重置 matchMedia
		window.matchMedia = vi.fn().mockImplementation((query) => ({
			matches: false,
			media: query,
			onchange: null,
			addListener: vi.fn(),
			removeListener: vi.fn(),
			addEventListener: vi.fn(),
			removeEventListener: vi.fn(),
			dispatchEvent: vi.fn(),
		}));
	});

	it("should start with system theme and apply light theme when system prefers light", async () => {
		const { result } = renderHook(() => useTheme());

		expect(result.current.theme).toBe("system");
		// 等待 useEffect 执行完成
		await new Promise((resolve) => setTimeout(resolve, 0));
		expect(document.documentElement.classList.contains("light")).toBe(true);
	});

	it("should apply dark theme when system prefers dark", async () => {
		// Mock system dark theme preference
		window.matchMedia = vi.fn().mockImplementation((query) => ({
			matches: query === "(prefers-color-scheme: dark)",
			media: query,
			onchange: null,
			addListener: vi.fn(),
			removeListener: vi.fn(),
			addEventListener: vi.fn(),
			removeEventListener: vi.fn(),
			dispatchEvent: vi.fn(),
		}));

		const { result } = renderHook(() => useTheme());

		expect(result.current.theme).toBe("system");
		// 等待 useEffect 执行完成
		await new Promise((resolve) => setTimeout(resolve, 0));
		expect(document.documentElement.classList.contains("dark")).toBe(true);
	});

	it("should load theme from localStorage if available", async () => {
		localStorage.setItem("vite-ui-theme", "dark");

		const { result } = renderHook(() => useTheme());

		expect(result.current.theme).toBe("dark");
		// 等待 useEffect 执行完成
		await new Promise((resolve) => setTimeout(resolve, 0));
		expect(document.documentElement.classList.contains("dark")).toBe(true);
	});

	it("should change theme to dark", async () => {
		const { result } = renderHook(() => useTheme());

		act(() => {
			result.current.setTheme("dark");
		});

		// 等待 useEffect 执行完成
		await new Promise((resolve) => setTimeout(resolve, 0));
		expect(result.current.theme).toBe("dark");
		expect(localStorage.getItem("vite-ui-theme")).toBe("dark");
		expect(document.documentElement.classList.contains("dark")).toBe(true);
	});

	it("should change theme to light", () => {
		const { result } = renderHook(() => useTheme());

		act(() => {
			result.current.setTheme("light");
		});

		expect(result.current.theme).toBe("light");
		expect(localStorage.getItem("vite-ui-theme")).toBe("light");
		expect(document.documentElement.classList.contains("light")).toBe(true);
		expect(document.documentElement.classList.contains("dark")).toBe(false);
	});

	it("should change theme to system", async () => {
		localStorage.setItem("vite-ui-theme", "dark");

		// 模拟系统主题为 light
		window.matchMedia = vi.fn().mockImplementation((query) => ({
			matches: query === "(prefers-color-scheme: light)",
			media: query,
			onchange: null,
			addListener: vi.fn(),
			removeListener: vi.fn(),
			addEventListener: vi.fn(),
			removeEventListener: vi.fn(),
			dispatchEvent: vi.fn(),
		}));

		const { result } = renderHook(() => useTheme());

		act(() => {
			result.current.setTheme("system");
		});

		// 等待 useEffect 执行完成
		await new Promise((resolve) => setTimeout(resolve, 0));

		expect(result.current.theme).toBe("system");
		expect(localStorage.getItem("vite-ui-theme")).toBe("system");
		expect(document.documentElement.classList.contains("light")).toBe(true);
	});

	it("should throw error when used outside ThemeProvider", () => {
		const { result } = renderHook(() => useTheme(), {
			wrapper: ({ children }) => children,
		});

		expect(() => result.current).toThrow(
			"useTheme must be used within a ThemeProvider",
		);
	});
});
