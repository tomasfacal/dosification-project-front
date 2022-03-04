import { useNavigate } from "react-router-dom";
import { Button } from "@material-ui/core";
import { Routing } from "../../../constant/Routing";


const NavbarLogin = () => {
    const navigation = useNavigate();
    const redirectLogin = () => {
        navigation(Routing.SIGN_IN);
    };
    
    return (
        <Button onClick={redirectLogin} color="inherit">Login</Button>
    )
}

export default NavbarLogin;
