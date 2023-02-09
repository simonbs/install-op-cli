import {DownloadSpecification, DownloadSpecificationFactory} from "../../src/DownloadSpecification"

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
