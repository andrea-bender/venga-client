import React from 'react';

const ClimbsContext = React.createContext({
  climbs: [],
  addClimb: () => {},
  deleteClimb: () => {},
  updateClimb: () => {},
  editClimb: () => {}
});

export default ClimbsContext;