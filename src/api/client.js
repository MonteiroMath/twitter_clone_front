import setJwtHeader from "../store/utils/setJwtHeader";

export async function client(endpoint, method, body, extraHeaders = {}) {
  const baseUrl = `http://localhost:6868`;
  const headers = { "Content-Type": "application/json", ...extraHeaders };
  const mode = "cors";

  const config = {
    method,
    headers,
    mode,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(baseUrl + endpoint, config);

  const data = await response.json();
  return data;
}

client.get = async function (endpoint, extraHeaders = {}) {
  return client(endpoint, "GET", null, extraHeaders);
};

client.post = async function (endpoint, body, extraHeaders = {}) {
  return client(endpoint, "POST", body, extraHeaders);
};

client.put = async function (endpoint, body, extraHeaders = {}) {
  return client(endpoint, "PUT", body, extraHeaders);
};

client.delete = async function (endpoint, body, extraHeaders = {}) {
  return client(endpoint, "DELETE", body, extraHeaders);
};

client.getTweet = (id, userId) => client.get(`/tweets/${id}?userId=${userId}`);

client.getUserData = (username, jwtToken) =>
  client.get(`/users?username=${username}`, setJwtHeader(jwtToken));

client.registerUser = ({ email, username, password, birthDate }) =>
  client.post("/users/register", { email, username, password, birthDate });

client.login = (email, password) =>
  client.post("/users/login", { email, password });

client.follow = (followedId, jwtToken) =>
  client.post(`/users/follow/${followedId}`, {}, setJwtHeader(jwtToken));

client.unfollow = (followedId, jwtToken) =>
  client.delete(`/users/follow/${followedId}`, {}, setJwtHeader(jwtToken));

client.getFollowers = (username, jwtToken) =>
  client.get(`/users/${username}/followers`, setJwtHeader(jwtToken));

client.getFollowing = (username, jwtToken) =>
  client.get(`/users/${username}/following`, setJwtHeader(jwtToken));

client.getMessages = (conversationID, jwtToken) =>
  client.get(`/messages/${conversationID}`, setJwtHeader(jwtToken));

client.getConversations = (userID, jwtToken) =>
  client.get(`/messages/conversations/${userID}`, setJwtHeader(jwtToken));

client.postMessage = (conversationID, newMessage, jwtToken) =>
  client.post(
    `/messages/${conversationID}`,
    { newMessage },
    setJwtHeader(jwtToken)
  );

client.postConversation = (participantsIDs, jwtToken) =>
  client.post(`/messages`, { ...participantsIDs }, setJwtHeader(jwtToken));

client.getSummary = (conversationID, jwtToken) =>
  client.get(`/messages/${conversationID}/summary`, setJwtHeader(jwtToken));

client.markRead = (messageID, jwtToken) =>
  client.put(`/messages/read/${messageID}`, {}, setJwtHeader(jwtToken));
