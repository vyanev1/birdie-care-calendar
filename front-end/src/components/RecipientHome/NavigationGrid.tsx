import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, RouteComponentProps } from 'react-router-dom';
import { faList, faUtensils, faPills, faHandsWash, faUserNurse, faBell, faEye, faTasks } 
from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { RootState } from '@App/store/reducers';
import { RecipientActionTypes } from '@App/store/types';

interface MatchParams {
    id: string;
}

interface NavigationGridState {
}

interface NavigationGridProps extends RouteComponentProps<MatchParams> {
    store: RootState;
    selectRecipient: (id: string) => RecipientActionTypes;
}

class NavigationGrid extends React.Component<NavigationGridProps, NavigationGridState> {
    render() {
        const store = this.props.store;
        
        if (!store.selectedRecipient.id) {
            this.props.selectRecipient(this.props.match.params.id);
        }
        
        const id = store.selectedRecipient.id;
        
        return (
            <div className="container my-auto" style={{ maxWidth: '720px' }}>
                <div className="row">
                    <div className="col d-flex flex-column align-items-center">
                        <Link to={`/recipients/${id}/events`} className="btn btn-lg btn-dark">
                            <FontAwesomeIcon icon={faList} />
                        </Link>
                        <div>All events</div>
                    </div>
                    <div className="col d-flex flex-column align-items-center">
                        <Link 
                            to={`/recipients/${id}/caregivers`} 
                            className="btn btn-lg btn-danger"
                        >
                            <FontAwesomeIcon icon={faUserNurse} />
                        </Link>
                        <div>Caregivers</div>
                    </div>
                    <div className="col d-flex flex-column align-items-center">
                        <Link
                            to={`/recipients/${id}/events/food`} 
                            className="btn btn-lg text-white" 
                            style={{ background: 'darkorange' }}
                        >
                            <FontAwesomeIcon icon={faUtensils} />
                        </Link>
                        <div>Food</div>
                    </div>
                    <div className="col d-flex flex-column align-items-center">
                        <Link
                            to={`/recipients/${id}/events/medication`} 
                            className="btn btn-lg text-white" 
                            style={{ background: 'deeppink' }}
                        >
                            <FontAwesomeIcon icon={faPills} />
                        </Link>
                        <div>Medication</div>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col d-flex flex-column align-items-center">
                        <Link to={`/recipients/${id}/events/alerts`} className="btn btn-lg btn-dark">
                            <FontAwesomeIcon icon={faBell} />
                        </Link>
                        <div>Alerts</div>
                    </div>
                    <div className="col d-flex flex-column align-items-center">
                        <Link to={`/recipients/${id}/events/hygiene`} className="btn btn-lg btn-info">
                            <FontAwesomeIcon icon={faHandsWash} />
                        </Link>
                        <div>Hygiene</div>
                    </div>
                    <div className="col d-flex flex-column align-items-center">
                        <Link to={`/recipients/${id}/events/observations`} className="btn btn-lg btn-primary">
                            <FontAwesomeIcon icon={faEye} />
                        </Link>
                        <div>Observations</div>
                    </div>
                    <div className="col d-flex flex-column align-items-center">
                        <Link to={`/recipients/${id}/events/tasks`} className="btn btn-lg btn-success">
                            <FontAwesomeIcon icon={faTasks} />
                        </Link>
                        <div>Tasks</div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return { store: state };
};
  
export default connect(mapStateToProps)(NavigationGrid);