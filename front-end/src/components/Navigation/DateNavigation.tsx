import { faArrowLeft, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import styled from 'styled-components';
import history from '@App/history';
import DatePicker from 'react-date-picker';
import { EventsActionTypes } from '@App/store/types';
import { RootState } from '@App/store/reducers';
import { connect } from 'react-redux';

const Navigation = styled.div`
  padding: 1em 0;
  border-radius: 10px 10px 0 0;
  background-color: #54C6C1;
`;

interface StateProps {
    store: RootState;
}

interface OwnProps {
    value: Date;
    onChange: (newDate: Date) => void;
    incrementDate?: (date: Date, amount: number) => EventsActionTypes;
    changeDate?: (newDate: Date) => EventsActionTypes;
}

type Props = OwnProps & StateProps;

interface State {
    date: Date;
}

class DateNavigation extends React.Component<Props, State> {
    public constructor(props: Props) {
        super(props);
        this.state = { 
          date: this.props.value
        };
        this.changeDate = this.changeDate.bind(this);
        this.onDatePick = this.onDatePick.bind(this);
    }

    public changeDate(amount: number) {
        var newDate: Date;
        if (this.props.incrementDate) {
            this.props.incrementDate(this.state.date, amount);
            newDate = this.props.store.events.payload.currentDate;
        } else {
            newDate = this.state.date;
            newDate.setDate(this.state.date.getDate() + amount);
        }
        this.setState({
            date: newDate
        });
        this.props.onChange(newDate);
    }
    
    public onDatePick(newDate: Date) {
        if (this.props.changeDate) {
            this.props.changeDate(newDate);
        }
        this.setState({
          date: newDate
        });
        this.props.onChange(newDate);
    }

    render() {
        return (
            <Navigation className="d-flex justify-content-center align-items-center px-2">
                <button onClick={() => history.goBack()} className="btn btn-dark mr-auto">
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                <div className="btn-nav d-flex mr-auto">
                    <button className="btn btn-dark" onClick={() => this.changeDate(-1)}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    <div className="d-flex lead align-items-center mx-1">
                    <span className="ml-1">{this.state.date.toDateString()}</span>
                    <DatePicker 
                        onChange={this.onDatePick} 
                        value={this.state.date}
                        format="dd MMM yyyy"
                        className="ml-1"
                    />
                    </div>
                    <button className="btn btn-dark" onClick={() => this.changeDate(1)}>
                    <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                </div>
            </Navigation>
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return { store: state };
};

export default connect(mapStateToProps)(DateNavigation);