export interface FileDownloader {
  download(url: string, filePath: string): Promise<void>
}