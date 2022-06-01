import { useContext } from "react";
import jwt_decode from "jwt-decode";

import { AppProviderContext } from "../../integration/context/appProviderContext";
import { server } from "../utils/constants";

export function useUserDetails() {
  const { state } = useContext(AppProviderContext);

  let token = state.token;
  let decodedToken, userId, role, imageUrl;
  if (token) {
    decodedToken = jwt_decode(token);
    userId = decodedToken.userId;
    role = decodedToken.role;
    imageUrl = server + decodedToken.image;
  }

  return [userId, role, imageUrl];
}
