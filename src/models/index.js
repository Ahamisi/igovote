// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { EMHoa, EMHor, EMSenatorial, EMGovernorship, EMPresidential, ElectionPosts, ElectionMonitor, LiveReports, ReportToUser, UserProfile, Parties } = initSchema(schema);

export {
  EMHoa,
  EMHor,
  EMSenatorial,
  EMGovernorship,
  EMPresidential,
  ElectionPosts,
  ElectionMonitor,
  LiveReports,
  ReportToUser,
  UserProfile,
  Parties
};