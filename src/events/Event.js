import React, { Component } from "react"

export default class Event extends Component {
    render() {
        return (
            <div className="card event">
                <div className="card-body">
                    <h5 className="card-title">By {this.props.event.userId}</h5>
                    <ul>
                        <li className="card-name">Event: {this.props.event.name}
                        </li>
                        <li className="card-date">Date: {this.props.event.date}
                        </li>
                        <li className="card-start_date">Start Time: {this.props.event.start_date}
                        </li>
                        <li className="card-end_date">End Time: {this.props.event.end_date}
                        </li>
                        <li className="card-location">Location: {this.props.event.location}
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}