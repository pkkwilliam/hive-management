import React from 'react';
import './PrintableHiddenComponentWrapper.css';

export const AutoLineBreakWrapper = (props) => {
  const { children } = props;
  return children.map((child, index) =>
    index === children.length - 1 ? <>{child}</> : <LineBreakWrapper>{child}</LineBreakWrapper>,
  );
};

export const LineBreakWrapper = (props) => {
  return <div style={{ pageBreakAfter: 'always' }}>{props.children}</div>;
};

const PrintableHiddenComponentWrapper = React.forwardRef((props, ref) => {
  return (
    <div style={{ display: 'none', pageBreakAfter: 'always' }}>
      <div style={{ zoom: props?.zoom ?? 0.75 }} ref={ref}>
        {props.children}
      </div>
    </div>
  );
});

export default PrintableHiddenComponentWrapper;
