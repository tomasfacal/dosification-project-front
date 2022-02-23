import ErrorPage from "../error_pages/error_page";

interface Props {
  component: React.ComponentType;
}

export const PrivateRoute: React.FC<Props> = ({
  component: RouteComponent,
}) => {
  if (false) {
    return <RouteComponent />;
  } else {
    return (
      <ErrorPage
        error_code="401"
        error_text="No tiene permisos para ingresar a esta pagina"
      />
    );
  }
};
