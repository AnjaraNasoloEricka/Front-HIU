import React, { Component } from "react";
import { render } from "react-dom";
import moment from "moment";

import Timetable from "react-timetable-events";//   constructor(props, context) {
    //     super(props, context);
    //     this.state = {
    //       timetableProps: {
    //         events: {
    //           monday: [
    //             {
    //               id: 1,
    //               name: "CO659 Computational Creativity",
    //               type: "LECTURE",
    //               taughBy: "Johnson Dr C",
    //               location: "DLT1",
    //               startTime: moment("2020-03-23T15:00:00"),
    //               endTime: moment("2020-03-23T16:00:00")
    //             }
    //           ],
    //           tuesday: [
    //             {
    //               id: 2,
    //               name: "CO641 Computer Graphics and Animation",
    //               type: "LECTURE",
    //               taughBy: "Kenny Dr P",
    //               location: "CHLT",
    //               startTime: moment("2020-03-23T11:00:00"),
    //               endTime: moment("2020-03-23T12:00:00")
    //             },
    //             {
    //               id: 3,
    //               name: "CO659 Group 3 Computational Creativity",
    //               type: "SEMINAR",
    //               taughBy: "Ribeiro C",
    //               location: "CNWSR5",
    //               startTime: moment("2020-03-23T16:00:00"),
    //               endTime: moment("2020-03-23T17:00:00")
    //             }
    //           ],
    //           wednesday: [],
    //           thursday: [],
    //           friday: []
    //         },
    //         hoursInterval: [9, 19],
    //         timeLabel: "Time",
    //         renderHour(hour, defaulAttributes, styles) {
    //           return (
    //             <div {...defaulAttributes} key={hour}>
    //               {hour}
    //             </div>
    //           );
    //         },
    //         renderEvent(event, defaultAttributes, styles) {
    //           return (
    //             <div {...defaultAttributes} title={event.name} key={event.id}>
    //               <span className={styles.event_info}>{event.name}</span>
    //               <span className={styles.event_info}>
    //                 Taugh by:{event.taughBy}
    //               </span>
    //               <span className={styles.event_info}>
    //                 {event.startTime.format("HH:mm")} -{" "}
    //                 {event.endTime.format("HH:mm")}
    //               </span>
    //             </div>
    //           );
    //         }
    //       }
    //     };
    //   }



const MyTimeTable = () => {
    return (
        <h1>huhu</h1>
    )
}

export default MyTimeTable;

// export default class MyTimeTable extends Component {
//   constructor(props, context) {
//     super(props, context);
//     this.state = {
//       timetableProps: {
//         events: {
//           monday: [
//             {
//               id: 1,
//               name: "CO659 Computational Creativity",
//               type: "LECTURE",
//               taughBy: "Johnson Dr C",
//               location: "DLT1",
//               startTime: moment("2020-03-23T15:00:00"),
//               endTime: moment("2020-03-23T16:00:00")
//             }
//           ],
//           tuesday: [
//             {
//               id: 2,
//               name: "CO641 Computer Graphics and Animation",
//               type: "LECTURE",
//               taughBy: "Kenny Dr P",
//               location: "CHLT",
//               startTime: moment("2020-03-23T11:00:00"),
//               endTime: moment("2020-03-23T12:00:00")
//             },
//             {
//               id: 3,
//               name: "CO659 Group 3 Computational Creativity",
//               type: "SEMINAR",
//               taughBy: "Ribeiro C",
//               location: "CNWSR5",
//               startTime: moment("2020-03-23T16:00:00"),
//               endTime: moment("2020-03-23T17:00:00")
//             }
//           ],
//           wednesday: [],
//           thursday: [],
//           friday: []
//         },
//         hoursInterval: [9, 19],
//         timeLabel: "Time",
//         renderHour(hour, defaulAttributes, styles) {
//           return (
//             <div {...defaulAttributes} key={hour}>
//               {hour}
//             </div>
//           );
//         },
//         renderEvent(event, defaultAttributes, styles) {
//           return (
//             <div {...defaultAttributes} title={event.name} key={event.id}>
//               <span className={styles.event_info}>{event.name}</span>
//               <span className={styles.event_info}>
//                 Taugh by:{event.taughBy}
//               </span>
//               <span className={styles.event_info}>
//                 {event.startTime.format("HH:mm")} -{" "}
//                 {event.endTime.format("HH:mm")}
//               </span>
//             </div>
//           );
//         }
//       }
//     };
//   }

//   render() {
//     return <Timetable {...this.state.timetableProps} />;
//   }
// }

