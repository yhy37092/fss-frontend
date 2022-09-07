//Handle Fetching timeout
export const timeoutPromise = url => {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error('Timeout, Server is not responding'));
    }, 50 * 1000);
    url.then(
      res => {
        clearTimeout(timeoutId);
        resolve(res);
      },
      err => {
        clearTimeout(timeoutId);
        reject(err);
      },
    );
  });
};
