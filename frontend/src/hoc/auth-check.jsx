import React, { useEffect, useState } from 'react'
import axios from '../utils/axios-instance';
import { useDispatch } from 'react-redux';
import { authFailed, authSuccess } from '../redux/reducers/auth-slice';

const AuthCheck = ({children}) => {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const fetchUser = async () => {
    try {
      const data = (await axios.get('/accounts/get-user/')).data;
      dispatch(authSuccess(data));
    } catch(err) {
      dispatch(authFailed());
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUser();
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return children;
}

export default AuthCheck;