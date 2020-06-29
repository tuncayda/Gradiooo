class APIFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    // Build query for filtering
    filter() {
        const queryObj = { ...this.queryString };
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach(el => delete queryObj[el]);

        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

        // Filter
        this.query = this.query.find(JSON.parse(queryStr));

        return this;
    }

    // Build query for sorting
    sort() {
        if(this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        } else {
            // Default
            this.query = this.query.sort('-created');
        }

        return this;
    }

    // Build query for limiting fields
    limitFields() {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(',').join(' ');
            this.query = this.query.select(fields);
        } else {
            // Default (exclude mongodbs _v variable)
            this.query = this.query.select('-__v');
        }
        return this;
    }

    // Build query to paginate
    paginate(defaultLimit = 2, defaultPage = 1) {

        const page = this.queryString.page * 1 || defaultPage;
        const limit = this.queryString.limit * 1 || defaultLimit;
        const skip = (page - 1) * limit;

        // Example: page=2&limit=10 means 1-10 on page 1, 11-20 on page 20 etc
        this.query = this.query.skip(skip).limit(limit);

        return this;
    }
}

module.exports = APIFeatures;