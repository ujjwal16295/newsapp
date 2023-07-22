 import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export class Newsitem extends Component {


  render() {
    let {titlefornews,desc,imageurl,newsurl,author,date,source}=this.props;
    return (
      <div className='container my-3 mx-6'>
      <div className="card" style={{width: "18rem"}}>
  <img src={imageurl} class="card-img-top" alt="imageurl"/>
  <div className="card-body">
  <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
   {source}
  </span>
    <h5 className="card-title">{titlefornews}</h5>
    <p className="card-text">{desc}.</p>
    <p className="card-text"><small className="text-muted">{author} on {new Date(date).toUTCString()}</small></p>
    <Link to={newsurl} target='_blank' className="btn btn-primary">read more</Link>
  </div>
</div>
      </div>
    )
  }
}

export default Newsitem