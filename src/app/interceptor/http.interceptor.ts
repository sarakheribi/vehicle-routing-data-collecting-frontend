import { HttpInterceptorFn } from '@angular/common/http';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('auth-token'); // Get the token from localStorage (or any other storage mechanism)

  if (token) {
    // Clone the request and add the authorization header
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    // Pass the cloned request instead of the original request to the next handle
    return next(clonedReq);
  } else {
    // If no token is found, pass the original request
    return next(req);
  }
};
