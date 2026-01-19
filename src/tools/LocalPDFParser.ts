import { FileParser } from "./FileParserManager";
import { TFile, Vault } from "obsidian";
import pdf from "pdf-parse";
import { logError, logInfo } from "@/logger";

export class LocalPDFParser implements FileParser {
  supportedExtensions = ["pdf"];

  async parseFile(file: TFile, vault: Vault): Promise<string> {
    try {
      logInfo("Parsing PDF file locally:", file.path);
      const arrayBuffer = await vault.readBinary(file);
      const buffer = Buffer.from(arrayBuffer);
      const data = await pdf(buffer);
      return data.text;
    } catch (error) {
      logError(`Error extracting content from PDF ${file.path}:`, error);
      return `[Error: Could not extract content from PDF ${file.basename}]`;
    }
  }
}
