import * as React from 'react';

import RecipientForm from '../Forms/RecipientForm';
import Title from './Title';
import SubTitle from './SubTitle';
import { RecipientActionTypes } from '@App/store/types';

interface HomeProps {
    selectRecipient: (id: string) => RecipientActionTypes;
}

interface HomeState {
}

class Home extends React.Component<HomeProps, HomeState> {
    constructor(props: HomeProps) {
        super(props);
    }

    render() {
        return (
            <>
                <div className="d-flex flex-column align-items-center">
                    <Title>Welcome to Birdie!</Title>
                    <SubTitle>Use our app to check how your older adult is doing!</SubTitle>
                    <RecipientForm selectRecipient={this.props.selectRecipient} />
                </div>
            </>
        );
    }
}

export default Home;