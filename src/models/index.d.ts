import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncItem } from "@aws-amplify/datastore";





type EagerStates = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<States, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyStates = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<States, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type States = LazyLoading extends LazyLoadingDisabled ? EagerStates : LazyStates

export declare const States: (new (init: ModelInit<States>) => States) & {
  copyOf(source: States, mutator: (draft: MutableModel<States>) => MutableModel<States> | void): States;
}

type EagerWards = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Wards, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly ward_id?: number | null;
  readonly abbreviation?: string | null;
  readonly lga_id?: number | null;
  readonly stateid?: number | null;
  readonly name?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyWards = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Wards, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly ward_id?: number | null;
  readonly abbreviation?: string | null;
  readonly lga_id?: number | null;
  readonly stateid?: number | null;
  readonly name?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Wards = LazyLoading extends LazyLoadingDisabled ? EagerWards : LazyWards

export declare const Wards: (new (init: ModelInit<Wards>) => Wards) & {
  copyOf(source: Wards, mutator: (draft: MutableModel<Wards>) => MutableModel<Wards> | void): Wards;
}

type EagerLgas = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Lgas, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly lga_id?: number | null;
  readonly lga?: string | null;
  readonly abbreviation?: string | null;
  readonly state_id?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyLgas = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Lgas, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly lga_id?: number | null;
  readonly lga?: string | null;
  readonly abbreviation?: string | null;
  readonly state_id?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Lgas = LazyLoading extends LazyLoadingDisabled ? EagerLgas : LazyLgas

export declare const Lgas: (new (init: ModelInit<Lgas>) => Lgas) & {
  copyOf(source: Lgas, mutator: (draft: MutableModel<Lgas>) => MutableModel<Lgas> | void): Lgas;
}

type EagerUserProfile = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UserProfile, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly gender?: string | null;
  readonly lga?: string | null;
  readonly ward?: string | null;
  readonly polling_unit?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUserProfile = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UserProfile, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly gender?: string | null;
  readonly lga?: string | null;
  readonly ward?: string | null;
  readonly polling_unit?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type UserProfile = LazyLoading extends LazyLoadingDisabled ? EagerUserProfile : LazyUserProfile

export declare const UserProfile: (new (init: ModelInit<UserProfile>) => UserProfile) & {
  copyOf(source: UserProfile, mutator: (draft: MutableModel<UserProfile>) => MutableModel<UserProfile> | void): UserProfile;
}

type EagerPresidentialCandidate = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<PresidentialCandidate, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly candidate_name?: string | null;
  readonly Parties?: Parties | null;
  readonly pwd?: string | null;
  readonly age?: string | null;
  readonly gender?: string | null;
  readonly qualifications?: string | null;
  readonly image?: string | null;
  readonly remarks?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly presidentialCandidatePartiesId?: string | null;
}

type LazyPresidentialCandidate = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<PresidentialCandidate, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly candidate_name?: string | null;
  readonly Parties: AsyncItem<Parties | undefined>;
  readonly pwd?: string | null;
  readonly age?: string | null;
  readonly gender?: string | null;
  readonly qualifications?: string | null;
  readonly image?: string | null;
  readonly remarks?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly presidentialCandidatePartiesId?: string | null;
}

export declare type PresidentialCandidate = LazyLoading extends LazyLoadingDisabled ? EagerPresidentialCandidate : LazyPresidentialCandidate

export declare const PresidentialCandidate: (new (init: ModelInit<PresidentialCandidate>) => PresidentialCandidate) & {
  copyOf(source: PresidentialCandidate, mutator: (draft: MutableModel<PresidentialCandidate>) => MutableModel<PresidentialCandidate> | void): PresidentialCandidate;
}

type EagerParties = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Parties, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly abbreviation?: string | null;
  readonly logo?: string | null;
  readonly slug?: string | null;
  readonly url?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyParties = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Parties, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly abbreviation?: string | null;
  readonly logo?: string | null;
  readonly slug?: string | null;
  readonly url?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Parties = LazyLoading extends LazyLoadingDisabled ? EagerParties : LazyParties

export declare const Parties: (new (init: ModelInit<Parties>) => Parties) & {
  copyOf(source: Parties, mutator: (draft: MutableModel<Parties>) => MutableModel<Parties> | void): Parties;
}