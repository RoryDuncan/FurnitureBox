import React, { PropTypes } from 'react';
import classnames from 'classnames/bind';
import s from '../components/styles/ProductItem.styl';
import moment from 'moment';
import formatMessage from 'format-message';

// assume ja by default. simpler on us
moment.locale( 'ja' );

let humanReadableDate = ( dateString ) => {
  let d = moment( dateString );
  return d.format( 'LL' );
};

// i18n table details

let none = formatMessage({ id: 'concept: none', default: 'none', description: 'The concept or idea of \'none\', or \'zero\'.' });

let tableHeaders = {
  'pid': formatMessage({ id: 'product:details_pid', default: 'PID', description: 'The table heading \'PID\', short for Product ID' }),
  'dateAdded': formatMessage({ id: 'product:details_date_added', default: 'Date Added', description: 'The table heading \'Date Added\'' }),
  'tags': formatMessage({ id: 'product:details_tags', default: 'Tags', description: 'The table heading \'Tags\'' }),
  'type': formatMessage({ id: 'product:details_type', default: 'Type', description: 'The table heading \'Type\'. Type examples: \'desk\' or \'sofa\'.' }),
};

const cx = classnames.bind( s );
export const CollectionItemPage = ( props ) => {

  // i18n
  let productImageAltText = formatMessage({
    id: 'product:img_alt_text',
    default: 'Image of the \'{product_title}\' item',
    description: 'Alternative text describing the product image.',
  }, { product_title: props.attrs.title });

  console.log( props ); // eslint-disable-line

  let dateAdded = humanReadableDate( props.attrs.published_at );

  return (
    <div>
      <h1>{props.attrs.title}</h1>
      <p dangerouslySetInnerHTML={{ __html: props.attrs.body_html }} />
      <div className={cx( 'product-images' )}>
        {props.attrs.images.map(( d, i ) => {

          let imgClasses = {
            'product-image': true,
            'primary': i === 0,
          };

          return <img key={i} className={cx( imgClasses )} src={d.src} alt={`Product Image of ${ productImageAltText }`}/>;
        })}
      </div>
      <table className={cx( 'product-details' )}>
        <thead>
          <tr>
            <td>{tableHeaders.pid}</td>
            <td>{tableHeaders.dateAdded}</td>
            <td>{tableHeaders.tags}</td>
            <td>{tableHeaders.type}</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{props.attrs.product_id}</td>
            <td>{dateAdded}</td>
            <td>{props.attrs.tags.length
                ? props.attrs.tags
                : none}</td>
            <td>{props.attrs.product_type}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

CollectionItemPage.propTypes = {
  attrs: PropTypes.any,
};
