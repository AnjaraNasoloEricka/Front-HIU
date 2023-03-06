import React, { Component, useState } from "react";
import moment from "moment";

import TimeTable from "react-timetable-events";
import { Container } from "@mui/material";

const allstate = {
  events: {
    monday: [
      {
        id: 1,
        name: "Homework",
        type: "custom",
        startTime: moment("2018-02-23T11:30:00"),
        endTime: moment("2018-02-23T13:30:00")
      },

      {
        id: 2,
        name: "Classwork",
        type: "custom",
        startTime: moment("2018-02-23T09:30:00"),
        endTime: moment("2018-02-23T11:00:00")
      },
      {
        id: 3,
        name: "Test",
        type: "custom",
        startTime: moment("2018-02-22T14:30:00"),
        endTime: moment("2018-02-22T15:30:00")
      },
      {
        id: 4,
        name: "Test",
        type: "custom",
        startTime: moment("2018-02-22T15:30:00"),
        endTime: moment("2018-02-22T16:30:00")
      }
    ],
    tuesday: [
      {
        id: 5,
        name: "Homework",
        type: "custom",
        startTime: moment("2018-02-22T09:30:00"),
        endTime: moment("2018-02-22T11:30:00")
      },
      {
        id: 6,
        name: "Classwork",
        type: "custom",
        startTime: moment("2018-02-23T12:00:00"),
        endTime: moment("2018-02-23T13:00:00")
      },
      {
        id: 7,
        name: "Classwork",
        type: "custom",
        startTime: moment("2018-02-23T13:30:00"),
        endTime: moment("2018-02-23T14:30:00")
      },
      {
        id: 8,
        name: "Classwork",
        type: "custom",
        startTime: moment("2018-02-23T15:30:00"),
        endTime: moment("2018-02-23T17:30:00")
      }
    ],
    wednesday: [
      {
        id: 7,
        name: "Classwork",
        type: "custom",
        startTime: moment("2018-02-23T13:30:00"),
        endTime: moment("2018-02-23T14:30:00")
      },
      {
        id: 4,
        name: "Test",
        type: "custom",
        startTime: moment("2018-02-22T15:30:00"),
        endTime: moment("2018-02-22T16:30:00")
      }
    ],
    thursday: [
      {
        id: 7,
        name: "Classwork",
        type: "custom",
        startTime: moment("2018-02-23T09:30:00"),
        endTime: moment("2018-02-23T12:30:00")
      },
      {
        id: 4,
        name: "Test",
        type: "custom",
        startTime: moment("2018-02-22T14:30:00"),
        endTime: moment("2018-02-22T18:30:00")
      }
    ],
    friday: [
      {
        id: 7,
        name: "Classwork",
        type: "custom",
        startTime: moment("2018-02-23T11:30:00"),
        endTime: moment("2018-02-23T14:30:00")
      },
      {
        id: 4,
        name: "Test",
        type: "custom",
        startTime: moment("2018-02-22T15:30:00"),
        endTime: moment("2018-02-22T16:30:00")
      }
    ],
    saturday: [
      {
        id: 7,
        name: "Classwork",
        type: "custom",
        startTime: moment("2018-02-23T08:30:00"),
        endTime: moment("2018-02-23T09:30:00")
      },
      {
        id: 4,
        name: "Test",
        type: "custom",
        startTime: moment("2018-02-22T16:30:00"),
        endTime: moment("2018-02-22T17:30:00")
      }
    ],
    sunday: []
  }
};


const MyTimeTable=()=> {
  const[events, setEvents] = useState(allstate.events);

  function renderHour(hour, defaultAttributes, styles) {
    return (
      <div {...defaultAttributes} key={hour}>
        {hour}h
      </div>
    );
  }

  function renderEvent(event, defaultAttributes, styles) {
    return (
      <div {...defaultAttributes} title={event.name} key={event.id}>
        <span className={styles.event_info}>[ {event.name} ]</span>
        <span className={styles.event_info}>
          {event.startTime.format("HH:mm")} - {event.endTime.format("HH:mm")}
        </span>
      </div>
    );
  }


    return (
      <Container>
        <TimeTable
          events={events}
          renderHour={this.renderHour}
          renderEvent={this.renderEvent}
          hoursInterval={[7, 24]}
          timeLabel="Time :)"
        />
      </Container>
    );
}
