import Error from 'next/error';

export default class AppError extends Error {
  static getInitialProps(context) {
    const { err, req, res } = context;

    let statusCode;
    if (res) {
      statusCode = res.statusCode;
    } else if (err) {
      statusCode = err.statusCode;
    }

    return { statusCode };
  }
}
