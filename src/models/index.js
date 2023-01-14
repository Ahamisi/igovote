// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { States, Wards, Lgas, UserProfile, PresidentialCandidate, Parties } = initSchema(schema);

export {
  States,
  Wards,
  Lgas,
  UserProfile,
  PresidentialCandidate,
  Parties
};