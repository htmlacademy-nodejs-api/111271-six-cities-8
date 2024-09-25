import { Command } from './command.interface.js';
import { getErrorMessage } from '../../shared/helpers/index.js';
import { generateTsvOffer, OfferMeta } from '../rent-offer-parser.js';
import axios from 'axios';
import { writeTsv } from '../../shared/libs/file-writer/index.js';

export class GenerateCommand implements Command {
  static readonly NAME = '--generate';

  private offerMeta: Promise<OfferMeta> | null = null;

  public async execute(...parameters: string[]): Promise<void> {
    const [count, filepath, url] = parameters;
    const offerCount = Number.parseInt(count, 10);

    try {
      await this.write(url, filepath, offerCount);
      console.info(`File ${filepath} was created!`);
    } catch (error: unknown) {
      console.error('Can\'t generate data');
      console.error(getErrorMessage(error));
    }
  }

  public getName(): string {
    return GenerateCommand.NAME;
  }

  private async getOfferMeta(url: string): Promise<OfferMeta> {
    const { data } = await axios.get<OfferMeta>(url);
    return data;
  }

  private async load(url: string) {
    if (this.offerMeta) {
      return this.offerMeta;
    }

    try {
      this.offerMeta = this.getOfferMeta(url);
      return await this.offerMeta;
    } catch {
      this.offerMeta = null;
      throw new Error(`Can't load data from ${url}`);
    }
  }

  private async write(url: string, filepath: string, offerCount: number) {
    const meta = await this.load(url);
    const offers = Array.from({ length: offerCount }).map(() => generateTsvOffer(meta));
    await writeTsv(filepath, offers);
  }
}
