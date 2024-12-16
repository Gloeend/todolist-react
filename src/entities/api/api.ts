import axios, {AxiosInstance, AxiosResponse} from "axios";

class Api {
  private instance: AxiosInstance;

  constructor(url: string) {
    this.instance = axios.create({
      baseURL: url + "/api",
      timeout: 10000,
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
  }

  get = <Req, Res>(url: string, params?: Req) => this.instance.get(url, {params}).then(res => res.data as Res);
  delete = <Res>(url: string) => this.instance.delete<Res>(url);
  post = <Req, Res>(url: string, body: Req) => this.instance.post<Req, AxiosResponse<Res>>(url, body).then(res => res.data);
  put = <Req, Res>(url: string, body: Req) => this.instance.put<AxiosResponse<Res>>(url, body).then(res => res.data as Res);
}

export default new Api(import.meta.env.VITE_BACKEND_URL as string);