import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, RouteComponentProps } from 'react-router-dom';
import { faUserNurse } 
from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { RootState } from '@App/store/reducers';
import { EventsActionTypes, RecipientActionTypes } from '@App/store/types';
import { getRecipientCaregivers } from '@App/api';
import DateNavigation from '../Navigation/DateNavigation';
import { StyledTimeline } from '../Events/Timeline';
import names from '@App/misc/names';

export interface Caregiver {
    caregiver_id: string;
    timestamp: string;
}

interface MatchParams {
    id: string;
}

interface CaregiverGridProps extends RouteComponentProps<MatchParams> {
    store: RootState;
    selectRecipient: (id: string) => RecipientActionTypes;
    incrementDate: (date: Date, amount: number) => EventsActionTypes;
    changeDate: (newDate: Date) => EventsActionTypes;
}

interface CaregiverGridState {
    caregivers: Caregiver[];
    date: Date;
    fetching: boolean;
}

class CaregiverGrid extends React.Component<CaregiverGridProps, CaregiverGridState> {
    public constructor(props: CaregiverGridProps) {
        super(props);
        this.state = {
            caregivers: [],
            date: new Date(),
            fetching: true
        };
        this.onChange = this.onChange.bind(this);
    }

    public componentDidMount() {
        const store = this.props.store;
        if (!store.selectedRecipient.id) {
            this.props.selectRecipient(this.props.match.params.id);
        }
        getRecipientCaregivers(this.props.match.params.id).then(data => {
            var currentDate: Date;

            if (store.events.payload.events.length === 0) {
                currentDate = new Date(data[0].timestamp);
                this.props.changeDate(currentDate);
            } else {
                currentDate = store.events.payload.currentDate;
            }
            
            this.setState({
                caregivers: data,
                date: currentDate,
                fetching: false
            });
        });
    }

    public onChange(newDate: Date) {
        this.setState({
            caregivers: this.state.caregivers,
            date: newDate
        });
    }

    public render() {
        if (this.state.fetching) { return <div>Loading...</div>; }
        if (this.state.caregivers.length === 0) { return <div>No caregivers for this date found.</div>; }

        var id = this.props.store.selectedRecipient.id;
        var caregivers = this.state.caregivers
            .filter(caregiver => {
                var date = new Date(caregiver.timestamp);
                var isSameDay = (
                date.getDate() === this.state.date.getDate() &&
                date.getMonth() === this.state.date.getMonth() &&
                date.getFullYear() === this.state.date.getFullYear()
                );
                return isSameDay;
            })
            .map(caregiver => caregiver.caregiver_id);

        var list: string[] = [];
        new Set(caregivers).forEach(caregiver => {
            list.push(caregiver);
        });

        var timestamp = this.state.date.toDateString();
        
        return (
            <StyledTimeline className="container px-0">
                <DateNavigation
                    value={this.state.date}
                    onChange={this.onChange}
                    changeDate={this.props.changeDate}
                    incrementDate={this.props.incrementDate}
                />
                <div className="row my-4 px-4">
                    {list.map((caregiver, index) => (
                        <div key={caregiver} className="col-xs-4 col-md-2 d-flex flex-column align-items-center mb-3">
                            <Link 
                                to={`/recipients/${id}/events/caregivers/${caregiver}/${timestamp}`}
                                className="btn btn-lg btn-danger"
                            >
                                <FontAwesomeIcon icon={faUserNurse} />
                            </Link>
                            <small 
                                className="d-flex flex-column align-items-center"
                                style={{ width: '10em', wordBreak: 'break-all' }}
                            >
                                {names[caregiver]}
                            </small>
                        </div>
                    ))}
                </div>
            </StyledTimeline>
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return { store: state };
};
  
export default connect(mapStateToProps)(CaregiverGrid);