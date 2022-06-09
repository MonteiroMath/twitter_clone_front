export async function client(endpoint, method, body) {
  const baseUrl = `http://localhost:5000`;
  const headers = { "Content-Type": "application/json" };
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

client.get = async function (endpoint) {
  return client(endpoint, "GET");
};

client.post = async function (endpoint, body) {
  return client(endpoint, "POST", body);
};

client.put = async function (endpoint, body) {
  return client(endpoint, "PUT", body);
};

client.delete = async function (endpoint, body) {
  return client(endpoint, "DELETE", body);
};
