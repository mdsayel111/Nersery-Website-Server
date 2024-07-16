import { FilterQuery, Query } from "mongoose";

// create QueryBuilder class for handle search, filter, sort
class QueryBuilder<T> {
  query: Record<string, unknown>;
  model: Query<T[], T>;
  constructor(model: Query<T[], T>, query: Record<string, unknown>) {
    this.model = model;
    this.query = query;
  }

  // create search method
  search(searchableFeilds: string[]) {
    const isSearchExist = this.query.search;
    let searchObj;

    // if searchStr exist
    if (isSearchExist) {
      searchObj = {
        $or: searchableFeilds.map((searchableFeild) => ({
          [searchableFeild]: { $regex: isSearchExist, $options: "i" },
        })),
      };
      this.model = this.model.find(searchObj as FilterQuery<T>);
    }

    return this;
  }

  // create filter method
  filter() {
    const isFilterExist = this.query.filter;

    // is filter query exist
    if (isFilterExist) {
      this.model = this.model.find({
        category: { $regex: this.query.filter, $options: "i" },
      } as FilterQuery<T>);
    }
    return this;
  }

  // create paginate method
  paginate() {
    const isPageExist = this.query.page;
    if (isPageExist) {
      const page = Number(this?.query?.page) || 0;
      const limit = Number(this?.query?.limit) || 8;
      const skip = page * limit;

      this.model = this.model.skip(skip).limit(limit)
    }

    return this;
  }


  // create sort method
  sort() {
    let isSortExist = this.query.sort;

    // if sort exist
    if (isSortExist) {

      // modify sort for title
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((isSortExist as any).slice(1) === "title") {
        isSortExist = { title: 1 }
      }

      this.model = this.model.sort(isSortExist as FilterQuery<T>);
    } else if (!this.query?.page) {
      this.model = this.model.sort("-createdAt");
    }
    return this;
  }

  // creat limit method
  limit() {
    const isLimitExist = Number(this.query.limit)

    // if limit exist
    if (isLimitExist) {
      this.model = this.model.limit(isLimitExist)
    }

    return this.model
  }

  // creat limit method
  async countDocument() {
    // get filter obj from model
    const filterObj = this.model.getFilter()


    // get total document
    const totalDocument = await this.model.model.countDocuments(filterObj)

    return totalDocument
  }
}

export default QueryBuilder;
