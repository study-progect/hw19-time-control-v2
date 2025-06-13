export const errorHandler = (err, req, res, next) => {
    try {
        const error = JSON.parse(err.message);
        res.status(error.status).end(error.message);
    }
    catch (e) {
        res.status(500).end(`Unknown server error : ${err.message}`);
    }
};
