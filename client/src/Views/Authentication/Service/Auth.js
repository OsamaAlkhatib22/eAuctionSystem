import axios from "../../../Common/Utils/AxiosAgent";
import { IdentityHelper } from "../../../Common/Utils/IdentityHelper";

export const Authorize = {
  Login: async (LoginRequest) => {
    try {
      const response = await axios.post("/api/account/login", LoginRequest);

      IdentityHelper.token = response.data;
      return IdentityHelper.isTokenValid();
    } catch (error) {
      return false;
    }
  },

  Register: async (registrationRequest) => {
    try {
      const response = await axios.post(
        "/api/account/register",
        registrationRequest
      );

      IdentityHelper.token = response.data;
      return IdentityHelper.isTokenValid();
    } catch (error) {
      return false;
    }
  },
};
