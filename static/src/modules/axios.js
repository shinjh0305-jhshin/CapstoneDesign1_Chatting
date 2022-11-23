import { axios } from "@bundled-es-modules/axios";

export default function () {
  const BASE_URL = "http://localhost:8080";
  const axiosGet = (URL, onSuccess = null, onFailed = null) => {
    const final_URL = URL.startsWith("http") ? URL : BASE_URL + URL;
    console.log("axiosGet", final_URL);
    axios.get(final_URL).then((resp) => {
      if (resp.status === 200 && resp.data.ok === true) {
        if (onSuccess) onSuccess(resp.data);
        else if (onFailed) onFailed(resp.data);
      }
    });
  };

  const axiosPost = (URL, Data, onSuccess = null, onFailed = null) => {
    const final_URL = URL.startsWith("http") ? URL : BASE_URL + URL;
    console.log("axiosPost", final_URL, Data);
    try {
      axios.post(final_URL, Data).then((resp) => {
        if (resp.status === 200 && resp.data.ok === true) {
          if (onSuccess) onSuccess(resp.data);
        } else {
          onFailed(resp.data);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
  return { axiosGet, axiosPost };
}
