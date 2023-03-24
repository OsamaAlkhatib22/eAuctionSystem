import jwtDecode from "jwt-decode";

export const IdentityHelper = {
  isTokenValid(token = localStorage.getItem("user")) {
    try {
      jwtDecode(token);

      return true;
    } catch (e) {
      return false;
    }
  },

  get UserData() {
    return this.isTokenValid() ? jwtDecode(this.token) : null;
  },

  get CourtData() {
    if (this.isTokenValid()) {
      if (jwtDecode(this.token).objCourtData) {
        return JSON.parse(jwtDecode(this.token).objCourtData);
      }
    }

    return null;
  },

  get isAuthorized() {
    return this.isTokenValid() ? true : false;
  },

  get hasCourt() {
    if (this.isTokenValid()) {
      if (jwtDecode(this.token).objCourtData) {
        return true;
      }
    }

    return false;
  },

  get token() {
    if (this.isTokenValid()) {
      return localStorage.getItem("user");
    } else {
      return null;
    }
  },

  set token(val) {
    if (this.isTokenValid(val)) {
      localStorage.setItem("user", val);
    } else {
      localStorage.removeItem("user");
    }
  },

  get TokenReminingMinutes() {
    if (this.isTokenValid()) {
      return (this.UserData.exp * 1000 - new Date()) / 60000;
    } else {
      return null;
    }
  },

  removeToken: () => {
    localStorage.removeItem("user");
  },
};
