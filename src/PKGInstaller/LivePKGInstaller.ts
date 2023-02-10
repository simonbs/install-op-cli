import {PKGInstaller} from "./PKGInstaller"
import {CommandRunner} from "../CommandRunner/CommandRunner"

export class LivePKGInstaller implements PKGInstaller {
  commandRunner: CommandRunner
  
  constructor(commandRunner: CommandRunner) {
    this.commandRunner = commandRunner
  }
  
  async install(filePath: string) {
    const cmd = "sudo installer -pkg \"" + filePath + "\" -target ~"
    await this.commandRunner.run(cmd)
  }
}