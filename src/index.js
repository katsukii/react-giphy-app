import React from "react";
import { render } from "react-dom";
import axios from "axios";
import Search from "./components/Search";
import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = { gifUrlList: [] };
  }

  renderImageList(list) {
    const imageList = list.map(url => {
      return (
        <li className="item">
          <img className="image" src={url} />
        </li>
      );
    });
    return <ul className="list">{imageList}</ul>;
  }

  render() {
    return (
      <div>
        <Search search={this.giphyApi} />
        {this.renderImageList(this.state.gifUrlList)}
      </div>
    );
  }
  giphyApi = target => {
    const search = target;
    const key = "xyfK2JliY3njRYtDVlL7mnqSWM4Kb8Ap";
    const limit = 20;

    const url = `https://api.giphy.com/v1/gifs/search?q=${search}&api_key=${key}&limit=${limit}`;

    axios.get(url).then(res => {
      const data = res.data.data;
      const imageUrlList = data.map(item => item.images.downsized.url);
      this.setState({ gifUrlList: imageUrlList });
    });
  };
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
