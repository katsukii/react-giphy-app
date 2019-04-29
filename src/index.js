import React from "react";
import { render } from "react-dom";
import axios from "axios";

class App extends React.Component {
  constructor() {
    super();
    this.state = { gifUrlList: [] };
  }

  componentDidMount() {
    this.giphyApi();
  }

  renderImageList(list) {
    const imageList = list.map(url => {
      return (
        <li>
          <img src={url} />
        </li>
      );
    });
    return <ul>{imageList}</ul>;
  }

  render() {
    return <div>{this.renderImageList(this.state.gifUrlList)}</div>;
  }
  giphyApi() {
    const search = "cat";
    const key = "xyfK2JliY3njRYtDVlL7mnqSWM4Kb8Ap";
    const limit = 10;

    const url = `https://api.giphy.com/v1/gifs/search?q=${search}&api_key=${key}&limit=${limit}`;

    axios.get(url).then(res => {
      const data = res.data.data;
      const imageUrlList = data.map(item => item.images.downsized.url);
      this.setState({ gifUrlList: imageUrlList });
    });
  }
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
