import React, {useState, useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';
import AlertContext from '../../context/alerts/alertContext';
import AuthContext from '../../context/auth/authContext';

const Login = (props) => {
   
    const alertContext = useContext(AlertContext);
    const {alert, showAlert} = alertContext;

    const authContext = useContext(AuthContext);
    const {login, message, auth} = authContext;

    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    useEffect(() => {
        if(auth) {
            props.history.push('/projects');
        }
        
        if(message) {
            showAlert(message.msg, message.category); 
        }
        // eslint-disable-next-line
    },[message, auth,props.history]);

    const {email,password} = user;

    const onChange = e => {
        setUser({
            ...user,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault();

        if( email.trim() === '' || password.trim() === '' ) {
            showAlert('Todos los campos son obligatorios', 'alerta-error');
            return; 
         }

         login({email, password});
    }
   
    return ( 
        <div className="form-usuario">
            { alert ? (<div className={`alerta ${alert.category}`} >{alert.msg}</div>) : null }
            <div className="contenedor-form sombra-dark">
                <h1>Iniciar Sesion</h1>

                <form
                    onSubmit={onSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            placeholder="Email"
                            onChange={onChange}
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            placeholder="Password"
                            onChange={onChange}
                        />
                    </div>

                    <div className="campo-form">
                        <input type="submit" className="btn btn-primario btn-block" value="Iniciar Sesion" />
                    </div>
                </form>
                <Link to={'/signup'} className="enlace-cuenta">
                    Obtener Cuenta
                </Link>
            </div>
        </div>
     );
}
 
export default Login;