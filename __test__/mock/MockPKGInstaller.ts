import {PKGInstaller} from "../../src/PKGInstaller"

export class MockPKGInstaller implements PKGInstaller {
  install(filePath: string): Promise<void> {
    return Promise.resolve()
  }
}
