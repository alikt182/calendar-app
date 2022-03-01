import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Swal from "sweetalert2";
import { startChecking } from "../components/actions/auth";
import { LoginScreen } from "../components/auth/LoginScreen";
import { CalendarScreen } from "../components/calendar/CalendarScreen";
import { PrivateRoute } from "./PrivateRouter";
import { PublicRoute } from "./PublicRouter";

export const AppRouter = () => {
  const dispatch = useDispatch();
  const { checking, uid } = useSelector( state => state.auth )

  useEffect(() => {

    dispatch( startChecking() );

  }, [ dispatch ]);

  if( checking ) {

    //return ( <h5> Espere... </h5> )
    Swal.fire({
        title: 'Cargando...',
        html: 'Espere por favor...',
        allowEscapeKey: false,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading()
        }
    });
} else {

    Swal.close();

}

  return (
    <Router>
      <div>
        <Routes>
          {/* <Route exact path="/login" element={<LoginScreen />} />

          <Route path="/" element={<CalendarScreen />} />

          <Route path="*" element={<Navigate replace to="/" />} /> */}

          <Route exact path='/login' element={ 

              <PublicRoute uid={ uid } >

                <LoginScreen/> 

              </PublicRoute>
            } 
          />

          <Route exact path='/*' 
          
            element={ 
              <PrivateRoute uid={ uid }>

                <CalendarScreen />

              </PrivateRoute> 
            }  
          />

        </Routes>
      </div>
    </Router>
  );
};
