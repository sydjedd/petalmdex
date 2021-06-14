import axios from "axios";

let options = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

async function get(url, data = {}) {
  return xhr("get", url, data);
}

async function post(url, data = {}) {
  return xhr("post", url, data);
}

async function xhr(method = "get", url, data = {}) {
  options["method"] = method;
  options["url"] = url;
  options["data"] = data;
  try {
    const response = await axios(options);

    if (response.status === 200) {
      return response.data;
    }
  } catch (e) {
    // TODO Boite de dialogue global pour indiquer l erreur
    console.log("Problème Internet: Impossible de se connecter à Internet");
  }
  return false;
}

export default {
  get,
  post,
};
