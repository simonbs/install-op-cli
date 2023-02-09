export interface TemporaryFile {
  filePath: string
  cleanup()
}
