import {CommandRunner} from "../../src/CommandRunner"

export class MockCommandRunner implements CommandRunner {
  public cmd: string | null = null
  result: string
  
  constructor(result: string = "") {
    this.result = result
  }
  
  run(cmd: string): Promise<string> {
    this.cmd = cmd
    return Promise.resolve(this.result)
  }
}
