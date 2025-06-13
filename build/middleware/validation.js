import { getError } from "../utils/tools.js";
export const validateBody = (joiSchemas) => (req, res, next) => {
    if (req.body) {
        let endpoint = `${req.method}${req.path}`;
        if (req.path.match(/^\/accounts\/[a-zA-Z0-9]+\/role$/)) {
            endpoint = `${req.method}/:id/role`;
        }
        if (req.path === '/accounts') {
            endpoint = `${req.method}/accounts`;
        }
        if (req.path.match(/^\/accounts\/[a-zA-Z0-9]+\/pass$/)) {
            endpoint = `${req.method}/:id/pass`;
        }
        const schema = joiSchemas[endpoint];
        if (!schema) {
            throw new Error(getError(500, `Validation schema not found for ${endpoint}`));
        }
        const { error } = schema.validate(req.body);
        if (error) {
            throw new Error(getError(400, error.message));
        }
    }
    next();
};
