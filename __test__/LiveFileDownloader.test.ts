import {MockCommandRunner} from "./mock/MockCommandRunner"
import {LiveFileDownloader} from "../src/FileDownloader"

test("Creates command with the correct URL", async () => {
  const commandRunner = new MockCommandRunner()
  const fileDownloader = new LiveFileDownloader(commandRunner)
  const url = "https://example.com"
  const filePath = "file:///Users/johndoe/myfile.txt"
  await fileDownloader.download(url, filePath)
  expect(commandRunner.cmd).toContain(url)
})

test("Creates command with the correct file path", async () => {
  const commandRunner = new MockCommandRunner()
  const fileDownloader = new LiveFileDownloader(commandRunner)
  const url = "https://example.com"
  const filePath = "file:///Users/johndoe/myfile.txt"
  await fileDownloader.download(url, filePath)
  expect(commandRunner.cmd).toContain(filePath)
})
