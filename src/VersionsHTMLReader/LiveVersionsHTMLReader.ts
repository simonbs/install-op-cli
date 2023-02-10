import {VersionsHTMLReader} from "./VersionsHTMLReader"
import {NetworkService} from "../NetworkService/NetworkService"

export class LiveVersionsHTMLReader implements VersionsHTMLReader {
  networkService: NetworkService
  
  constructor(networkService: NetworkService) {
    this.networkService = networkService
  }
  
  async read(): Promise<string> {
    const url = "https://app-updates.agilebits.com/product_history/CLI2"
    const response = await this.networkService.get(url)
    return response.data
  }
}