class APIFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    // Search Feature

    search() {
        // earlier we can simply search like Product.find({name:'laptop'}) it will only search Laptop keyword 
        // not like laptoptop laptoppotop like in amzaon myntra site So Using another method
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: "i", // for case insensitive  

            }

        } : {};

        this.query = this.query.find({ ...keyword });
        return this;
    }


    // Filter Feature and make it Case Sensitive beacuse we will give choice at frontend to choose

    filter() {
        // for making actual copy
        const queryCopy = { ...this.queryStr };
        // console.log(queryCopy);
        // Removing some Fields for category
        const removeFields = ["keyword", "page", "limit"];
        removeFields.forEach(key => delete queryCopy[key]);

        // console.log(queryCopy);

        // Filter for Price and Rating

        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, key => `$${key}`);
        this.query = this.query.find(JSON.parse(queryStr));
        // console.log(queryStr);
        return this;

    }

    // For Pagination

    pagination(resultPerPage){
        const currentPage=Number(this.queryStr.page) || 1;
        const skip=(currentPage-1)*resultPerPage;
        this.query=this.query.limit(resultPerPage).skip(skip);
        return this;
    }


}
// 1:27


module.exports = APIFeatures;