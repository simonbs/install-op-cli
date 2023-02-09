export class DownloadSpecification {
  public versionNumber: string
  public system: string
  public architecture: string
  
  constructor(versionNumber: string, system: string, architecture: string) {
    this.versionNumber = versionNumber
    this.system = system
    this.architecture = architecture
  }
}