/**
 * Generic search service for querying collections
 * Supports filtering, sorting, pagination, and field selection
 */

class SearchService {
    /**
     * Build a query object for Mongoose based on search fields and term
     * @param {Object} searchFields - { fieldName: "type" } type can be 'string', 'number', 'boolean', etc.
     * @param {string} term - The search term
     */
    static buildSearchQuery(searchFields, term) {
        if (!term || !searchFields) return {};

        const query = { $or: [] };

        for (const [field, type] of Object.entries(searchFields)) {
            switch (type) {
                case "string":
                    query.$or.push({ [field]: { $regex: term, $options: "i" } });
                    break;
                case "number":
                    const num = Number(term);
                    if (!isNaN(num)) query.$or.push({ [field]: num });
                    break;
                case "boolean":
                    if (term.toLowerCase() === "true" || term.toLowerCase() === "false") {
                        query.$or.push({ [field]: term.toLowerCase() === "true" });
                    }
                    break;
                default:
                    query.$or.push({ [field]: term });
            }
        }

        if (query.$or.length === 0) return {};
        return query;
    }

    /**
     * Apply pagination to Mongoose query
     * @param {Object} query - Mongoose query
     * @param {number} page
     * @param {number} limit
     */
    static async paginate(query, page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const total = await query.model.countDocuments(query.getQuery());
        const results = await query.skip(skip).limit(limit);
        return {
            results,
            pagination: {
                total,
                page,
                limit,
                pages: Math.ceil(total / limit),
            },
        };
    }

    /**
     * Apply sorting to Mongoose query
     * @param {Object} query - Mongoose query
     * @param {string} sortBy - field name
     * @param {string} order - asc/desc
     */
    static applySorting(query, sortBy = "createdAt", order = "desc") {
        const sortOrder = order.toLowerCase() === "asc" ? 1 : -1;
        return query.sort({ [sortBy]: sortOrder });
    }

    /**
     * Apply field selection to Mongoose query
     * @param {Object} query - Mongoose query
     * @param {string[]} fields - array of field names to include
     */
    static applySelect(query, fields = []) {
        if (fields.length === 0) return query;
        return query.select(fields.join(" "));
    }

    /**
     * General helper: search + paginate + sort + select
     * @param {Object} model - Mongoose model
     * @param {Object} options - { searchFields, term, page, limit, sortBy, order, selectFields }
     */
    static async search(model, options = {}) {
        const {
            searchFields = null,
            term = "",
            page = 1,
            limit = 10,
            sortBy = "createdAt",
            order = "desc",
            selectFields = [],
        } = options;

        let query = model.find();

        if (searchFields && term) {
            const searchQuery = this.buildSearchQuery(searchFields, term);
            query = model.find(searchQuery);
        }

        query = this.applySorting(query, sortBy, order);
        query = this.applySelect(query, selectFields);

        const result = await this.paginate(query, page, limit);
        return result;
    }
}

export const searchService = SearchService;
