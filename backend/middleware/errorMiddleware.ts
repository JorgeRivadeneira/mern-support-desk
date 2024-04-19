export const errorHandler = (error: Error, req: any, res: any, next: any) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.status(statusCode);
    res.json({
        message: error.message,
        stack: process.env.NODE_ENV === 'production' ? null : error.stack
    })
}

// module.exports = {errorHandler}