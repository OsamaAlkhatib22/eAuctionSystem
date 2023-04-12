import axios from "../../../Common/Utils/AxiosAgent";

export const GetComplaintsApi = async () => {
  try {
    return await axios.get("api/complaints");
  } catch (error) {
    console.error(error);
  }
};
