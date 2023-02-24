import React from "react";

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  function addToast(variant, message) {
    setToasts(
      toasts.concat([
        {
          id: crypto.randomUUID(),
          variant: variant,
          message: message,
          isVisible: true
        },
      ])
    );
  }

  function closeToast(idClosed) {
    setToasts(toasts.map(toast => {
      if(toast.id === idClosed) {
        toast.isVisible = false
      }
      return toast
    } ));
  }

  function closeAllToasts() {
    setToasts(toasts.map(toast => {
      toast.isVisible = false
      return toast
    }));
  }

  return (
    <ToastContext.Provider
      value={{
        toasts,
        setToasts,
        addToast,
        closeToast,
        closeAllToasts,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
