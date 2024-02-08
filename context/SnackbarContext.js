import React, { createContext, useContext, useState, useCallback } from "react";
import { Snackbar } from "react-native-paper";

const SnackbarContext = createContext();

const SnackbarProvider = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("info"); // Can be "success", "error", "info"

  const showSnackbar = useCallback((message, type = "info") => {
    setVisible(true);
    setMessage(message);
    setType(type);
  }, []);

  const hideSnackbar = useCallback(() => {
    setVisible(false);
    setMessage("");
    setType("info");
  }, []);

  const contextValue = {
    showSnackbar,
    hideSnackbar,
  };

  return (
    <SnackbarContext.Provider value={contextValue}>
      {children}
      <Snackbar
        visible={visible}
        onDismiss={hideSnackbar}
        duration={Snackbar.DURATION_SHORT}
        style={{
          backgroundColor:
            type === "success"
              ? "#4CAF50"
              : type === "error"
              ? "#FF5252"
              : "#2196F3",
        }}
      >
        {message}
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};

export { SnackbarProvider, useSnackbar };
