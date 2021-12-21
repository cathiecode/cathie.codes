const fetch = require("node-fetch");

const BASE_URL = "https://cathie.codes";
const FUNCTION_URL = `${BASE_URL}/.netlify/functions/login-via-hope`;
const VALIDATION_URL = `https://hope.c.fun.ac.jp/cas/validate?service=${encodeURI(FUNCTION_URL)}&ticket=`;

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
  console.log("validating", VALIDATION_URL + ticket);

  if (!validationResponse.ok) {
    return {
      statusCode: 302,
      headers: {
        "Location": BASE_URL + "?authStatus=error&by=invalid_response_status"
      }
    }
  }

  const validationResponseText = await validationResponse.text();

  const validationResponseArray = validationResponseText.split("\n");

  if (validationResponseArray[0] !== "yes") {
    if (validationResponseArray[0] === "no") {
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
          "Location": BASE_URL + "?authStatus=error&by=invalid_response"
        }
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
