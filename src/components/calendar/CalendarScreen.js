import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import { Navbar } from '../ui/Navbar';
import { messages } from '../../helpers/calendar-messages';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { uiOpenModal } from '../actions/ui';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es';

moment.locale('es')

const localizer = momentLocalizer(moment);

const events = [{
  title: 'Cumpleaños de Elver',
  start: moment().toDate(),
  end: moment().add( 2 , 'hours' ).toDate(),
  bgcolor: '#fafafa',
  notes: 'Comprar el pastel',
  user: {
    _id: '123',
    name: 'Andrea'
  }
}]

export const CalendarScreen = () => {

  const dispatch = useDispatch();

  const [lastView, setLastView] = useState( localStorage.getItem('lastView') || 'month' );

  const onDoubleClick = (e) => {
    //console.log(e);
    dispatch( uiOpenModal() );
  }

  const onSelectedEvent = (e) => {
    console.log(e);
  }

  const onViewChange = (e) => {
    setLastView(e); 
    localStorage.setItem('lastView',e);
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
                onView={ onViewChange }
                view={ lastView }
                messages={ messages }
                eventPropGetter={ eventStyleGetter }
                components={{
                  event: CalendarEvent
                }}
              />

        <CalendarModal />

      </div>
  )
};
