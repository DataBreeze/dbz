import React from 'react';
import { Well } from 'react-bootstrap';
import Image from './Image';

class DetailBodyPhoto extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = { isMounted: false };
  }
  componentDidMount() {
    this.setState({ isMounted: true });
  }
  render() {
    const source = this.props.params.source;
    const r = this.props.record;
    return (
      <div className="detail body">
        {r.content && <Well>{r.content}</Well>}
        <div>
          <Image cfg={this.props.cfg} source={source} className={'detail auto'} size={'_large'} record={r} />
        </div>
      </div>
    );
  }
}
DetailBodyPhoto.propTypes = {
  record: React.PropTypes.object.isRequired,
  params: React.PropTypes.object.isRequired,
  cfg: React.PropTypes.object.isRequired,
};

export default DetailBodyPhoto;
