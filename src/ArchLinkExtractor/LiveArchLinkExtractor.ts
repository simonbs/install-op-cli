import {ArchLinkExtractor} from "./ArchLinkExtractor"
import {Version} from "../Version"

export class LiveArchLinkExtractor implements ArchLinkExtractor {
  extract(pool: Version[], versionNumber: string, system: string, arch: string) {
    const matchingVersions = pool.filter((version) => {
      return version.versionNumber == versionNumber
    })
    if (matchingVersions === undefined || matchingVersions === null || matchingVersions.length == 0) {
      throw new Error("Cannot find version with version number " + versionNumber)
    }
    const matchingVersion = matchingVersions[0]
    const matchingSystem = matchingVersion.systems[system.toLowerCase()] 
    if (matchingSystem === undefined || matchingSystem === null) {
      throw new Error("Cannot find system named " + system)
    }
    const link = matchingSystem.archs[arch.toLowerCase()] 
    if (link === undefined || link === null) {
      throw new Error("Cannot find archicture named " + arch)
    }
    return link
  }
}