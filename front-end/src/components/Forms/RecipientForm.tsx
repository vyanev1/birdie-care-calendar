import * as React from 'react';
import history from '@App/history';
import { getRecipientEvents } from '../../api';
import { RecipientActionTypes } from '@App/store/types';

interface RecipientFormProps {
    selectRecipient: (id: string) => RecipientActionTypes;
}

interface RecipientFormState {
    recipientInput: string;
    invalidIdInput: string;
}

class RecipientForm extends React.Component<RecipientFormProps, RecipientFormState> {
    public constructor(props: RecipientFormProps) {
        super(props);
        this.state = {
            recipientInput: '',
            invalidIdInput: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    public handleChange (event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            ...this.state,
            recipientInput: event.target.value,
        });
    }

    public async handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const id = this.state.recipientInput;
        const data = await getRecipientEvents(id);
        
        if (data && data.length > 0) {
            this.props.selectRecipient(id);
            history.push(`home/${id}`); // change this later
        } else {
            this.setState({
                ...this.state,
                invalidIdInput: id
            });
        }
    }

    render() {
        return (
            <form className="form-row w-100 mt-3" onSubmit={this.handleSubmit}>
                <div className="col-sm-10">
                    <input 
                        onChange={this.handleChange} 
                        className={`form-control ${this.state.invalidIdInput ? 'is-invalid' : ''}`} 
                        type="text" 
                        placeholder="Enter recipient's id here." 
                        required={true}
                    />
                    {this.state.invalidIdInput && (
                        <div className="invalid-feedback">
                            Cannot find recipient with the following id:
                            <div className="text-truncate" style={{ maxWidth: '20em' }}>
                                {this.state.invalidIdInput}
                            </div>
                        </div>
                    )}
                </div>
                <div className="col-sm-2 text-center">
                    <input type="submit" className="btn btn-dark" value="Submit"/>
                </div>
            </form>
        );
    }
}

export default RecipientForm;