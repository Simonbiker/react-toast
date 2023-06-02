import React from "react";

export const ToastContext = React.createContext();

function ToastProvider({children}) {
  const [toasts, setToasts] = React.useState([
    {
      id: crypto.randomUUID(),
      message: 'Oh no',
      variant: 'error'
    },
    {
      id: crypto.randomUUID(),
      message: 'Logged in',
      variant: 'success'
    }
  ]);

  function createToast(message, variant) {
    const nextToasts =[
      ...toasts,
      {
        id: crypto.randomUUID(),
        message,
        variant
      }
    ];

    setToasts(nextToasts);
  }

  function dismissToast(id) {
    const nextToast = toasts.filter((toast) => {
      return toast.id !== id;
    });
    setToasts(nextToast);
  }

  React.useEffect(() => {
    function handleKeyDown(event) {
      if (event.code === 'Escape') {
        setToasts([]);
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);


  return (
  <ToastContext.Provider value={{toasts, createToast,dismissToast }}>
    {children}
  </ToastContext.Provider>)
}

export default ToastProvider;
