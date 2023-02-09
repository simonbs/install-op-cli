import {ActionOptions, Action} from "../../src/Action"

export class MockActionOptions implements ActionOptions {
  versionNumber: string
  system: string | null
  architecture: string | null
  
  constructor(versionNumber: string, system: string | null, architecture: string | null) {
    this.versionNumber = versionNumber
    this.system = system
    this.architecture = architecture
  }
}