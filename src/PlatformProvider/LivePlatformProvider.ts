import {PlatformProvider} from "./PlatformProvider"

export class LivePlatformProvider implements PlatformProvider {
  public platform: string
  
  constructor() {
    this.platform = process.platform
  }
}