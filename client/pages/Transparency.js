import React from 'react';
import classnames from 'classnames/bind';
import s from '../components/styles/App.styl';
import Page from '../components/Page';
const cx = classnames.bind(s);


export class Transparency extends React.Component {
  render() {
    return (
      <Page>
        <div className={cx('site-title')}>
          <h1>Transparency</h1>
        </div>
          <p>
            Bacon ipsum dolor amet short loin ground round swine leberkas filet mignon bacon. Biltong prosciutto porchetta kielbasa short loin meatball. Pork shank boudin pig. Ribeye strip steak boudin cupim frankfurter andouille. Kevin short loin pork loin tail kielbasa brisket corned beef sausage porchetta hamburger turkey prosciutto boudin swine flank. Meatball meatloaf bresaola kevin.
          </p>
          <p>
            Short ribs drumstick beef pork loin sirloin turkey kielbasa tri-tip tail ball tip. Filet mignon shoulder jerky cupim pastrami landjaeger chicken t-bone shankle. Kielbasa hamburger landjaeger turkey meatball. Salami pork doner venison bacon t-bone. Jerky beef ribs meatloaf flank tongue salami andouille bresaola pastrami filet mignon.
          </p>
          <p>
            Picanha filet mignon landjaeger tenderloin ribeye ball tip biltong cupim drumstick alcatra bacon pig venison meatball. Boudin swine frankfurter flank doner strip steak. Picanha beef cow ribeye. Corned beef filet mignon pork chop hamburger porchetta kevin beef beef ribs. T-bone beef ribs doner, hamburger brisket biltong pork belly ham short loin andouille pork loin. Cupim beef brisket pastrami picanha sausage pork turducken short ribs landjaeger. Kevin spare ribs rump fatback, tenderloin landjaeger tongue ribeye.
          </p>
      </Page>
    );
  }
}