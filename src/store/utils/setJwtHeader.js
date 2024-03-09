function setJwtHeader(jwtToken) {
  return { Authorization: `Bearer ${jwtToken}` };
}

export default setJwtHeader;
