export class MockPlatformProvider {
  public platform: string

  constructor(platform: string = "darwin") {
    this.platform = platform
  }
}