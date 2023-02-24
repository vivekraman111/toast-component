import React from "react";

import Button from "../Button";

import styles from "./ToastPlayground.module.css";

import ToastShelf from "../ToastShelf";
import { ToastContext } from "../ToastProvider"

import useEscapeKey from "../../hooks/use-escape-key"

const VARIANT_OPTIONS = ["notice", "warning", "success", "error"];

function ToastPlayground() {
  const {addToast, closeAllToasts} = React.useContext(ToastContext);
  const [message, setMessage] = React.useState("");
  const [variant, setVariant] = React.useState(VARIANT_OPTIONS[0]);
  const messageRef = React.useRef()

  React.useEffect(() => {
    messageRef.current.focus()
  }, [])

  const handleEscape = React.useCallback(() => closeAllToasts(), [])

  useEscapeKey(handleEscape)

  // React.useEffect(() => {
  //   function handleEsc(event) {
  //     if(event.code === "Escape") {
  //       closeAllToasts()
  //     }
  //   }

  //   window.addEventListener('keydown', handleEsc)

  //   return () => window.removeEventListener('keydown', handleEsc)
  // }, [])

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>
      {<ToastShelf />}
      <form
        className={styles.controlsWrapper}
        onSubmit={(event) => {
          event.preventDefault()
          addToast(variant, message)
          setMessage("");
          setVariant(VARIANT_OPTIONS[0])
          messageRef.current.focus()
        }}
      >
        <div className={styles.row}>
          <label
            htmlFor="message"
            className={styles.label}
            style={{ alignSelf: "baseline" }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea
              id="message"
              ref={messageRef}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              className={styles.messageInput}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            {VARIANT_OPTIONS.map((option) => (
              <label key={option} htmlFor={`variant-${option}`}>
                <input
                  id={`variant-${option}`}
                  type="radio"
                  name="variant"
                  value={option}
                  checked={variant === option}
                  onChange={(event) => {
                    setVariant(event.target.value)
                    messageRef.current.focus()
                  }}
                />
                {option}
              </label>
            ))}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
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
