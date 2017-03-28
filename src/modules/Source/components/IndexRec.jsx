import React from 'react';
import { Panel, Well } from 'react-bootstrap';
import Image from './Image';
import RecInfo from './RecInfo';

export default class IndexRec extends React.Component {
  constructor(props) {
    super(props);
    this.panelClick = this.panelClick.bind(this);
  }
  panelClick(e) {
    let source = this.props.params.source;
    let key = this.props.record.id;
    const userSource = e.target.getAttribute('name');
    if (userSource && (userSource === 'user')) {
      source = 'user';
      key = this.props.record.userId;
    }
    e.preventDefault();
    const url = `/${source}/${key}`;
    this.context.router.push(url);
    return false;
  }
  render() {
    const cfg = this.props.csCfg;
    const r = this.props.record || {};
    const source = this.props.params.source;
    let title = 'Untitled';
    if (r.id) {
      title = <span><i className={cfg.iconClass} />{r.title}</span>;
    }
    if (!r.content) {
      r.content = r.title;
    }
    const photos = [];
    if (source === 'photo') {
      photos.push(<Image key="1" cfg={this.props.cfg} source={source} className="thumb2 auto" size="_thumb2" ext=".png" record={r} />);
    } else if (r.photos && (r.photos.count > 0) && (r.photos.records.length > 0)) {
      r.photos.records.forEach((photo) => {
        photos.push(<Image key={photo.id} cfg={this.props.cfg} source={source} className="index auto" size="_thumb2" ext=".png" record={photo} />);
      });
    }
    return (
      <Panel key={r.id} header={title} bsStyle="primary" onClick={this.panelClick} className="pointer">
        <RecInfo record={r} />
        {r.content && <Well>{r.content.substr(0, 200)}</Well>}
        {(photos.length !== 0) && <div>{photos}</div>}
      </Panel>
    );
  }
}

IndexRec.propTypes = {
  record: React.PropTypes.object.isRequired,
  params: React.PropTypes.object.isRequired,
  csCfg: React.PropTypes.object.isRequired,
  cfg: React.PropTypes.object.isRequired,
};

IndexRec.defaultProps = {

};

IndexRec.contextTypes = {
  router: React.PropTypes.object.isRequired,
};
