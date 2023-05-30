import React from 'react';
import PropTypes from 'prop-types';

export default class ErrorBoundary extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    onError: PropTypes.func,
    /**
     * Force show error warning, for cases when error
     * caught outside and have to be displayed
     */
    force: PropTypes.oneOfType([PropTypes.instanceOf(Error), PropTypes.bool]),
  };

  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    const { onError } = this.props;
    console.error(error);
    console.log(errorInfo);
    if (onError) onError(error, errorInfo);
  }

  render() {
    const {
      children,
      force,
    } = this.props;
    const { hasError } = this.state;

    if (hasError || force) {
      return (
        <h3 className={"ErrorBoundary"}>
          {'Something went wrong.'}
        </h3>
      );
    }

    return children || null;
  }
}
