import React, { Component } from 'react';
import Aux from '../Aux/Aux';
import Modal from '../../components/UI/Modal/Modal';

const WithErrorHandler = (WrappedComponent, axios) => {
	return class extends Component {
        state = {
            error: false
        }

        componentDidMount() {
            axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });
            axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            })
        }

        errorClear = () => {
            this.setState({error: false});
        }
        
		render() {
            console.log("dsfsf");
			return (
				<Aux>
					<Modal show={this.state.error} modalClosed={this.errorClear}>
						<p>Error</p>
					</Modal>
					<WrappedComponent {...this.props} />
				</Aux>
			);
		}
	};
};

export default WithErrorHandler;
