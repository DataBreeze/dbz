import React from 'react';
import { Link } from 'react-router';
import { Panel } from 'react-bootstrap';
import DataAlert from './DataAlert';
import RecInfo from './RecInfo';
import EditField from './EditField';

export default class Edit extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = { title: '', content: '' };
    const r = props.record;
    if (r) {
      Object.keys(this.state).forEach((key) => { this.state[key] = r[key] || ''; return true; });
    }
    this.inputChange = this.inputChange.bind(this);
    this.editSubmit = this.editSubmit.bind(this);
    this.deleteClick = this.deleteClick.bind(this);
    this.clearMsg = this.clearMsg.bind(this);
  }
  componentWillReceiveProps(next) {
    const r = next.record;
    if (r) {
      Object.keys(this.state).forEach((key) => { this.setState({ key: r[key] || '' }); return true; });
    }
  }
  componentWillUnmount() {
    this.clearMsg();
  }
  clearMsg() {
    if (this.props.msg) {
      this.props.clearMsg();
    }
  }
  inputChange(e) {
    this.setState({ [e.target.name]: e.target.value, dirty: true });
    this.clearMsg();
  }
  editSubmit(e) {
    e.preventDefault();
    const r = this.props.record;
    const source = this.props.params.source;
    const p = { source, id: r.id };
    p.updates = { ...this.state };
    this.props.editSubmit(p);
    return false;
  }
  deleteClick() {
    this.props.deleteConfirm({ id: this.props.record.id, source: this.props.params.source });
  }
  render() {
    const url = `/${this.props.params.source}`;
    const r = this.props.record;
    const id = r.id;
    const buts = [];
    if (this.props.permitEdit) {
      buts.push(<a key="1" onClick={this.editSubmit} className="dbzBut"><i className="fa fa-floppy-o" />Save</a>);
      buts.push(<a key="2" onClick={this.deleteClick} className="dbzBut"><i className="fa fa-trash" />Delete</a>);
    }
    buts.push(<Link key="3" to={`${url}/${id}`} className="dbzBut"><i className="fa fa-ban" />Cancel</Link>);
    const header = <div className="detail head"><div className="pull-left">{r.title}</div><div className="pull-right">{buts}</div></div>;
    return (
      <Panel header={header} bsStyle="primary" className="mar10">
        <RecInfo record={r} />
        <form onSubmit={this.editSubmit} className="record">
          {this.props.msg && <DataAlert style={this.props.msgType || 'warning'} alertText={this.props.msg} />}
          <div className="panel-body">
            <EditField type="text" label="Title" value={this.state.title} name="title" id="title" inputChange={this.inputChange} />
            <EditField type="textarea" label="Content" value={this.state.content} name="content" id="content" placeholder="" inputChange={this.inputChange} />
            {this.props.children}
          </div>
        </form>
      </Panel>
    );
  }
}

Edit.displayName = 'Edit';

Edit.defaultProps = {
  msg: null,
  msgType: null,
  children: null,
};

Edit.propTypes = {
  children: React.PropTypes.element,
  record: React.PropTypes.object.isRequired,
  params: React.PropTypes.object.isRequired,
  editSubmit: React.PropTypes.func.isRequired,
  deleteConfirm: React.PropTypes.func.isRequired,
  msg: React.PropTypes.string,
  msgType: React.PropTypes.string,
  clearMsg: React.PropTypes.func.isRequired,
  permitEdit: React.PropTypes.bool.isRequired,
};
