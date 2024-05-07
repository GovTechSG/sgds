(() => {
    "use strict";

    const AUTO_THEME = "auto";
    const DARK_THEME = "dark";
    const LIGHT_THEME = "light";
    const getStoredTheme = () => localStorage.getItem("theme");
    const setStoredTheme = (theme) => localStorage.setItem("theme", theme);

    const getPreferredTheme = () => {
        const storedTheme = getStoredTheme();
        if (storedTheme) {
            return storedTheme;
        }

        return window.matchMedia("(prefers-color-scheme: dark)").matches
            ? DARK_THEME
            : LIGHT_THEME;
    };

    const setTheme = (theme) => {
        if (theme === AUTO_THEME) {
            document.documentElement.setAttribute(
                "data-bs-theme",
                window.matchMedia("(prefers-color-scheme: dark)").matches
                    ? DARK_THEME
                    : LIGHT_THEME
            );
        } else {
            document.documentElement.setAttribute("data-bs-theme", theme);
        }
    };

    setTheme(getPreferredTheme());

    window.addEventListener("DOMContentLoaded", () => {
        const modeToggler = document.querySelector(".mode-toggle");
        const getToggledTheme = (theme) =>
            theme === DARK_THEME ? LIGHT_THEME : DARK_THEME;

        modeToggler.addEventListener("click", () => {
            const theme =
                document.documentElement.getAttribute("data-bs-theme");
            setStoredTheme(getToggledTheme(theme));
            setTheme(getToggledTheme(theme));
        });
    });
})();
