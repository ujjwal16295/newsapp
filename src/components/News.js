import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';



export class News extends Component {
  static defaultProps={
    country:"in",
    pageSize:8,
    
  }
  static propTypes={
    country:PropTypes.string,
    pageSize:PropTypes.number
  }
  
  constructor(props){
    super(props);
    // this.nextPage = this.nextPage.bind(this);
    // this.backPage=this.backPage.bind(this);
    this.fetchmoredata=this.fetchmoredata.bind(this);
    this.state={
     articles:[],
     loading:true,
     page:1,
     total:0,
    }
    document.title=`NewsMonkey-${this.capitalizeFirstLetter( this.props.category)}`
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
  //  async newPage(params) {
  //   this.setState({page:params})
  //   let url="https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=675f6ff619ab43f2a3af282eb56ec7f6&page="+this.state.page
  //   let data= await fetch(url);
  //   let parsedData= await data.json();
  //   this.setState({articles:parsedData.articles})
  //   console.log(parsedData)
    
  // }
  async callUrl(page){
    this.props.setProgress(10)
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&pageSize=${this.props.pageSize}&page=${this.state.page+page}`
    this.setState({loading:true})
    let data= await fetch(url);
    this.props.setProgress(50)
    let parsedData= await data.json();
    this.props.setProgress(70)

    this.setState({articles:parsedData.articles,total:parsedData.totalResults, page:this.state.page+page})
    this.setState({loading:false})
    this.props.setProgress(100)


    console.log(parsedData)

  }
  // async nextPage(){
  //   this.callUrl(1)
  // }
  // async backPage(){
  //   this.callUrl(-1)
  // }


  async componentDidMount(){
   this.callUrl(0)
  }

  async fetchmoredata(){
    this.setState({page:this.state.page+1})
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&pageSize=${this.props.pageSize}&page=${this.state.page}`
    let data= await fetch(url);
    let parsedData= await data.json();
    this.setState({articles:this.state.articles.concat(  parsedData.articles),total:parsedData.totalResults, page:this.state.page})

  }

  render() {
    return (
      <>
      <h1 className="text-center">NewsMonkey-{this.capitalizeFirstLetter( this.props.category)}</h1>
      {/* {this.state.loading?<Spinner/>:   <div className="row">
      {this.state.articles.map((element)=>{
        return   <div key={element.url} className="col-md-4">      
        <Newsitem titlefornews={element.title===null?"no title":element.title.slice(0,25)+"..."} desc={element.description===null?"no description":element.description.slice(0,45)+"..."} imageurl={element.urlToImage===null?"https://images.hindustantimes.com/tech/img/2023/07/19/1600x900/onur-binay-uk5FrhKtr7E-unsplash_1689743854483_1689743864761.jpg":element.urlToImage} newsurl={element.url} date={element.publishedAt} author={element.author===null?"author":element.author} source={element.source.name}/>
        </div>
      })}
      
  
      </div>} */}
      {this.state.loading?<Spinner/>:  <InfiniteScroll
      dataLength={this.state.articles.length}
      next={this.fetchmoredata}
      hasMore={this.state.articles.length!==this.state.total}
      loader={<Spinner/>}
  >
      <div className="container">
      <div className="row">
      {this.state.articles.map((element)=>{
        return   <div key={element.url} className="col-md-4">      
        <Newsitem titlefornews={element.title===null?"no title":element.title.slice(0,25)+"..."} desc={element.description===null?"no description":element.description.slice(0,45)+"..."} imageurl={element.urlToImage===null?"https://images.hindustantimes.com/tech/img/2023/07/19/1600x900/onur-binay-uk5FrhKtr7E-unsplash_1689743854483_1689743864761.jpg":element.urlToImage} newsurl={element.url} date={element.publishedAt} author={element.author===null?"author":element.author} source={element.source.name}/>
        </div>
      })}
      </div>
      </div>
      </InfiniteScroll> }
     
      

   
    
     {/* <div className="container d-flex justify-content-between">
      <button  disabled={this.state.page<=1} className="btn btn-primary" onClick={this.backPage}>
           &larr; back
      </button>
      <button disabled={this.state.page+1>Math.ceil(this.state.total/20)} className="btn btn-dark " onClick={this.nextPage} >
            next  &rarr;
      </button>
     </div> */}
      
      </>
    )
  }
}

export default News