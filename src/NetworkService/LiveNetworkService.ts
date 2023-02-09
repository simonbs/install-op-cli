import {NetworkService} from "./NetworkService"
import {Response} from "./Response"
import axios from "axios"

export class LiveNetworkService implements NetworkService {
  async get(url: string): Promise<Response> {
    return await axios.get(url)
  }
  
  async getBlob(url: string): Promise<Response> {
    return await axios({
      method: "get",
      url: url,
      responseType: "blob"
    })
  }
}