import React from 'react';
import { Link } from 'react-router';
import { Panel } from 'react-bootstrap';
import FileUpload from './FileUpload';

class NewPhoto extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = { title: '', content: '', isMounted: false };
    this.inputChange = this.inputChange.bind(this);
    this.newSubmit = this.newSubmit.bind(this);
  }
  componentDidMount() {
    this.setState({ isMounted: true });
  }
  inputChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  newSubmit(e) {
    e.preventDefault();
    const s = this.state;
    const source = this.props.params.source;
    const p = { source, id: s.id };
    p.updates = { title: s.title, content: s.content, id: s.id };
    this.props.newSubmit(p);
    return false;
  }
  render() {
    const url = `/${this.props.params.source}`;
    const buts = [];
    buts.push(<Link key="3" to={url} className="dbzBut"><i className="fa fa-arrow-up" />Cancel</Link>);
    const header = <div className="detail head"><div className="pull-left">NewPhoto</div><div className="pull-right">{buts}</div></div>;
    return (
      <Panel header={header} bsStyle="primary" className="mar10">
        <form onSubmit={this.newSubmit} className="record">
          <div className="panel-body">
            {this.state.isMounted && <FileUpload {...this.props} title={this.state.title} content={this.state.content} multiple={false} autoUpload message="Drop File or click here to upload" />}
            <div className="form-group">
              <input type="text" className="form-control" id="title" aria-describedby="title" placeholder="Photo Title" name="title" value={this.state.title} onChange={this.inputChange} />
            </div>
            <div className="form-group">
              <textarea className="form-control" id="content" rows="2" name="content" value={this.state.content} onChange={this.inputChange} placeholder="Photo Detail" />
            </div>
          </div>
        </form>
      </Panel>
    );
  }
}

NewPhoto.defaultProps = {
  children: null,
};

NewPhoto.propTypes = {
  params: React.PropTypes.object.isRequired,
  newSubmit: React.PropTypes.func.isRequired,
};

export default NewPhoto;
