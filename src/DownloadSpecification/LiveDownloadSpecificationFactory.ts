import {PlatformProvider} from "../PlatformProvider"
import {DownloadSpecification} from "./DownloadSpecification"
import {DownloadSpecificationFactory} from "./DownloadSpecificationFactory"

export class LiveDownloadSpecificationFactory implements DownloadSpecificationFactory {
  platformProvider: PlatformProvider
  
  constructor(platformProvider: PlatformProvider) {
    this.platformProvider = platformProvider
  }
  
  downloadSpecification(
    versionNumber: string, 
    system?: string | null,
    architecture?: string | null
  ): DownloadSpecification {
    const finalSystem = this.getSystem(system)
    const finalArchitecture = this.getArchitecture(finalSystem, architecture)
    return new DownloadSpecification(versionNumber, finalSystem, finalArchitecture)
  }
  
  private getSystem(suggestedSystem?: string | null) {
    if (suggestedSystem != null && suggestedSystem !== undefined && suggestedSystem.length > 0) {
      return suggestedSystem
    } else if (this.platformProvider.platform == "darwin") {
      return "macos"
    } else {
      throw new Error(
        "The action can only be run on macOS machines. "
        + "Running on a " + this.platformProvider.platform + " machine."
      )
    }
  }
  
  private getArchitecture(system: string, suggestedArchitecture?: string | null) {
    if (suggestedArchitecture != null && suggestedArchitecture !== undefined && suggestedArchitecture.length > 0) {
      return suggestedArchitecture
    } else if (system == "macos") {
      return "universal"
    } else {
      throw new Error(
        "The preferred architecture could not be determined. "
        + "Please specify an architecture in the workflow."
      )
    }
  }
}