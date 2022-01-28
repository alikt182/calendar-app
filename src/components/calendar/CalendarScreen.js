import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import { Navbar } from '../ui/Navbar';
import { messages } from '../../helpers/calendar-messages';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es';

moment.locale('es')

const localizer = momentLocalizer(moment);

const events = [{
  title: 'Cumpleaños de Elver',
  start: moment().toDate(),
  end: moment().add( 2 , 'hours' ).toDate(),
  bgcolor: '#fafafa',
  notes: 'Comprar el pastel'
}]

export const CalendarScreen = () => {

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
                messages={ messages }
                eventPropGetter={ eventStyleGetter }
              />

      </div>
  )
};
