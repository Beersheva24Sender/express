export function createError(status, message) {
    return { status, message };
}

export function errorHnalder(error, req, res, next) {
    let { status, message } = error;
    status = status ?? 500;
    message = message ?? "internal error server" + error
    res.status(status).send(message);
}