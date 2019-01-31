(function () {
  'use strict';

  const ElementContext = React.createContext();

  class Header extends React.Component {
    render() {
      const {
        children
      } = this.props;
      const {
        element
      } = this.context;
      const {
        header
      } = element;
      return ReactDOM.createPortal(React.createElement("div", null, children || React.createElement(HeaderA, null)), header);
    }

  }

  Header.contextType = ElementContext;

  class HeaderA extends React.Component {
    render() {
      return React.createElement("div", null, "HeaderA");
    }

  }

  class HeaderB extends React.Component {
    render() {
      return React.createElement("div", null, "HeaderB");
    }

  }

  class App extends React.Component {
    constructor(props) {
      super(props);

      this.handleClick = () => {
        const {
          isFlag
        } = this.state;
        this.setState({
          isFlag: !isFlag
        });
      };

      this.elementContext = {
        element: {
          header: document.getElementById('js-react-header')
        }
      };
      this.state = {
        isFlag: false
      };
    }

    render() {
      const {
        isFlag = false
      } = this.state;
      console.log(this._context);
      return React.createElement("div", {
        className: "app"
      }, React.createElement(ElementContext.Provider, {
        value: this.elementContext
      }, isFlag ? React.createElement(Header, null, React.createElement(HeaderB, null)) : React.createElement(Header, null)), React.createElement("button", {
        className: "button",
        onClick: this.handleClick
      }, "change header"));
    }

  }

  ReactDOM.render(React.createElement(App, null), document.getElementById('js-react-root'));
})();
