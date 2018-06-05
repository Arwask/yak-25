import React, { Component } from "react"
import Event from "./Event"

export default class EventList extends Component {
    render() {
        return (
            <div className="eventList">
                <h1 className="eventList__header">Upcoming Events</h1>
                {
                    this.props.events.map(e => <Event key={e.id} event={e} />)
                }
            </div>
        )
    }
}