import React from 'react';
import PropTypes from 'prop-types';
import ClipLoader from 'react-spinners/ClipLoader';
import './spinner.scss';
const scrollHandler = (evn) => {
  evn.preventDefault();
};
/**
 * Spinner with overlay.
 * Fits upper "absolute/relative/fixed" parent.
 */
const Spinner = React.memo(({
  show,
  color,
  height,
}) => {
  if (!show) return null;


  return (
    <div className={"spinner-component"} onScroll={scrollHandler}>     
        <ClipLoader
            size={height}
            color={color}
            loading
            speedMultiplier={0.5}
        />
    </div>
  );
});

Spinner.propTypes = {
  /** Show or hide spinner */
  show: PropTypes.bool,
  /** Color prop to pass to ScaleLoader */
  color: PropTypes.string,
  /** Height prop to pass to ScaleLoader */
  height: PropTypes.number,
};

Spinner.defaultProps = {
  show: true,
  color: '#4595f7',
  height: 80,
};

export default Spinner;
