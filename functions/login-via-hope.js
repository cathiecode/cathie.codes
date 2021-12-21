const fetch = require("node-fetch");

const BASE_URL = "https://cathie.codes";
const FUNCTION_URL = `${BASE_URL}/.netlify/functions/login-via-hope`;
const VALIDATION_URL = `https://hope.c.fun.ac.jp/cas/login?service=${encodeURI(FUNCTION_URL)}&ticket=`;

exports.handler = async (event, context) => {
  console.log("Logging in via hope")
  const ticket = event.queryStringParameters.ticket;
  console.log("ticket", ticket);
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
        "Location": BASE_URL + "?authStatus=error&by=invalid_response"
      }
    }
  }

  const validationResponseText = await validationResponse.text();
  console.log("response_text", validationResponseText);

  const validationResponseArray = validationResponseText.split("\n");
  console.log("response_parsed", JSON.stringify(validationResponseArray));

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
