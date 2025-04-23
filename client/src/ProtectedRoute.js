import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const ProtectedRoute = ({ user, allowedRole, children }) => {
  const history = useHistory();

  useEffect(() => {
    if (!user) {
      history.push('/');
    } else if (user.role !== allowedRole) {
        if(user.role === 'user'){
            history.push('/');
        }
        else{
            history.push('/organizerboard');
        }
    }
  }, [user, allowedRole, history]);

  if (!user || user.role !== allowedRole) {
    return null;
  }

  return children;
};

export default ProtectedRoute;