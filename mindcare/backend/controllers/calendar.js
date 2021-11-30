const CalendarEvent = require('../models/calendar-model');
require('dotenv/config');
const { google } = require('googleapis');
const OAuth2  = google.auth.OAuth2;


exports.calendarAddEvents = (req,res)=>{
 let title = req.body.title;
 let date=req.body.date;
 let time = req.body.time;  
  
  let newEvent = new CalendarEvent({
      title,
      date,
      time,
      _userId: req.user_id
    }) ;

    newEvent.save().then((event)=>{
        res.status(200).send(event)
    }).catch((err)=>{
        res.status(500).send("not added");
  
    })
}

exports.calendarGetEvents = (req,res)=>{
    CalendarEvent.find({ _userId: req.user_id},{_id:1,title:1,date:1,time:1},
        {sort:{date:-1,time:-1}}).then((event)=>{
            res.status(200).send(event);
        }).catch((err)=>{
            res.status(500).send(`${err}`)
        })
}

exports.calendarGetByIdEvents = (req,res)=>{
    let eventId = req.params.id;
    CalendarEvent.findById(eventId).then((event)=>{
        if(event){
            res.status(200).send(event)
        }else{
            res.status(404).send("Not a valid event")
        }
    }).catch((err)=>{
        res.status(500).send(`Faile${err}`)
    })
}

exports.meetLink = async function meet(){

    const oAuth2Client = new OAuth2(
        process.env.CALENDAR_CLIENT_ID, // ClientID
         process.env.CALENDAR_CLIENT_SECRET,
      )
      
      // Call the setCredentials method on our oAuth2Client instance and set our refresh token.
      oAuth2Client.setCredentials({
        refresh_token:  process.env.CALENDAR_REFRESH_TOKEN,
      })
      
      // Create a new calender instance.
      const calendar = google.calendar({ version: 'v3', auth: oAuth2Client })
      
      // Create a new event start date instance for temp uses in our calendar.
      const eventStartTime = new Date()
      eventStartTime.setDate(eventStartTime.getDay() + 4)
      
      // Create a new event end date instance for temp uses in our calendar.
      const eventEndTime = new Date()
      eventEndTime.setDate(eventEndTime.getDay() + 4)
      eventEndTime.setMinutes(eventEndTime.getMinutes() + 45)
      
      // Create a dummy event for temp uses in our calendar
      const event = {
        summary: `Meeting with mindcare`,
        location: `triv`,
        description: `mind`,
        colorId: 1,
        start: {
            dateTime: eventStartTime,
            timeZone: 'America/Denver',
          },
          end: {
            dateTime: eventEndTime,
            timeZone: 'America/Denver',
          },
      }
      
      // Check if we a busy and have an event on our calendar for the same time.
      calendar.freebusy.query(
        {
          resource: {
            timeMin: eventStartTime,
            timeMax: eventEndTime,
            timeZone: 'America/Denver',
            items: [{ id: 'primary' }],
          },
        },
        (err, res) => {
          // Check for errors in our query and log them if they exist.
          if (err) return console.error('Free Busy Query Error: ', err)
      
          // Create an array of all events on our calendar during that time.
          const eventArr = res.data.calendars.primary.busy
      
          // Check if event array is empty which means we are not busy
          if (eventArr.length === 0)
            // If we are not busy create a new calendar event.
            return calendar.events.insert(
              { calendarId: 'primary', resource: event },
              err => {
                // Check for errors and log them if they exist.
                if (err) return console.error('Error Creating Calender Event:', err)
                // Else log that the event was created.
                res.status(200).send("added")
                return console.log('Calendar event successfully created.')
                
              }
            )
      
          // If event array is not empty log that we are busy.
          return console.log(`Cannot be created...`)
        }
      )
}