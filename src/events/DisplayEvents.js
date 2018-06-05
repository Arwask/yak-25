import React, { Component } from "react"
import EventsList from "./EventsList"

export default class DisplayEvents extends Component {

    state = {
        events: []
    }

    activeUser = sessionStorage.getItem("userId")

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
        .then(() => {
            return fetch("http://localhost:8088/events")
        })
        .then(r => r.json())
        .then(events => {
            this.setState({
                name: "",
                date: "",
                start_date: "",
                end_date: "",
                location: "",
                events: events
            })
        })

    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    componentDidMount() {
        fetch("http://localhost:8088/events")
            .then(r => r.json())
            .then(events => this.setState({ events: events }))
    }

    render() {
        return (
            <div className="container-full">
                <div className="row">
                    <div className="col content col-sm-6">
                        <div className="eventsFeed">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="message"><h5>Add a new event</h5></label>
                                    <input id="name"
                                        placeholder="Event Name"
                                        value={this.state.name}
                                        onChange={this.handleFieldChange}
                                        className="form-control"
                                        rows="4"></input>
                                    <input id="date"
                                        type="date"
                                        value={this.state.date}
                                        onChange={this.handleFieldChange}
                                        className="form-control"
                                        rows="4"></input>
                                    <input id="start_date"
                                        placeholder="Start Time"
                                        value={this.state.start_date}
                                        onChange={this.handleFieldChange}
                                        className="form-control"
                                        rows="4"></input>
                                    <input id="end_date"
                                        placeholder="End Time"
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
                            <EventsList events={this.state.events} activeUser={this.props.activeUser} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}