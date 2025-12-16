import { PageOptionsDto } from "./page-options.dto";
import { BadRequestException } from "@nestjs/common";

interface PageMetaParams {
  pageOptionsDto: PageOptionsDto;
  itemsCount: number;
}

export class PageMetaDto {
  readonly page: number;

  readonly limit: number;

  readonly itemCount: number;

  readonly pageCount: number;

  readonly hasPreviousPage: boolean;

  readonly hasNextPage: boolean;

  constructor({ pageOptionsDto, itemsCount }: PageMetaParams) {
    this.page = pageOptionsDto.page;
    this.limit = pageOptionsDto.limit;
    this.itemCount = itemsCount;
    this.pageCount =
      this.itemCount === 0 ? 1 : Math.ceil(this.itemCount / this.limit);
    this.hasPreviousPage = this.page > 1;
    this.hasNextPage = this.page < this.pageCount;
  }
}
