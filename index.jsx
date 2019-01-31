(function(){

  'use strict';

  const ElementContext = React.createContext();

  class Header extends React.Component {
    render() {
      const { children } = this.props;
      const { element } = this.context;

      const { header } = element;

      return ReactDOM.createPortal(
        <div>
          {children || <HeaderA />}
        </div>,
        header
      );
    }
  }

  Header.contextType = ElementContext;

  class HeaderA extends React.Component {
    render() {
      return <div>HeaderA</div>
    }
  }

  class HeaderB extends React.Component {
    render() {
      return <div>HeaderB</div>
    }
  }

  class App extends React.Component {
    constructor(props) {
      super(props);

      this.handleClick = () => {
        const { isFlag } = this.state;

        this.setState({ isFlag: !isFlag });
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

      return (
        <div className="app">
          <ElementContext.Provider value={this.elementContext}>
            {
              isFlag ? (
                <Header>
                  <HeaderB />
                </Header>
              ) : <Header/>
            }
          </ElementContext.Provider>
          <button
            className="button"
            onClick={this.handleClick}
          >change header</button>
        </div>
      );
    }
  }

  ReactDOM.render(<App />, document.getElementById('js-react-root'));

}());
