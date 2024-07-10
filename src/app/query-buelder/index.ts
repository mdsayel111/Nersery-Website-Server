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
        const searchStr = this.query.search;
        let searchObj;

        // if searchStr exist
        if (searchStr) {
            searchObj = {
                $or: searchableFeilds.map((searchableFeild) => ({
                    [searchableFeild]: { $regex: searchStr, $options: "i" },
                })),
            };
            this.model = this.model.find(searchObj as FilterQuery<T>);
        }

        return this
    }

    // create filter method
    filter() {
        const isFilterExist = this.query.filter

        // is filter query exist
        if (isFilterExist) {
            this.model = this.model.find({ category: { $regex: this.query.filter, $options: "i" } } as FilterQuery<T>)
        }
        return this
    }

    // create sort method
    sort() {
        const isSortExist = this.query.sort

        // if sort exist
        if (isSortExist) {
            this.model = this.model.sort(isSortExist as FilterQuery<T>)
        }
        return this
    }
}

export default QueryBuilder;