import {PKGInstaller} from "../../src/PKGInstaller/PKGInstaller"

export class MockPKGInstaller implements PKGInstaller {
  public didInstall = false
  
  install(filePath: string): Promise<void> {
    this.didInstall = true
    return Promise.resolve()
  }
}
