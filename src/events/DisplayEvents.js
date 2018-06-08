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
            this.DisplayAllEvents()
        })

    // TO DO: clear fields and alert that event created successfully 

    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    DisplayAllEvents = function() {

        let listOfEvents = []
        let d = new Date().toDateString("YYYY-MM-DD")
        // let month = d.getMonth()
        // let day = d.getDate()
        // let year = d.getFullYear()
        // let today = `${year}-${month}-${day}`
        // let sevenDays = d.getDate()+7

        console.log(d);
        
        // console.log(today);
        // console.log(sevenDays);
        
    
        fetch(`http://localhost:8088/events?_sort=date&_order=asc&date_gte=${today}&date_lte=${sevenDays}&_expand=user`)
            .then(r => r.json())
            .then(event => {
                event.forEach(currentEvent =>
                    listOfEvents.push(currentEvent))
                this.setState({ events: listOfEvents })
                
            })
        }

    componentDidMount() {
        this.DisplayAllEvents()
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
                            </div>

                            <EventsList events={this.state.events} activeUser={this.props.activeUser} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}