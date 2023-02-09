export interface PKGInstaller {
  install(filePath: string): Promise<void>
}