// provider === component
import { createContext, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const defaultSettings = {
  themeMode: "light",
};

const initialState = {
  ...defaultSettings,

  // Mode
  onToggleMode: () => {},
  onChangeMode: () => {},
};

const SettingsContext = createContext(initialState);

const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useLocalStorage("settings", {
    themeNode: initialState.themeMode,
  });

  // Mode
  const onToggleMode = () => {
    setSettings({
      ...settings,
      themeMode: settings.themeMode === "light" ? "dark" : "light",
    });
  };

  const onChangeMode = (event) => {
    setSettings({
      ...settings,
      themeMode: event.target.value,
    });
  };

  return (
    <SettingsContext.Provider
      value={{
        ...settings,
        onToggleMode,
        onChangeMode,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export { SettingsContext };
export default SettingsProvider;
