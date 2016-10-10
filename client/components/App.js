import React, { PropTypes } from 'react';
import classnames from 'classnames/bind';
import 'normalize.css';
import './styles/lib/skeleton.css';
import './favicon.ico';
import s from './styles/App.styl';

const cx = classnames.bind( s );

/**
 * NOTE: As of 2015-11-09 react-transform does not support a functional
 * component as the base compoenent that's passed to ReactDOM.render, so we
 * still use createClass here.
 */
export class App extends React.Component {
  static propTypes = {
    children: PropTypes.node,
  }
  render() {
    return (
      <div className={cx( 'App' )}>
        {this.props.children}
      </div>
    );
  }
}
