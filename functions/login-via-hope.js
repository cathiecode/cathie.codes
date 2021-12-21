const fetch = require("node-fetch");

const BASE_URL = "https://cathie.codes/";

const VALIDATION_URL = `https://hope.c.fun.ac.jp/cas/login?service=${encodeURI(BASE_URL)}&ticket=`;

exports.handler = async (event, context) => {
  const ticket = event.queryStringParameters.ticket;
  if (!ticket) {
    return {
      statusCode: 302,
      headers: {
        "Location": BASE_URL + "?authStatus=error&by=no_ticket"
      }
    }
  }

  const validationResponse = await fetch(VALIDATION_URL + ticket);

  if (!validationResponse.ok) {
    return {
      statusCode: 302,
      headers: {
        "Location": BASE_URL + "?authStatus=error&by=invalid_response"
      }
    }
  }

  const validationResponseText = await validationResponse.text();

  const validationResponseArray = validationResponseText.split("\n");

  if (validationResponseArray[0] !== "yes") {
    return {
      statusCode: 302,
      headers: {
        "Location": BASE_URL + "?authStatus=error&by=no_response"
      }
    }
  } else {
    return {
      statusCode: 302,
      headers: {
        "Location": BASE_URL + `?authStatus=ok&authUser=${validationResponseArray[1]}`
      }
    }
  }
}
