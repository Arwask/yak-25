import React, { Component } from "react"

export default class Event extends Component {
    render() {
        return (
            <div className="card eventCard">
                <div className="card-header"><h5>{this.props.event.name}</h5>
                </div>
                <div className="card-body">
                    <ul>
                        <li className="card-name">By {this.props.event.firstName} {this.props.event.lastName}
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
