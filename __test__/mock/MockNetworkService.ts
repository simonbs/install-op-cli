import {NetworkService} from "../../src/NetworkService"
import {Response} from "../../src/NetworkService"

export class MockNetworkService implements NetworkService {
  responseData: any
  
  constructor(responseData: any) {
    this.responseData = responseData
  }
  
  async get(url): Promise<Response> {
    return {data: this.responseData}
  }
  
  async getBlob(url): Promise<Response> {
    return {data: this.responseData}
  }
}
