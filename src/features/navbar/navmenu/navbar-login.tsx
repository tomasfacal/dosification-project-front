import { useNavigate } from "react-router-dom";
import { Button } from "@material-ui/core";
import { Routing } from "../../../constant/Routing";


const NavbarLogin = () => {
    const navigation = useNavigate();
    const redirectLogin = () => {
        navigation(Routing.SIGN_IN);
    };
    const redirectSignUp = () => {
        navigation(Routing.SIGN_UP);
    };
    
    return (
        <>
        <Button onClick={redirectSignUp} color="inherit">Registrarse</Button>
        <Button onClick={redirectLogin} color="inherit">Login</Button>
        </>
    )
}

export default NavbarLogin;
