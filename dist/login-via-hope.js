/*! js-cookie v3.0.1 | MIT */
!function (e, t) { "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = e || self, function () { var n = e.Cookies, o = e.Cookies = t(); o.noConflict = function () { return e.Cookies = n, o } }()) }(this, (function () { "use strict"; function e(e) { for (var t = 1; t < arguments.length; t++) { var n = arguments[t]; for (var o in n) e[o] = n[o] } return e } return function t(n, o) { function r(t, r, i) { if ("undefined" != typeof document) { "number" == typeof (i = e({}, o, i)).expires && (i.expires = new Date(Date.now() + 864e5 * i.expires)), i.expires && (i.expires = i.expires.toUTCString()), t = encodeURIComponent(t).replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent).replace(/[()]/g, escape); var c = ""; for (var u in i) i[u] && (c += "; " + u, !0 !== i[u] && (c += "=" + i[u].split(";")[0])); return document.cookie = t + "=" + n.write(r, t) + c } } return Object.create({ set: r, get: function (e) { if ("undefined" != typeof document && (!arguments.length || e)) { for (var t = document.cookie ? document.cookie.split("; ") : [], o = {}, r = 0; r < t.length; r++) { var i = t[r].split("="), c = i.slice(1).join("="); try { var u = decodeURIComponent(i[0]); if (o[u] = n.read(c, u), e === u) break } catch (e) { } } return e ? o[e] : o } }, remove: function (t, n) { r(t, "", e({}, n, { expires: -1 })) }, withAttributes: function (n) { return t(this.converter, e({}, this.attributes, n)) }, withConverter: function (n) { return t(e({}, this.converter, n), this.attributes) } }, { attributes: { value: Object.freeze(o) }, converter: { value: Object.freeze(n) } }) }({ read: function (e) { return '"' === e[0] && (e = e.slice(1, -1)), e.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent) }, write: function (e) { return encodeURIComponent(e).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g, decodeURIComponent) } }, { path: "/" }) }));

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
  return t.button({ className: "loginBox__loginButton", onclick: onClick })([t.text(text)])
}

const loginBox = () => {
  switch (Cookies.get("authStatus")) {
    case undefined:
      return [
        t.div({ className: "loginBox__header" })([t.text("未来大生ですか?"), t.button({ className: "loginBox__header__close", onclick: () => { document.getElementById("login-via-hope-box").remove() } })([])]),
        t.div({ className: "loginBox__body" })([loginButton("HOPEでログイン", () => { location.href = HOPE_LOGIN_URL })])
      ]
    case "error":
      return [
        t.div({ className: "loginBox__header" })([t.text("ログインに失敗しました"), t.button({ className: "loginBox__header__close", onclick: () => { document.getElementById("login-via-hope-box").remove() } })([])]),
        t.div({ className: "loginBox__body" })([loginButton("HOPEでログイン", () => { location.href = HOPE_LOGIN_URL })])
      ]
    case "ok":
      return [
        t.div({ className: "loginBox__body" })([t.text(`${Cookies.get("authUser")}としてログイン中`)])
      ]
  }
}

const query = document.location.search.substring(1).split('&').map((p) => p.split('=')).reduce((obj, e) => ({ ...obj, [e[0]]: e[1] }), {});

if (query.authStatus) {
  Cookies.set("authStatus", query.authStatus);
}
if (query.authUser) {
  Cookies.set("authUser", query.authUser);
}

t.body([t.div({ id: "login-via-hope-box", className: "loginBox" })(loginBox())])

document.head.appendChild(t("style")({})([t.text(`
.loginBox {
  position: fixed;
  display: inline-block;
  bottom: 8px;
  right: 8px;
  border: solid 1px #eee;
  min-width: 200px;
  border-radius: 8px;
  background-color: #fff;
  animation: login-via-hope-popup 250ms 5s both;
}

@keyframes login-via-hope-popup {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.loginBox__header {
  padding: 16px;
  
  padding-bottom: 8px;
  border-bottom: solid 1px #eee;
  color: #888;
}

.loginBox__header__close {
  position: relative;
  float: right;
  width: 1em;
  height: 1em;
  padding: 0;
  background: none;
  border: none;
  margin-left: 8px;
}

.loginBox__header__close:before {
  position: absolute;
  display: block;
  content: "";
  box-sizing: border-box;
  width: 100%;
  height: 1px;
  top: 50%;
  background-color: #888;
  transform: translateY(-50%) rotate(45deg);
}

.loginBox__header__close:after {
  position: absolute;
  display: block;
  content: "";
  box-sizing: border-box;
  width: 100%;
  height: 1px;
  top: 50%;
  background-color: #888;
  transform: translateY(-50%) rotate(-45deg);
}

.loginBox__body {
  text-align: center;
  padding: 16px;
}

.loginBox__loginButton {
  position: relative;
  padding: 8px;
  overflow: hidden;
  border: none;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0%);
  color: #333;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 25%);
}

.loginBox__loginButton:before {
  content: "";
  position: absolute;
  width: 300%;
  height: 300%;
  animation: button-color-cycle 1500ms linear 0ms infinite normal both;
  animation-play-state: paused;
  background: linear-gradient(to right, #fdf, #ddf, #fdf, #ddf);
  background-repeat: repeat;
  transform-origin: 50%, 50%;
  top: 0;
  left: 0;
  z-index: -1;
}

.loginBox__loginButton:hover:before {
  animation-play-state: running;
}

.loginBox__loginButton:after {
  content: "";
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

.loginBox__loginButton:active:after {
  transform: translate(-50%, -50%) scale(1);
  transition: transform ease-out 150ms;
  opacity: 50%;
}
`)]))
