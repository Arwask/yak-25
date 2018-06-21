import React, { Component } from "react"
import EventsList from "./EventsList"
import './Events.css'

export default class DisplayEvents extends Component {

    state = {
        events: []
    }

    activeUser = sessionStorage.getItem("ActiveUser")

    postNewEvent = (text) => fetch("http://localhost:8088/events", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userId: parseInt(this.activeUser),
            name: this.state.name,
            date: this.state.date,
            start_date: this.state.start_date,
            end_date: this.state.end_date,
            location: this.state.location,
            timestamp: Date.now()
        })
    })
        .then(r => r.json())
        .then(e => {
            this.setState({
                name: "",
                date: "",
                start_date: "",
                end_date: "",
                location: ""
            })
            alert("Event Created!")
        })

    // TO DO: clear fields and alert that event created successfully 

    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    componentDidMount() {
        let listOfEvents = []
        fetch("http://localhost:8088/events?_expand=user")
            .then(r => r.json())
            .then(event => {
                event.forEach(currentEvent => listOfEvents.push(currentEvent))
                this.setState({ events: listOfEvents })
            })
    }

    render() {
        return (
            <div className="container-full" >
                <div className="row">
                    <div className="col content">
                        <div className="eventsFeed">
                            <div className="event-header"><h3>Add a New Event</h3>
                                <div className="event-form-body">
                                    <form>
                                        <div className="form-group">
                                            <input id="name"
                                                placeholder="Event Name"
                                                value={this.state.name}
                                                onChange={this.handleFieldChange}
                                                className="form-control"
                                                rows="4"></input>
                                            <p>Event Date</p>
                                            <input id="date"
                                                type="date"
                                                value={this.state.date}
                                                onChange={this.handleFieldChange}
                                                className="form-control"
                                                rows="4"></input>
                                            <p>Start Time</p>
                                            <input id="start_date"
                                                type="time"
                                                value={this.state.start_date}
                                                onChange={this.handleFieldChange}
                                                className="form-control"
                                                rows="4"></input>
                                            <p>End Time</p>
                                            <input id="end_date"
                                                type="time"
                                                value={this.state.end_date}
                                                onChange={this.handleFieldChange}
                                                className="form-control"
                                                rows="4"></input>
                                            <input id="location"
                                                placeholder="Location"
                                                value={this.state.location}
                                                onChange={this.handleFieldChange}
                                                className="form-control"
                                                rows="4"></input>
                                        </div>
                                        <button type="button" onClick={this.postNewEvent} className="btn btn-info btn-lg">Post</button>
                                    </form>
                                </div>
                            </div>

                            <EventsList events={this.state.events} activeUser={this.props.activeUser} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}