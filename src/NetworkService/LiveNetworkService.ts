import {NetworkService} from "./NetworkService"
import {Response} from "./Response"
import {CommandRunner} from "../CommandRunner"

export class LiveNetworkService implements NetworkService {
  commandRunner: CommandRunner
  
  constructor(commandRunner: CommandRunner) {
    this.commandRunner = commandRunner
  }
  
  async get(url: string): Promise<Response> {
    let cmd = ["curl", "--fail", "--silent", "--show-error", `"${url}"`].join(" ")
    let data = await this.commandRunner.run(cmd)
    return {data: data}
  }
  
  async getBlob(url: string): Promise<Response> {
    return await axios({
      method: "get",
      url: url,
      responseType: "blob"
    })
  }
}