import {CommandExistenceChecker} from "../../src/CommandExistenceChecker/CommandExistenceChecker"

export class MockCommandExistenceChecker implements CommandExistenceChecker {
  result: boolean
  
  constructor(result: boolean = false) {
    this.result = result
  }
  
  commandExists(cmd: string): Promise<boolean> {
    return Promise.resolve(this.result)
  }
}
