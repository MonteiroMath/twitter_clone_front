import { jwtDecode } from "jwt-decode";

export default function isJwtTokenExpired(jwtToken) {
  const { exp } = jwtDecode(jwtToken);

  return Date.now() >= exp * 1000;
}
