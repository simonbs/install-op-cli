import {PKGInstaller} from "../../src/PKGInstaller/PKGInstaller"

export class MockPKGInstaller implements PKGInstaller {
  install(filePath: string): Promise<void> {
    return Promise.resolve()
  }
}
