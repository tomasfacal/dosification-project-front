import ErrorPage from "../error_pages/error_page";
import AuthContext from "../../context/authContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Routing } from "../../constant/Routing";

interface Props {
  component: React.ComponentType;
  genericPage: boolean;
}

const validateRole = () => {
  // Pegarle al back para validar el rol del usuario & token, por si cambian la cookie desde el front
  return true;
};

export const PermissionsRoute: React.FC<Props> = ({
  component: RouteComponent,
  genericPage,
}) => {
  const authCtx = useContext(AuthContext);
  if (!authCtx.isLoggedIn) {
    return <Navigate to={Routing.SIGN_IN} replace={true} />;
  }
  if (genericPage || authCtx.role === "doctor") {
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
