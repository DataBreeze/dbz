import React from 'react';
import Image from './Image';

class ListRec extends React.Component {
  constructor(props) {
    super(props);
    this.rowClick = this.rowClick.bind(this);
  }
  rowClick(e) {
    e.preventDefault();
    const id = this.props.record.id;
    if (id) {
      const url = `/${this.props.params.source}/${id}`;
      this.context.router.push(url);
    }
    return false;
  }
  render() {
    const r = this.props.record;
    const source = this.props.params.source;
    const cfg = this.props.csCfg;
    let col1 = <div />;
    if (source === 'photo') {
      col1 = <Image cfg={this.props.cfg} source={source} className="list auto" size="_thumb1" ext=".png" record={r} />;
    } else {
      col1 = <i className={cfg.iconClass} />;
    }
    return (
      <tr key={r.id} onClick={this.rowClick}>
        <td>
          {col1}
        </td>
        <td>
          {r.dateCreate}
        </td>
        <td>
          {r.username}
        </td>
        <td>
          {r.title || ' '}
        </td>
        <td>
          {r.content ? r.content.substring(0, 20) : ' '}
        </td>
      </tr>
    );
  }
}

ListRec.propTypes = {
  record: React.PropTypes.object.isRequired,
  params: React.PropTypes.object.isRequired,
  csCfg: React.PropTypes.object.isRequired,
  cfg: React.PropTypes.object.isRequired,
};

ListRec.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default ListRec;
