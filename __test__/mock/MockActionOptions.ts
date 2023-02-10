import {ActionOptions} from "../../src/Action"

export class MockActionOptions implements ActionOptions {
  skipIfInstalled: boolean
  versionNumber: string
  system: string | null
  architecture: string | null
  
  constructor(
    skipIfInstalled: boolean, 
    versionNumber: string, 
    system: string | null, 
    architecture: string | null
  ) {
    this.skipIfInstalled = skipIfInstalled
    this.versionNumber = versionNumber
    this.system = system
    this.architecture = architecture
  }
}