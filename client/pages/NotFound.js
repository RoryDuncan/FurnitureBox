import React from 'react';
import { Link } from 'react-router';
import classnames from 'classnames/bind';
import s from '../components/styles/App.styl';
import Page from '../components/Page';
const cx = classnames.bind(s);
import formatMessage from 'format-message';

let pageTitle = formatMessage({
  id: 'not_found:page_title',
  default: 'The Page Wasn\'t Found',
  description: 'The \'404 error, page not found\' Page\'s title',
});

let pageSubTitle = formatMessage({
  id: 'not_found:page_subtitle',
  default: 'A 404 Error Occurred',
  description: 'The \'404 error, page not found\' Page\'s subtitle',
});

let errorDescription = formatMessage({
  id: 'not_found:404_description',
  default: '404 Errors happen when a URL is incorrect, or a page that once existed was moved.',
  description: 'A short summary of what a 404 error is.',
});

let howToContinueHeading = formatMessage({
  id: 'not_found:how_to_continue_heading',
  default: 'How to Continue',
  description: 'The heading of a section describing what steps the user can take next.',
});


let stepsUserCanTake = {

  'one': formatMessage({
    id: 'not_found:how_to_continue_step_1',
    default: 'Double-check that the URL is correct (i.e., \'shop\' and not \'shpo\')',
    description: 'The first step, describing how the user can resolve their problem by making sure the url is correct.',
  }),

  'two': formatMessage({
    id: 'not_found:how_to_continue_step_2',
    default: 'If the page should be available, let us know you ran into this problem.',
    description: 'The next step, describing how the user can contact support.',
  }),

  'three_one': formatMessage({
    id: 'not_found:how_to_continue_step_3_1',
    default: 'Forget this ever happened.',
    description: 'The third step that tells the user to move on, or return to shopping.',
  }),

  'three_two': formatMessage({
    id: 'not_found:how_to_continue_step_3_2',
    default: 'Return to the main site',
    description: 'The text that links to the homepage',
  }),

};

export const NotFound = () => {
  return (
    <Page>
      <h1>{pageTitle}</h1>
      <h4>{pageSubTitle}</h4>
      <p>{errorDescription}</p>
      <h4>{howToContinueHeading}</h4>
      <ul>
        <li>{stepsUserCanTake.one}</li>
        <li><Link to='/contact'>{stepsUserCanTake.two}</Link></li>
        <li>{stepsUserCanTake.three_one} <Link to='/'>{stepsUserCanTake.three_two}</Link></li>
      </ul>
    </Page>
  );
};
