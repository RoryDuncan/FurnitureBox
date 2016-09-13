import React from 'react';
import classnames from 'classnames/bind';
import s from '../components/styles/ProductItem.styl';
import moment from 'moment';

moment.locale("ja")

let humanReadableDate = (dateString) => {
  let d = moment(dateString);
  return d.format("LL")
}


const cx = classnames.bind(s);
export const CollectionItemPage = (props) => {
  
  console.log(props);
  
  let dateAdded = humanReadableDate(props.attrs.published_at)
  
  return (
    <div>
      <h1>{props.attrs.title}</h1>
      <p dangerouslySetInnerHTML={{__html: props.attrs.body_html}} />
      <div className={cx("product-images")}>
        {props.attrs.images.map((d, i) => {
        
          let imgClasses = {
            "product-image": true,
            "primary": i === 0
          };
        
          return <img 
            key={i}
            className={cx(imgClasses)} 
            src={d.src} 
            alt={`Product Image of ${props.attrs.title}`} />
        })}
      </div>
      <table className={cx("product-details")}>
        <thead>
          <tr>
            <td>PID</td>
            <td>Date Added</td>
            <td>Tags</td>
            <td>Type</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{props.attrs.product_id}</td>
            <td>{dateAdded}</td>
            <td>{props.attrs.tags.length ? props.attrs.tags : "none"}</td>
            <td>{props.attrs.product_type}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}