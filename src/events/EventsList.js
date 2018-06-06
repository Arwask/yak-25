import React, { Component } from "react"
import Event from "./Event"

export default class EventList extends Component {
    render() {
        return (
            <div className="eventList">
                <button type="button" className="btn btn-info btn-lg eventBtn" data-toggle="modal" data-target="#eventListModal">Upcoming Events</button>

                <div className="modal fade" id="eventListModal" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header"><h3>Upcoming Events</h3>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                {
                                    this.props.events.map(e => <Event key={e.id} event={e} />)
                                }
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}