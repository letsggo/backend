import Candidate from './Candidates.js';
import MyPlaceListMapping from './MyPlaceListMapping.js';
import Location from './Location.js';
// import Travel from './Travel.js';
// import User from './User.js';
// import List from './List.js';
import Vote from './vote.js';

// 모델 간의 관계 설정
Candidate.belongsTo(Location, { foreignKey: 'location_id' });
// Candidate.belongsTo(Travel, { foreignKey: 'travel_id' });
// Candidate.belongsTo(User, { foreignKey: 'user_id' });
// Candidate.belongsTo(List, { foreignKey: 'list_id' });

MyPlaceListMapping.belongsTo(Candidate, { foreignKey: 'list_id' });
MyPlaceListMapping.belongsTo(Candidate, { foreignKey: 'user_id' });

Vote.belongsTo(Candidate, { foreignKey: 'candidate_id' });
Candidate.hasMany(Vote, { foreignKey: 'candidate_id' });
