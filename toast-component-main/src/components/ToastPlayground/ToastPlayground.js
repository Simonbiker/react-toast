import React from 'react';
import ToastShelf from '../ToastShelf/ToastShelf';
import Button from '../Button';

import styles from './ToastPlayground.module.css';

const VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error'];


function ToastPlayground() {
  const [message, setMessage] = React.useState('');
  const [variant, setVariant] = React.useState(VARIANT_OPTIONS[0]);

  const [toasts, setToast] = React.useState([
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

  function handleCreateToast(event) {
    event.preventDefault();
    const nextToast = [
      ...toasts,
      {
        id: crypto.randomUUID(),
        message,
        variant
      }
    ];

    setToast(nextToast);

    setMessage('');
    setVariant(VARIANT_OPTIONS[0]);
  }

  function handleDismiss(id) {
    const nextToasts = toasts.filter(toast => {
      return toast.id !== id;
    });

    setToast(nextToasts);
  }
  
  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      <ToastShelf toasts={toasts} handleDismiss={handleDismiss}/>
      
      <form className={styles.controlsWrapper} onSubmit={handleCreateToast}>
        <div className={styles.row}>
          <label
            htmlFor="message"
            className={styles.label}
            style={{ alignSelf: 'baseline' }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea id="message" className={styles.messageInput}
            value={message} 
            onChange={(event) => {
              setMessage(event.target.value);
            }}/>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div
            className={`${styles.inputWrapper} ${styles.radioWrapper}`}
          >
            {VARIANT_OPTIONS.map((option) => {
              const id = `variant-${option}`
              return (
                <label key={id} htmlFor={id}>
              <input
                id={id}
                type="radio"
                name="variant"
                value={option}
                checked={option === variant}
                onChange={(event) => {
                  setVariant(event.target.value);
                }}
              />
              {option}
            </label>
              )
            })}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div
            className={`${styles.inputWrapper} ${styles.radioWrapper}`}
          >
            <Button>
              Pop Toast!
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ToastPlayground;