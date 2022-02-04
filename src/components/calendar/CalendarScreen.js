import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import { Navbar } from '../ui/Navbar';
import { messages } from '../../helpers/calendar-messages';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { uiOpenModal } from '../actions/ui';
import { useSelector } from 'react-redux';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es';
import { eventClearActiveEvent, eventSetActive } from '../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';

moment.locale('es')

const localizer = momentLocalizer(moment);

// const events = [{
//   title: 'Cumpleaños de Elver',
//   start: moment().toDate(),
//   end: moment().add( 2 , 'hours' ).toDate(),
//   bgcolor: '#fafafa',
//   notes: 'Comprar el pastel',
//   user: {
//     _id: '123',
//     name: 'Andrea'
//   }
// }]

export const CalendarScreen = () => {

  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector( state => state.calendar );

  const [lastView, setLastView] = useState( localStorage.getItem('lastView') || 'month' );

  const onDoubleClick = (e) => {
    //console.log(e);
    dispatch( uiOpenModal() );
  }

  const onSelectedEvent = (e) => {
    //console.log(e);
    dispatch( eventSetActive( e ) );
  }

  const onViewChange = (e) => {
    setLastView(e); 
    localStorage.setItem('lastView',e);
  }

  const onSelectSlot = (e) =>{
    dispatch( eventClearActiveEvent() )
  }

  const eventStyleGetter = ( event, start, end, isSelected ) => {
    //console.log(event, start, end, isSelected)

    const style = {
      backgroundColor: '#367CF7',
      borderRadius: '0px',
      opacity: 0.8,
      display: 'block',
      color: 'white'
    }


    return {
      style
    }
  }

  return (
      <div className="calendar-screen">
              <Navbar/>
              <Calendar
                localizer={localizer}
                events={ events }
                startAccessor="start"
                endAccessor="end"
                //style={{ height: 500 }}
                onDoubleClickEvent={ onDoubleClick }
                onSelectEvent={ onSelectedEvent }
                view={ lastView }
                onView={ onViewChange }
                onSelectSlot={ onSelectSlot }
                selectable={ true }
                messages={ messages }
                eventPropGetter={ eventStyleGetter }
                components={{
                  event: CalendarEvent
                }}
              />
          <AddNewFab/>

          {
            (activeEvent) && <DeleteEventFab/>
          }

        <CalendarModal />

      </div>
  )
};
