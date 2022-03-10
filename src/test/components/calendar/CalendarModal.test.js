import { mount } from 'enzyme'
import { Provider } from 'react-redux'

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moment from 'moment';
import { act } from '@testing-library/react';

import '@testing-library/jest-dom';
import { types } from '../../../components/types/types';

import { CalendarModal } from '../../../components/calendar/CalendarModal';
import { eventClearActiveEvent, eventStartAddNew, eventStartUpdate } from '../../../components/actions/events';
import { clear } from '@testing-library/user-event/dist/clear';
import Swal from 'sweetalert2';

jest.mock('../../../components/actions/events', () => ({ 
    eventStartUpdate: jest.fn(),
    eventClearActiveEvent: jest.fn(),
    eventStartAddNew: jest.fn(),
}));

jest.mock('sweetalert2', () => ({ 
    fire: jest.fn()
}));


Storage.prototype.setItem = jest.fn();

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

const now = moment().minutes(0).second(0).add(1, "hours");
const nowPlus1 = now.clone().add(1, "hours");

const initState = {
    calendar: {
        events: [],
        activeEvent: {
            title: 'Hola Mundo',
            notes: 'Algunas notas',
            start: now.toDate(),
            end: nowPlus1.toDate(),
        }
    },
    auth: {
        uid: '123',
        name: 'Monserrate'
    },
    ui: {
        modalOpen: true
    }
};
const store = mockStore( initState ); 
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={ store }>
        <CalendarModal/>
    </Provider>
);

describe('Pruebas en <CalendarModal/>', ()=> {

    beforeEach(()=>{

        jest.clearAllMocks()

    })

    test('Debe mostrar el Modal', () => { 

        //expect( wrapper.find('.modal').exists() ).toBe(true);
        expect( wrapper.find('Modal').prop('isOpen') ).toBe(true);

    })

    test('Debe llamar la acción de actualizar y cerrar Modal', () => { 

        wrapper.find('form').simulate('submit',{
            preventDefault(){}
        });

        expect( eventStartUpdate ).toHaveBeenCalledWith( initState.calendar.activeEvent );
        expect( eventClearActiveEvent ).toHaveBeenCalled();

     })

     test('Debe de mostrar error si falta el título', () => {

        wrapper.find('form').simulate('submit',{
            preventDefault(){}
        });

        expect( wrapper.find('input[name="title"]').hasClass('is-invalid') ).toBe( true );

      })

      test('Debe crear un nuevo evento', () => { 

        const initState = {
            calendar: {
                events: [],
                activeEvent:null
            },
            auth: {
                uid: '123',
                name: 'Monserrate'
            },
            ui: {
                modalOpen: true
            }
        };
        const store = mockStore( initState ); 
        store.dispatch = jest.fn();
        
        const wrapper = mount(
            <Provider store={ store }>
                <CalendarModal/>
            </Provider>
        );


        wrapper.find('input[name="title"]').simulate('change',{
            target: {
                name: 'title',
                value: 'Hola Pruebas'
            }
        });

        wrapper.find('form').simulate('submit',{
            preventDefault(){}
        });

        expect( eventStartAddNew ).toHaveBeenCalledWith({

            end: expect.anything(),
            start: expect.anything(),
            title: 'Hola Pruebas',
            notes: ''

        });

        expect( eventClearActiveEvent ).toHaveBeenCalled();

       })

       test('Debe validar las fechas', () => { 

            wrapper.find('input[name="title"]').simulate('change',{
                target: {
                    name: 'title',
                    value: 'Hola Pruebas'
                }
            });

            const hoy = new Date();
            
            act(() => {
                wrapper.find('DateTimePicker').at(1).prop('onChange')( hoy );
            });

            wrapper.find('form').simulate('submit',{
                preventDefault(){}
            });

            expect( Swal.fire ).toHaveBeenCalledWith("Error", "La fecha fin debe ser mayor a la fecha de inicio", "error");

        })
    

})