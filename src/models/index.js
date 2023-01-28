// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { LiveReports, ElectionMonitor, UserProfile, Parties } = initSchema(schema);

export {
  LiveReports,
  ElectionMonitor,
  UserProfile,
  Parties
};