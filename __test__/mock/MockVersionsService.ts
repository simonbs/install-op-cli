import {Version} from "../../src/Version"
import {VersionsService} from "../../src/VersionsService"

export class MockVersionsService implements VersionsService {
  versions: Version[]
  
  constructor(versions: Version[] = []) {
    this.versions = versions
  }
  
  loadVersions(): Promise<Version[]> {
    return Promise.resolve(this.versions)
  }
}
