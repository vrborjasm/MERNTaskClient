import React, {useContext, useEffect} from 'react';
import AuthContext from '../../context/auth/authContext';

const Bar = () => {

    const authContext = useContext(AuthContext);
    const {authUser, user, logout} = authContext;

    useEffect(() => {
        authUser();
        // eslint-disable-next-line
    }, [])

    return ( 
        <header className="app-header">
            {user ? <p className="nombre-usuario">Hola <span>{user.name}</span></p> : null} 
            <nav className="nav-principal">
                <button
                    className="btn btn-blank cerrar-sesion"
                    onClick={() => logout()}
                >Cerrar Sesion</button>
            </nav>
        </header>
     );
}
 
export default Bar;