import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { RootState } from '@App/store/reducers';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import history from '@App/history';
import { changeDate, fetchEventsIfNeeded, incrementDate, selectRecipient, unselectRecipient } from '@App/store/actions';
import { EventsActionTypes, RecipientActionTypes } from '@App/store/types';
import Logo from '@App/components/Home/Logo';
import Routes from '@App/routes';

const LogoUrl = require('@App/assets/images/logo-birdie.svg');

const GlobalStyle = createGlobalStyle`
  body {
    height: 100vh;
    background-color: #F9F9F9;
    > div {
      height: 100%;
    }
  }

  td {
    word-break: break-word;
    max-width: 100%;
  }

  .header-date {
    word-break: initial;
  }

  .btn-lg {
    font-size: 3rem;
  }

  .btn-nav {
    margin-left: -2.5em;
  }

  .react-date-picker__inputGroup, .react-date-picker__clear-button {
    display: none;
  }

  .react-date-picker__wrapper {
    display: inline-block;
    border: none!important;
    svg {
      width: 1.8rem;
      height: auto;
    }
  }

  .react-date-picker__button {
    padding: 5px 3px !important;
  }

  .react-date-picker__calendar {
    z-index: 2!important;
  }

  @media only screen and (max-width: 576px) {
    input.btn {
      font-size: 1.2em;
      margin: 0.75em auto;
    }

    .event-card-header {
      small {
        font-size: 0.5em;
      }
    }

    .btn-nav {
      margin-left: 0;
    }
  }
`;

type ActionTypes = EventsActionTypes | RecipientActionTypes;

export interface DispatchProps {
  selectRecipient: (id: string) => RecipientActionTypes;
  unselectRecipient: (id: string) => RecipientActionTypes;
  fetchEventsIfNeeded: (id: string, category?: string, caregiverId?: string) => Promise<EventsActionTypes>;
  incrementDate: (date: Date, amount: number) => EventsActionTypes;
  changeDate: (newDate: Date) => EventsActionTypes;
}

interface OwnProps {
}

export type AppProps = RootState & DispatchProps & OwnProps;

const AppContainer = styled.div`
  width: 100%;
  min-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0.5em;
`;

class App extends React.Component<AppProps, {}> {
  public constructor(props: AppProps) {
    super(props);
    this.logOut = this.logOut.bind(this);
  }

  public logOut() {
    const { selectedRecipient } = this.props;
    this.props.unselectRecipient(selectedRecipient.id);
    history.push('/');
  }

  public render() {
    return (
      <>
        <GlobalStyle />
        <Router basename={process.env.PUBLIC_URL}>
          <AppContainer>
            <Logo src={LogoUrl} onClick={this.logOut} />
            <Routes 
              fetchEventsIfNeeded={this.props.fetchEventsIfNeeded}
              unselectRecipient={this.props.unselectRecipient}
              selectRecipient={this.props.selectRecipient}
              incrementDate={this.props.incrementDate}
              changeDate={this.props.changeDate}
            />
          </AppContainer>
        </Router>
      </>
    );
  }
}

const mapStateToProps = (state: RootState, _ownProps: OwnProps) => ({
  selectedRecipient: state.selectedRecipient,
  events: state.events
});

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, any, ActionTypes>) => ({
  selectRecipient: (id: string) => dispatch(selectRecipient(id)),
  unselectRecipient: (id: string) => dispatch(unselectRecipient(id)),
  fetchEventsIfNeeded: (id: string, category?: string, caregiverId?: string) => 
                          dispatch(fetchEventsIfNeeded(id, category, caregiverId)),
  incrementDate: (date: Date, amount: number) => dispatch(incrementDate(date, amount)),
  changeDate: (newDate: Date) => dispatch(changeDate(newDate))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);