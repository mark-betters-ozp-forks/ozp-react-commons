'use strict';
//Is this used???
var React = require('react');
var Reflux = require('reflux');
var UserNotification = require('./UserNotification.jsx');
var ProfileActions = require('../../actions/ProfileActions.js');


var UserNotifications = React.createClass({

    _renderNotification(notification, openDropdown) {
        function handleClick(e) {
            console.log(e)
            if(notification.readStatus === false)
                ProfileActions.readNotification(notification);
        }
        return <UserNotification
            updateHud={this.props.updateHud}
            key={notification.id}
            notification={notification}
            openDropdown={openDropdown}
            onClick = {handleClick}
            />;
    },

    _renderNotifications() {
        var notifications = this.props.notifications;
        var length = 5;
        var openDropdown = this.props.openDropdown;

        return notifications.slice(0, length).map((notification, index) => {
            var notificationComponent = this._renderNotification(notification, openDropdown);
            return index === length - 1 ?
                notificationComponent :
                [notificationComponent, <li className="divider"></li>];
        });
    },

    render() {
        var notifications = this.props.notifications;
        if (notifications && notifications.length > 0) {
            // HACK: this is a hotfix to fix for the next release, adding a new
            // issue to toggle the tooltip off when the dropdown is visible.
            return (
                <ul style={{'zIndex': '10000000'}} className="dropdown-menu UserNotifications">
                    { this._renderNotifications(this.props.func) }
                    <li>
                      <span onClick={() => this.props.moreNotifications()}>See more</span>
                    </li>
                </ul>
            );
        }
        return null;
    }

});

module.exports = UserNotifications;
//<button className="btn btn-primary btn-sm" onClick={() => this.props.moreNotifications()}>See more</button>