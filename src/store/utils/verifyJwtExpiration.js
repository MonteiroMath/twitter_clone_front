import { jwtDecode } from "jwt-decode";

export default function itJwtTokenExpired(jwtToken) {
  const { exp } = jwtDecode(jwtToken);

  return Date.now() >= exp * 1000;
}
