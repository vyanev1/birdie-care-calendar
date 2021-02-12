import * as React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import history from './history';

import Timeline from './components/Events/Timeline';
import Home from './components/Home/Home';
import EventView from './components/Events/EventView';
import NavigationGrid from './components/RecipientHome/NavigationGrid';
import { DispatchProps } from './components/App/App';
import CaregiverGrid from './components/RecipientHome/CaregiverGrid';

interface RoutesProps extends DispatchProps {
}

export default class Routes extends React.Component<RoutesProps, {}> {
    constructor(props: RoutesProps) {
        super(props);
    }

    render() {
        const { fetchEventsIfNeeded, selectRecipient, incrementDate, changeDate } = this.props;
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/events/:id" component={EventView} />
                    <Route 
                        path="/home/:id" 
                        render={props => (
                            <NavigationGrid {...props} selectRecipient={selectRecipient} />
                        )} 
                    />
                    <Route 
                        path="/recipients/:id/caregivers" 
                        render={props => (
                            <CaregiverGrid 
                                {...props} 
                                selectRecipient={selectRecipient}
                                incrementDate={incrementDate}
                                changeDate={changeDate}
                            />
                        )} 
                    />
                    <Route 
                        path="/recipients/:id/events/:category?/:caregiverId?/:timestamp?" 
                        render={props => (
                            <Timeline 
                                {...props} 
                                fetchEventsIfNeeded={fetchEventsIfNeeded} 
                                incrementDate={incrementDate}
                                changeDate={changeDate}
                            />
                        )}
                    />
                    <Route 
                        path="/" 
                        exact={true} 
                        render={props => (
                            <Home {...props} selectRecipient={selectRecipient} />
                        )}
                    />
                </Switch>
            </Router>
        );
    }
}