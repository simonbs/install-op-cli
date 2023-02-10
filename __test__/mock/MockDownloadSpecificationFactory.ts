import {DownloadSpecification} from "../../src/DownloadSpecification/DownloadSpecification"
import {DownloadSpecificationFactory} from "../../src/DownloadSpecification/DownloadSpecificationFactory"

export class MockDownloadSpecificationFactory implements DownloadSpecificationFactory {
  _downloadSpecification: DownloadSpecification
  
  constructor(versionNumber: string, system: string, architecture: string) {
    this._downloadSpecification = new DownloadSpecification(versionNumber, system, architecture)
  }
  
  downloadSpecification(
    versionNumber: string, 
    system?: string | null,
    architecture?: string | null
  ): DownloadSpecification {
    return this._downloadSpecification
  }
}
