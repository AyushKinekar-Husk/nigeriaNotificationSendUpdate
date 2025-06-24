const isDebug = process.env.NODE_ENV !== "production"; // or use __DEV__ if in React Native

const logger = {
  log: (...args: any[]) => {
    if (isDebug) {
      console.log(...args);
    }
  },
  warn: (...args: any[]) => {
    if (isDebug) {
      console.warn(...args);
    }
  },
  error: (...args: any[]) => {
    if (isDebug) {
      console.error(...args);
    } else {
      // TODO: Send to Firebase, Sentry, etc.
    }
  },
  info: (...args: any[]) => {
    if (isDebug) {
      console.info(...args);
    }
  },
};

export default logger;
