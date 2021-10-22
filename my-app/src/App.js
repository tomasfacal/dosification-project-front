import { useEffect } from 'react';
import { Switch, BrowserRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux';

import RouteFromPath from 'components/routes/RouteFromPath';
import useTranslation from 'hooks/useTranslation';
import useAuth from 'hooks/useAuth';
import routes from 'routes';
import { setUser } from 'state/slices/authSlice';
import { getLoggedInUser } from 'utils/auth';

import 'styles/variables.css';

function App() {
  const t = useTranslation();
  const { authenticated } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    const loggedInUser = getLoggedInUser();

    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      dispatch(setUser(user));
    }
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>{t('global.pageTitle')}</title>
      </Helmet>
      <BrowserRouter>
        <Switch>
          {routes.map(route => (
            <RouteFromPath key={`route-${route.path}`} {...route} authenticated={authenticated} />
          ))}
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
