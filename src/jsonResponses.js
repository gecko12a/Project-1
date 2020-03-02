// all stored data will be lost when node shuts down

const users = {};

const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

const respondJSONMeta = (request, response, status) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end();
};

// add ips
const addUser = (request, response, body) => {
  const responseJSON = {
    message: 'Name and age are both required',
  };
  // if no feild
  if (!body.name) {
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  let responseCode = 201;

  users[body.name] = {};

  users[body.name].name = body.name;

  if (responseCode === 201) {
    responseJSON.message = 'Created successfully';
    return respondJSON(request, response, responseCode, responseJSON);
  }

  return respondJSONMeta(request, response, responseCode);
};

// Get ips
const getUsers = (request, response, parsedUrl) => {
  if (parsedUrl === '/getUsers') {
    const responseJSON = { users };
    return respondJSON(request, response, 200, responseJSON);
  }

  const responseJSON = { message: 'Page not found' };
  return respondJSON(request, response, 404, responseJSON);
};

module.exports = {
  addUser,
  getUsers,
};
