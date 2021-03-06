import { mount } from 'enzyme'
import { Provider } from 'react-redux'

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';
import { CalendarScreen } from '../../../components/calendar/CalendarScreen';
import { messages } from '../../../helpers/calendar-messages';
import { types } from '../../../components/types/types';
import { eventSetActive, eventStartLoading } from '../../../components/actions/events';
import { act } from '@testing-library/react';

jest.mock('../../../components/actions/events', () => ({ 
    eventSetActive: jest.fn(),
    eventStartLoading: jest.fn()
}));

Storage.prototype.setItem = jest.fn();

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

const initState = {
    calendar: {
        events: []
    },
    auth: {
        uid: '123',
        name: 'Monserrate'
    },
    ui: {
        openModal: false
    }
};
const store = mockStore( initState ); 
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={ store }>
        <CalendarScreen/>
    </Provider>
)

describe('Pruebas en <CalendarScreen />', ()=> {

    test('Debe mostrarse correctamente', () => { 

        expect( wrapper ).toMatchSnapshot();

     })

     test('Pruebas con las interacciones del calendario', () => { 

        const calendar = wrapper.find('Calendar');

        const calendarMessages = calendar.prop('messages');
        expect( calendarMessages ).toEqual( messages );

        calendar.prop('onDoubleClickEvent')();
        expect( store.dispatch ).toHaveBeenCalledWith( { type: types.uiOpenModal} );
        
        calendar.prop('onSelectEvent')( { start: 'Hola' } );
        expect( eventSetActive ).toHaveBeenCalledWith( { start: 'Hola' } );
        
         //EL ACT ES UNA INSTRUCCION QUE HACE UNA MODIFICACION CON EL SETSTATE
        act(() => {
            calendar.prop('onView')( 'week' );
            expect( localStorage.setItem ).toHaveBeenCalledWith('lastView', 'week');
        });

      })

})