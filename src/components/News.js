import React, { Component } from 'react'
import NewItem from './NewItem'
import Spin from './Spin';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultlProps = {
    country : 'in',
    pageSize : '6',
    category: 'General'
  }
  static propTypes = {
    country : PropTypes.string ,
    pageSize : PropTypes.number,
    category: PropTypes.string,
  }

  capitalizesedFristLetter =(string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  constructor(props){
    super(props);
    // console.log(" Hello I am a contructor from news component");
    this.state = {
      articles: [],
      loading: true,
      page : 1,
      totalResults : 0
    }
     document.title=`${this.capitalizesedFristLetter(this.props.category)} - NewsMonkey`
  }
  async updateNews(){
    this.props.setProgress(10)
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    this.props.setProgress(40)
    let parsedData = await data.json();
    this.props.setProgress(70)
    this.setState({articles:parsedData.articles, 
                  totalResults : parsedData.totalResults,
                  loading : false
    })
    this.props.setProgress(100)
  }
  async componentDidMount(){
    // console.log("cmd");
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=57bcf1bc62564117b7e096aa9c3feb33&page=1&pageSize=${this.props.pageSize}`;
    // this.setState({loading:true});
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // console.log(parsedData);
    // this.setState({articles:parsedData.articles, 
    //               totalResults : parsedData.totalResults,
    //               loading : false
    // })
    this.updateNews();

  }
  handlePrevClick =async()=>{
        // console.log("prev");
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=57bcf1bc62564117b7e096aa9c3feb33&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        // this.setState({loading:true});
        // let data = await fetch(url);
        // let parsedData = await data.json();
        // // console.log(parsedData);
        // this.setState({
        //   articles:parsedData.articles,
        //   page : this.state.page - 1,
        //   loading : false
        // })
        this.setState({page:this.state.page - 1})
        this.updateNews();
  }
  handleNextClick =async()=>{
    // if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){

    //   console.log("next");
    //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=57bcf1bc62564117b7e096aa9c3feb33&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    //   this.setState({loading:true});
    //   let data = await fetch(url);
    //   let parsedData = await data.json();
    //   console.log(parsedData);
    //   this.setState({
    //     articles:parsedData.articles,
    //     page : this.state.page + 1,
    //     loading : false
    //   })
    // }
    this.setState({page:this.state.page + 1})
        this.updateNews();
  }

  fetchMoreData = async() => {
    this.setState({page:this.state.page +1})
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({articles:this.state.articles.concat(parsedData.articles), 
                  totalResults : parsedData.totalResults,
                
    })

  };

  render() {
    console.log("render");
    return (
      <>
        <h1 className='text-center'>NewsMonkey - Top Headlines from {this.capitalizesedFristLetter(this.props.category)}</h1>
         {this.state.loading && <Spin/>} 
        
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !==this.state.totalResults}
          loader={<Spin/>}
        >
          <div className="container">
           <div className="row">
        { this.state.articles.map((element)=>{
            return <div className="col-md-4" key={element.url}>
            <NewItem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
            </div>
        })}
         </div>
         </div>
         </InfiniteScroll>

      </>
    )
  }
}

export default News
