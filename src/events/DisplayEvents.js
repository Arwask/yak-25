import React, { Component } from "react"
import EventsList from "./EventsList"
import './Events.css'

export default class DisplayEvents extends Component {

    state = {
        events: []
    }

    // get logged in userId
    activeUser = sessionStorage.getItem("ActiveUser")

    // post a new event to api
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
            // update list of events with posted event
            this.displayAllEvents()
        })

    // track keyup changes on form fields
    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    // display all events from api
    displayAllEvents = function () {
        let listOfEvents = []
        let date = new Date()
        date.setDate(date.getDate() + 7)

        // gets the date 7 days in the future in the yyyy-mm-dd format to interpolate into the get method
        let sevenDaysDate = date.getFullYear() + '-' + ('0' + (date.getMonth()+1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
        console.log(sevenDaysDate);
        

        fetch(`http://localhost:8088/events?_expand=user&date_lte=${sevenDaysDate}`)
            .then(r => r.json())
            .then(event => {
                event.forEach(currentEvent => listOfEvents.push(currentEvent))
                this.setState({ events: listOfEvents })
            })
    }

    componentDidMount() {
        this.displayAllEvents()
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