import React, { Component } from 'react';
import Aux from '../Aux/Aux';
import Modal from '../../components/UI/Modal/Modal';

const WithErrorHandler = (WrappedComponent, axios) => {
	return class extends Component {
        state = {
            error: false
        }

        componentWillMount() {
            this.reqInterseptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });
            this.resInterceptior = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            })
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterseptor);
            axios.interceptors.response.eject(this.resInterseptor);
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
