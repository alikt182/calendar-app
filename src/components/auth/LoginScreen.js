import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { useForm } from '../../hooks/useForm';
import { startLogin, startRegister } from '../actions/auth';
import './login.css';

export const LoginScreen = () => {

    const dispatch = useDispatch();
   
    //Login
    const [ formLoginValues, handleLoginInputChange ] = useForm({
        lEmail: 'ali.monserrate.icg@gmail.com',
        lPassword: '123456'
    });
    
    //Register
    const [ formRegisterValues, handleRegisterInputChange ] = useForm({
        rName: 'Nano',
        rEmail: 'nando@gmail.com',
        rPassword1: '123456',
        rPassword2: '123456'
    });

    //Login
    const { lEmail, lPassword } = formLoginValues;
    
    //Register
    const { rName, rEmail, rPassword1, rPassword2 } = formRegisterValues;

    //Login
    const handleLogin = (e) => {
        e.preventDefault();

        //console.log( formLoginValues );
        dispatch( startLogin( lEmail,lPassword ));

    }

    //Register
    const handleRegister = (e) => {
        e.preventDefault();

        if ( rPassword1 !== rPassword2 ) {
            console.log(rPassword1, rPassword2);
            return Swal.fire('Error','Las contraseñas no coinciden', 'error');
        }

        //console.log( formRegisterValues );
        dispatch( startRegister( rEmail, rPassword1, rName ));
    }

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={ handleLogin }>
                        <div className="form-group">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name="lEmail"
                                value={ lEmail }
                                onChange={ handleLoginInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="lPassword"
                                value={ lPassword }
                                onChange={ handleLoginInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={ handleRegister }>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name="rName"
                                value={ rName }
                                onChange={ handleRegisterInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name="rEmail"
                                value={ rEmail }
                                onChange={ handleRegisterInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña" 
                                name="rPassword1"
                                value={ rPassword1 }
                                onChange={ handleRegisterInputChange }
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña" 
                                name="rPassword2"
                                value={ rPassword2 }
                                onChange={ handleRegisterInputChange }
                            />
                        </div>

                        <div className="form-group">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}