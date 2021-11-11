import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import { JWTPayloadTypes, UserTypes } from '../../../services/data-types';

export default function Profile() {
  const [user, setUser] = useState({
    avatar: '',
    username: '',
    email: '',
  });

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      const jwtToken = atob(token);
      const payload: JWTPayloadTypes = jwtDecode(jwtToken);
      const userFromPayload: UserTypes = payload.player;
      console.log(userFromPayload);

      setUser(userFromPayload);
    }
  }, []);

  const IMG = process.env.NEXT_PUBLIC_IMG;

  return (
    <div className='user text-center pb-50 pe-30'>
      <img
        src={`${IMG}/${user.avatar}`}
        width='100'
        height='100'
        className='img-fluid mb-20'
        style={{ borderRadius: '100%' }}
      />
      <h2 className='fw-bold text-xl color-palette-1 m-0'>{user.username}</h2>
      <p className='color-palette-2 m-0'>{user.email}</p>
    </div>
  );
}
