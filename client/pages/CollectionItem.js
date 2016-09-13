import React from 'react';
import classnames from 'classnames/bind';
import s from '../components/styles/ProductItem.styl';

const cx = classnames.bind(s);
export const CollectionItemPage = (props) => {
  
  console.log(props);
  
  return (
    <div>
      <h1>{props.attrs.title}</h1>
      <p dangerouslySetInnerHTML={{__html: props.attrs.body_html}} />
      <div className={cx("product-image")}>
        <img src={props.attrs.images[0].src} alt={`Product Image of ${props.attrs.title}`} />
      </div>
      <table className={cx("product-details")}>
        <thead>
          <tr>
            <td>PID</td>
            <td>Date Added</td>
            <td>Tags</td>
            <td>PID</td>
            <td>PID</td>
            <td>PID</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{props.attrs.product_id}</td>
            <td>{(new Date(props.attrs.created_at)).toString()}</td>
            <td>{props.attrs.created_at}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}