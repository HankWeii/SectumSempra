import React, { Component } from 'react'
import ErrorPage from './ErrorPage'

export default class ErrorBoundary extends Component {
    state = {
        hasError: false,
        errorMessage: null
    }

    static getDerivedStateFromError(error) {
        return {hasError: true, errorMessage: error}
    }
    render() {
        if(this.state.hasError) {
            return <ErrorPage error={this.state.errorMessage}/>
        }
        return this.props.children
    }
}
