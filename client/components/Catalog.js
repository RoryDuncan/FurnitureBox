import React from 'react';
import ReactDOM from "react-dom";
import { Link, IndexLink } from 'react-router';
import firebase from './firebase.js';


// styling
import classnames from 'classnames/bind';
import s from './styles/Catalog.styl';
const cx = classnames.bind(s);

// subcomponents
import Collection from './Collection.js';

// todo: Shopping Cart component



// data
const collections = firebase.database().ref("collections");
// keep a reference top-level for now
let catalogData = null;

export class Catalog extends React.Component {
  
  constructor() {
    super();
    this.update = this.update.bind(this);
    let that = this;
    
    this.state = {
      dataReady: catalogData === null ? false : true,
      collections: catalogData
    };
  }
  
  update(data){
    catalogData = data.val();
    this.setState({
      'dataReady': true,
      'collections': catalogData
    });
  }
  
  componentWillMount() {
    collections.on("value", this.update);
  }
  
  componentWillUnmount () {
    collections.off("value", this.update);
  }
  
  render(){
    let contents = null;
    if (this.state.dataReady) {
      let collections = this.state.collections;
      let data = this.state.data;
      
      contents = Object.keys(collections).map((name, i) => {
        return (
          <Collection key={i} name={name} items={collections[name]} />
        )
      });
    } else {
      // using JSX may have some overhead, so default to null
      contents = <Loading />;
    }
    
    return (
      <div className={cx("catalog")}> {contents} </div>
    )
  }
}

const Loading = () => {
  return (
    <div className="catalog-loading">Loading</div>
  )
}

export class CollectionList extends React.Component {
  constructor(){
    super();
    this.update = this.update.bind(this);
    let that = this;
    
    this.state = {
      dataReady: catalogData === null ? false : true,
      collections: catalogData
    };
  }
  
  update(data){
    catalogData = data.val();
    this.setState({
      'dataReady': true,
      'collections': catalogData
    });
  }
  
  componentWillMount() {
    collections.on("value", this.update);
  }
  
  componentWillUnmount () {
    collections.off("value", this.update);
  }
  
  render(){
    console.log("render");
    let contents = null;
    if (this.state.dataReady) {
      let collections = this.state.collections;
      let data = this.state.data;
      
      if (Object.keys(collections).length === 0) {
        return <p> No collections yet, check back later! </p>
      }
      
      contents = Object.keys(collections).map((name, i) => {
        return (
          <div className={cx("collections-list-item")} key={i}>
            <h3>{name}</h3>
            <p>Description!</p>
          </div>
        )
      });
    } else {
      // using JSX may have some overhead, so default to null
      contents = <Loading />;
    }
    
    return (
      <div className={cx("catalog", "collections-list")}> {contents} </div>
    )
  }
}