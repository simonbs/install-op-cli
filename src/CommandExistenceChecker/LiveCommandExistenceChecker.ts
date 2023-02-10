import {CommandExistenceChecker} from "./CommandExistenceChecker"
import {CommandRunner} from "../CommandRunner/CommandRunner"

export class LiveCommandExistenceChecker implements CommandExistenceChecker {
  commandRunner: CommandRunner
  
  constructor(commandRunner: CommandRunner) {
    this.commandRunner = commandRunner
  }
  
  async commandExists(cmd: string): Promise<boolean> {
    try {
      await this.commandRunner.run(["which", `"${cmd}"`].join(" "))
      return true
    } catch {
      return false
    }
  }
}
