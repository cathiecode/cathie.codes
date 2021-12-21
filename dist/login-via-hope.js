// tinydom

t = (name) => (attributes) => (children) => {
  const elm = document.createElement(name);
  Object.keys(attributes).forEach((key) => {
    if (key === "className") {
      elm.setAttribute("class", attributes[key]);
    } else if (key.slice(0, 2) === "on") {
      elm.addEventListener(key.slice(2), attributes[key])
    } else {
      elm.setAttribute(key, attributes[key]);
    }
  });
  children.forEach(child => {
    if (typeof child === "string") {
      elm.appendChild(document.createTextNode(child))
    } else {
      elm.appendChild(child)
    }
  });
  return elm;
}

["h1", "h2", "h3", "h4", "h5", "h6", "p", "a", "div", "span", "input", "button"].forEach(e => t[e] = t(e))
t.text = (text) => document.createTextNode(text);
t.body = (children) => { children.forEach(child => document.body.appendChild(child)) }

// End of tinydom

const BASE_URL = "https://cathie.codes";
const FUNCTION_URL = `${BASE_URL}/.netlify/functions/login-via-hope`;
const HOPE_LOGIN_URL = `https://hope.c.fun.ac.jp/cas/login?service=${encodeURI(FUNCTION_URL)}`;

const loginButton = (text, onClick) => {
  return t.button({ className: "loginBox__loginButton", onclick: onClick })([t.text(text), t.div({ className: "loginBox__loginButton__ripple" })([])])
}

const loginBox = () => {
  const query = document.location.search.substring(1).split('&').map((p) => p.split('=')).reduce((obj, e) => ({ ...obj, [e[0]]: e[1] }), {});
  switch (query.authStatus) {
    case undefined:
      return [loginButton("HOPEでログイン", () => { location.href = HOPE_LOGIN_URL })]
    case "error":
      return [
        t.text("ログインに失敗しました"),
        loginButton("HOPEでログイン", () => { location.href = HOPE_LOGIN_URL })
      ]
    case "ok":
      return [t.text(`ようこそ、${query.authUser}さん`)]
  }
}

t.body([t.div({ className: "loginBox" })(loginBox())])
document.head.appendChild(t("style")({})([t.text(`
.loginBox {
  position: fixed;
  display: inline-block;

  bottom: 8px;
  right: 8px;

  border-radius: 8px;
  padding: 16px;

  box-shadow: 0 2px 2px rgba(0, 0, 0, 25%);

  background-color: #fff;
}

.loginBox__loginButton {
  position: relative;
  padding: 8px;
  overflow: hidden;
  border: none;
  border-radius: 4px;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 25%);
  background-color: #0f6fc5;
  color: #fff;
}

.loginBox__loginButton .loginBox__loginButton__ripple {
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 100%;
  width: 300px;
  height: 300px;
  transform: translate(-50%, -50%) scale(0);
  background-color: #fff;
  opacity: 0%;

  transition: transform ease-out 0ms 300ms, opacity linear 300ms;
}

.loginBox__loginButton:active .loginBox__loginButton__ripple {
  transform: translate(-50%, -50%) scale(1);
  transition: transform ease-out 150ms;
  opacity: 50%;
}
`)]))
