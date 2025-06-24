
const storageUtils = {

  setData: (key: string, value: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('localStorage set error:', error);
    }
  },

  getData: (key: string): any => {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('localStorage get error:', error);
      return null;
    }
  },

  removeData: (key: string) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('localStorage remove error:', error);
    }
  },

  clearAllData: () => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('localStorage clear error:', error);
    }
  },

  // Session Storage APIs (if you need it)
  setSessionData: (key: string, value: any) => {
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('sessionStorage set error:', error);
    }
  },

  getSessionData: (key: string): any => {
    try {
      const data = sessionStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('sessionStorage get error:', error);
      return null;
    }
  },

  removeSessionData: (key: string) => {
    try {
      sessionStorage.removeItem(key);
    } catch (error) {
      console.error('sessionStorage remove error:', error);
    }
  },

  clearAllSessionData: () => {
    try {
      sessionStorage.clear();
    } catch (error) {
      console.error('sessionStorage clear error:', error);
    }
  },
};

export default storageUtils