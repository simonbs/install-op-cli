import {FileDownloader} from "./FileDownloader"
import {CommandRunner} from "../CommandRunner/CommandRunner"

export class LiveFileDownloader implements FileDownloader {
  commandRunner: CommandRunner
  
  constructor(commandRunner: CommandRunner) {
    this.commandRunner = commandRunner
  }
  
  async download(url: string, filePath: string): Promise<void> {
    const cmd = [
      "curl", "--fail", "--silent", "--show-error", 
      `\"${url}\"`, 
      "-o", `\"${filePath}\"`
    ]
    await this.commandRunner.run(cmd.join(" "))
  }
}