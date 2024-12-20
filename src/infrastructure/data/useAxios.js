import axios from "axios";

export const axiosRequest = (
  route,
  method,
  body,
  successCallback,
  errorCallback,
  contentType = null,
) => {
  let config = {};

  config.headers = {};
  if (contentType !== null) {
    config.headers["Content-Type"] = contentType;
  }

  if (method.toLowerCase() === "get") {
    axios
      .get(route)
      .then((res) => {
        if (typeof successCallback === "function") {
          successCallback(res.data);
        }
      })
      .catch((err) => {
        if (typeof errorCallback === "function") {
          errorCallback(err);
        }
      });
  } else if (method.toLowerCase() === "put") {
    axios
      .put(route, body, config)
      .then((res) => {
        if (typeof successCallback === "function") {
          successCallback(res.data);
        }
      })
      .catch((err) => {
        if (typeof errorCallback === "function") {
          errorCallback(err);
        }
      });
  } else if (method.toLowerCase() === "post") {

    axios
      .post(route, body, config)
      .then((res) => {
        if (typeof successCallback === "function") {
          successCallback(res.data);
        }
      })
      .catch((err) => {
        if (typeof errorCallback === "function") {
          errorCallback(err);
        }
      });
  } else if (method.toLowerCase() === "delete") {
    axios
      .delete(route, { data: body })
      .then((res) => {
        if (typeof successCallback === "function") {
          successCallback(res.data);
        }
      })
      .catch((err) => {
        if (typeof errorCallback === "function") {
          errorCallback(err);
        }
      });
  } else if (method.toLowerCase() === "patch") {
    axios
      .patch(route, body, config)
      .then((res) => {
        if (typeof successCallback === "function") {
          successCallback(res.data);
        }
      })
      .catch((err) => {
        if (typeof errorCallback === "function") {
          errorCallback(err);
        }
      });
  }
};

