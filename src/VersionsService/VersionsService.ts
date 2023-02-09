import {Version} from "../Version"

export interface VersionsService {
  loadVersions(): Promise<Version[]>
}