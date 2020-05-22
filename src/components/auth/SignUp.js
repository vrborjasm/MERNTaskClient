import React, {useState, useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';
import AlertContext from '../../context/alerts/alertContext';
import AuthContext from '../../context/auth/authContext';

const SignUp = (props) => {
   
    const alertContext = useContext(AlertContext);
    const {alert, showAlert} = alertContext;

    const authContext = useContext(AuthContext);
    const {signUpUser, message, auth} = authContext;

    useEffect(() => {
        if(auth) {
            props.history.push('/projects');
        }
        
        if(message) {
            showAlert(message.msg, message.category); 
        }
        // eslint-disable-next-line
    },[message, auth,props.history]);

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        confirm: ''
    })

    const {name, email,password, confirm} = user;

    const onChange = e => {
        setUser({
            ...user,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault();

        if( name.trim() === '' || email.trim() === '' || password.trim() === '' || confirm.trim() === '') {
           showAlert('Todos los campos son obligatorios', 'alerta-error');
           return; 
        }

        if(password.length < 6) {
            showAlert('El password debe ser de al menos 6 caracteres', 'alerta-error');
            return; 
        }

        if(password !== confirm) {
            showAlert('Los passwords no son iguales', 'alerta-error');
            return; 
        }

        signUpUser({
            name,
            email,
            password
        })
    }
   
    return ( 
        <div className="form-usuario">
            { alert ? (<div className={`alerta ${alert.category}`} >{alert.msg}</div>) : null }
            <div className="contenedor-form sombra-dark">
                <h1>Sign Up</h1>
                <form
                    onSubmit={onSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="name">Nombre</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            placeholder="Nombre"
                            onChange={onChange}
                        />
                    </div>
                    
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
                        <label htmlFor="confirm">Confirmar Password</label>
                        <input
                            type="password"
                            id="confirm"
                            name="confirm"
                            value={confirm}
                            placeholder="Repite tu Password"
                            onChange={onChange}
                        />
                    </div>

                    <div className="campo-form">
                        <input type="submit" className="btn btn-primario btn-block" value="Registrar" />
                    </div>
                </form>
                <Link to={'/'} className="enlace-cuenta">
                    Iniciar Sesion
                </Link>
            </div>
        </div>
     );
}
 
export default SignUp;