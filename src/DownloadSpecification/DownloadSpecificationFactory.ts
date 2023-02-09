import {DownloadSpecification} from "./DownloadSpecification"

export interface DownloadSpecificationFactory {
  downloadSpecification(
    versionNumber: string, 
    system?: string | null,
    architecture?: string | null
  ): DownloadSpecification
}
