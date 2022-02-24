import ErrorPage from "../error_pages/error_page";
import AuthContext from "../../context/authContext";
import { useContext } from "react";

interface Props {
  component: React.ComponentType;
}

export const DoctorPrivateRoute: React.FC<Props> = ({
  component: RouteComponent,
}) => {
  const authCtx = useContext(AuthContext);
  if (authCtx.role === "doctor") {
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
