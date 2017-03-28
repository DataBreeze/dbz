import React from 'react';
import { Link } from 'react-router';
import { Panel } from 'react-bootstrap';
import DataAlert from './DataAlert';
import RecInfo from './RecInfo';
import PanelHeader from './PanelHeader';

export default class Detail extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = { isMounted: false };
    this.clearMsg = this.clearMsg.bind(this);
  }
  componentDidMount() {
    this.setState({ isMounted: true });
  }
  clearMsg() {
    if (this.props.msg) {
      this.props.clearMsg();
    }
  }
  render() {
    const source = this.props.params.source;
    const r = this.props.record;
    const url = `/${source}`;
    const buts = [];
    if (this.props.permitEdit) {
      buts.push(<Link key="1" to={`${url}/e/${r.id}`} className="dbzBut"><i className="fa fa-pencil" />Edit</Link>);
    }
    buts.push(<Link key="2" to={url} className="dbzBut"><i className="fa fa-ban" />Cancel</Link>);
    const header = <PanelHeader title={r.title} buttons={buts} />;
    return (
      <Panel key={r.id} header={header} bsStyle="primary" onClick={this.panelClick} className="mar10">
        <RecInfo record={r} />
        {this.props.msg && <DataAlert style={this.props.msgType || 'warning'} alertText={this.props.msg} />}
        {this.props.children}
      </Panel>
    );
  }
}

Detail.propTypes = {
  record: React.PropTypes.object.isRequired,
  params: React.PropTypes.object.isRequired,
  clearMsg: React.PropTypes.func.isRequired,
  msg: React.PropTypes.string,
  msgType: React.PropTypes.string,
  permitEdit: React.PropTypes.bool.isRequired,
  children: React.PropTypes.element,
};

Detail.defaultProps = {
  msg: null,
  msgType: null,
  children: null,
};
