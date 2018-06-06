import React, { Component } from "react"
import EventsList from "./EventsList"
import './Events.css'

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
        fetch("http://localhost:8088/users?_embed=events")
            .then(r => r.json())
            .then(events => this.setState({ events: events }))
    }

    render() {
        return (
            <div className="container-full">
                <div className="row">
                    <div className="col content">
                        <div className="eventsFeed">
                            <button type="button" className="btn btn-info btn-lg eventBtn" data-toggle="modal" data-target="#newEventModal">Add a New Event</button>

                            <div className="modal fade" id="newEventModal" role="dialog">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header"><h3>Add a New Event</h3>
                                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                                        </div>
                                        <div className="modal-body">
                                            <form>
                                                <div className="form-group">
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
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                                        </div>
                                    </div>

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