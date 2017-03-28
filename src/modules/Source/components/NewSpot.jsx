import React from 'react';
import { Link } from 'react-router';
import { Panel } from 'react-bootstrap';
import DataAlert from './DataAlert';
import EditField from './EditField';

export default class NewSpot extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = { title: '', content: '' };
    if (props.default) {
      Object.keys(this.state).forEach((key) => { this.state[key] = props.default[key] || ''; return true; });
    }
    this.inputChange = this.inputChange.bind(this);
    this.newSubmit = this.newSubmit.bind(this);
    this.clearError = this.clearError.bind(this);
  }
  componentWillMount() {
    this.clearError();
  }
  inputChange(e) {
    this.setState({ [e.target.name]: e.target.value, dirty: true });
    this.clearError();
  }
  clearError() {
    if (this.props.error) {
      this.props.clearError();
    }
  }
  newSubmit(e) {
    e.preventDefault();
    const p = { source: this.props.params.source, updates: this.state };
    this.props.newSubmit(p);
    return false;
  }
  render() {
    const source = this.props.params.source;
    const url = `/${source}`;
    const title = `New ${this.props.csCfg.title}`;
    const buts = [];
    buts.push(<a href="/" key="1" onClick={this.newSubmit} className="dbzBut"><i className="fa fa-th-large" />Save</a>);
    buts.push(<Link key="2" to={url} className="dbzBut"><i className="fa fa-trash" />Cancel</Link>);
    const header = <div className="detail head"><div className="pull-left">{title}</div><div className="pull-right">{buts}</div></div>;
    return (
      <Panel header={header} bsStyle="primary" className="mar10">
        <form onSubmit={this.newSubmit} className="record">
          <div className="panel-body">
            {this.props.error && <DataAlert alertText={this.props.errorMsg} />}
            <EditField type="text" label="Spot Name" value={this.state.title} name="title" id="title" placeholder="Spot Name (required)" inputChange={this.inputChange} />
            <EditField type="text" label="City" value={this.state.city} name="city" id="city" placeholder="" inputChange={this.inputChange} />
            <EditField type="text" label="State" value={this.state.state} name="state" id="state" placeholder="" inputChange={this.inputChange} />
            <EditField type="textarea" label="Content" value={this.state.content} name="content" id="content" placeholder="Content (required)" inputChange={this.inputChange} />
          </div>
        </form>
      </Panel>
    );
  }
}

NewSpot.propTypes = {
  default: React.PropTypes.object,
  params: React.PropTypes.object.isRequired,
  newSubmit: React.PropTypes.func.isRequired,
  error: React.PropTypes.bool,
  csCfg: React.PropTypes.object.isRequired,
  errorMsg: React.PropTypes.string,
  clearError: React.PropTypes.func.isRequired,
};

NewSpot.defaultProps = {
  default: {},
  error: false,
  errorMsg: null,
};
