export const validateBody = (schema) => (req, res, next) => {
    try {
        req.body = schema.parse(req.body);
        next();
    } catch (err) {
        return res.status(400).json({
            status: false,
            errors: err.errors.map(e => ({
                path: e.path.join('.'),
                message: e.message,
            })),
        });
    }
};
