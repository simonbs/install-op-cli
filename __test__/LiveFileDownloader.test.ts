import {MockNetworkService} from "./mock/MockNetworkService"
import {MockFileWriter} from "./mock/MockFileWriter"
import {LiveFileDownloader} from "../src/FileDownloader"

test("Writes the downloaded content", async () => {
  const responseData = "Hello world!"
  const networkService = new MockNetworkService(responseData)
  const fileWriter = new MockFileWriter()
  const fileDownloader = new LiveFileDownloader(networkService, fileWriter)
  await fileDownloader.download("https://example.com")
  expect(fileWriter.writtenData).toStrictEqual(responseData)
})
