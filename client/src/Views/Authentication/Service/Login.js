import axios from "../../../Common/Utils/AxiosAgent";
import { IdentityHelper } from "../../../Common/Utils/IdentityHelper";

export const Authorize = {
  Login: async (LoginRequest) => {
    try {
      const response = await axios.post("/api/account/login", LoginRequest);

      const { strToken } = response;
      IdentityHelper.token = strToken;
    } catch (error) {
      console.error(error);
    }
  },
};
