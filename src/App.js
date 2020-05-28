import React from 'react';
import { useSelector } from 'react-redux';

import createRouter from './routes';

export default function App() {
  const signed = useSelector(state => state.auth.signed);
  const token = useSelector(state => state.auth.token);
  const profileId = useSelector(state => state.user.profile);

  const Routes = createRouter(signed, token, profileId);

  return <Routes />;
}
