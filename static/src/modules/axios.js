import { axios } from "@bundled-es-modules/axios";
export default function () {
  const BASE_URL = "http://localhost:8080";
  const axiosGet = (URL, onSuccess = null, onFailed = null) => {
    const final_URL = URL.startsWith("http") ? URL : BASE_URL + URL;
    axios.get(final_URL).then((resp) => {
      if (resp.status === 200 && resp.data.rsp === "ok") {
        if (onSuccess) onSuccess(resp.data);
        else if (onFailed) onFailed(resp.data);
      }
    });
  };

  const axiosPost = (URL, Data, onSuccess = null, onFailed = null) => {
    const final_URL = URL.startsWith("http") ? URL : BASE_URL + URL;
    console.log(final_URL);

    axios.post(final_URL, Data).then((resp) => {
      if (resp.status === 200 && resp.data.status == 0) {
        console.log("YES!!! STATUS - 200");
        if (onSuccess) onSuccess(resp.data);
        else if (onFailed) onFailed(resp.data);
      }
    });
  };

  return { axiosGet, axiosPost };
}
