

export const loginStart = () => ({
    type: "LOGIN_START",
  });

  export const loginSuccess = (user) => ({
    type: "LOGIN_SUCCESS",
    payload: user,
  });

  export const loginFailure = (error) => ({
    type: "LOGIN_FAILURE",
    error:error,
  });
  
 
  
  export const logout = () => ({
    type: "LOGOUT",
  });


