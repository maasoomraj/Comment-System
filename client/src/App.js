import React, { Component } from 'react'
import replyImg from './assets/reply.png'
import profileImg from './assets/profile.png'
import './App.css'
const axios = require('axios')


export default class App extends Component {
  constructor () {
    super()
    this.state = {
      name : "",
      comments : [],
      searchedComments : [],
      isSearch : false,
      newComment : "",
      search : "",
      searchedFor : ""
    }
  }

  // Get all the comments from the database
  componentDidMount = async () => {
    await axios.get('/view-comments').then(res => {
      this.setState({ comments : res.data.comments })
    })
  }

  // Add a new thread or reply to existing thread
  addComment = async (comment, replyTo) => {
    await axios.post('/add-comment', {
      name : this.state.name || "Anonymous",
      comment : comment,
      replyTo : replyTo
    }).then((res) => {
      this.setState({
        newComment : "",
        comments : [...this.state.comments, res.data.comment]
      })
    })
  }

  // Search for a keyword in all comments
  search = async (search) => {
    await axios.post('/search-comment', {
      search : search
    }).then((res) => {
      let searchedComments = res.data.searches
      for(const comment of res.data.searches){
        if(comment.replyTo !== "All"){
          let thread = this.state.comments.find((msg) => msg._id === comment.replyTo)
          let found = searchedComments.find((msg) => msg._id === thread._id)
          if(!found){
            searchedComments.push(thread)
          }
        }
      }
      this.setState({
        search : "",
        searchedComments : searchedComments,
        searchedFor : search,
        isSearch : true
      })
    })
  }

  // Convert JS Date to "DD/MM - Time" Format
  timeInFormat = (date) => {
    return date.getDate() + '/' + date.getMonth() + ' - ' + date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
  }

  // List all comments in a thread
  threadComments = (comments) => {
    let commentArray
    commentArray = comments.map((comment) => {
      return (
        <div>
        <span class="time">{this.timeInFormat(new Date(comment.date))}</span><br />
        <div class="row">
            <div class="col-md-4">
                <img src={profileImg}  alt="profileicon" class="profileicon" />
            </div>           
            <div class="col-md-4">
                <span class="name">{comment.name}</span><br />
            </div>            
            <div class="col-md-4">
                <span class="comment">{comment.comment}</span><br />
            </div>
            </div>   
        </div>
      );
    })
    return commentArray
  }

  // List all threads
  thread = (allComments) => {
    let threadArray, reply
    if(allComments !== []){
      const threads = allComments.filter((comment) => comment.replyTo === "All")
      threadArray = threads.map((thread) => {
        const comments = allComments.filter((comment) => comment.replyTo === thread._id)
        return (
          <div class="commentbox">
          <span class="time">{this.timeInFormat(new Date(thread.date))}</span><br />
          <div class="row">
              <div class="col-md-4">
                  <img src={profileImg}  alt="profileicon" class="profileicon" />
              </div>           
              <div class="col-md-4">
                  <span class="name">{thread.name}</span><br />
              </div>            
              <div class="col-md-4">
                  <span class="comment">{thread.comment}</span><br />
              </div>
              </div>
              {this.threadComments(comments)}
          <div>
              <textarea
                type="text"
                class="txtarea"
                id="txt"
                rows="2"
                placeholder="Reply ..."
                value={reply}
                onChange={e => reply = e.target.value}
              />
              <img
                src={replyImg}
                alt="replyicon"
                class="replyicon"
                onClick={() => {
                  this.addComment(reply, thread._id)
                }}
              />
          </div>
          </div>
        );
      })
    }
    return threadArray
  }


  render() {
    return (
      <div>
        <h1 class="heading">Comment System : </h1>
        <form class="form-inline addname">
          <input
            class="form-control"
            type="text"
            placeholder="Add your name"
            aria-label="Search"
            value={this.state.name}
            onChange={e => this.setState({ name : e.target.value })}
          />
        </form>
        <textarea
          type="text"
          class="txtarea"
          id="txt"
          rows="2"
          placeholder="Add a new thread"
          value={this.state.newComment}
          onChange={e => this.setState({ newComment : e.target.value})}
        />
        <img
          src={replyImg}
          alt="replyicon"
          class="replyicon"
          onClick={() => this.addComment(this.state.newComment, "All")}
        />

        <div class="col-md-6 mb-4 search">
          <form class="form-inline">
            <input
              class="form-control"
              type="text"
              placeholder="Type a keyword"
              aria-label="Search"
              value={this.state.search}
              onChange={e => this.setState({ search : e.target.value})}
            />
            <button
              type="button"
              class="searchbtn"
              onClick={() => this.search(this.state.search)}
            >
              Search
            </button>
          </form>
        </div>

        {this.state.isSearch === true &&
        <div class="search-filter">
          <h4 class="searched-for">You searched for "{this.state.searchedFor}"</h4>
          <button
            type="button"
            class= "searchbtn"
            onClick={() => this.setState({ isSearch : false})}
          >
            Erase Filter
          </button>
        </div>}
        {this.state.isSearch === false && this.thread(this.state.comments)}
        {this.state.isSearch === true && this.thread(this.state.searchedComments)}
      </div>
    )
  }
}
