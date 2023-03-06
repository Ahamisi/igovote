import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerEMHoa = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<EMHoa, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly user?: string | null;
  readonly polling_unit?: string | null;
  readonly election_type?: string | null;
  readonly votes_a?: string | null;
  readonly votes_aa?: string | null;
  readonly votes_aac?: string | null;
  readonly votes_adc?: string | null;
  readonly votes_adp?: string | null;
  readonly votes_apc?: string | null;
  readonly votes_apga?: string | null;
  readonly votes_apm?: string | null;
  readonly votes_app?: string | null;
  readonly votes_bp?: string | null;
  readonly votes_lp?: string | null;
  readonly votes_nnpp?: string | null;
  readonly votes_nrm?: string | null;
  readonly votes_pdp?: string | null;
  readonly votes_prp?: string | null;
  readonly votes_sdp?: string | null;
  readonly votes_ypp?: string | null;
  readonly votes_zlp?: string | null;
  readonly copy_of_results?: string | null;
  readonly state_id?: string | null;
  readonly lga_id?: string | null;
  readonly ward_id?: string | null;
  readonly lga_unique?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyEMHoa = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<EMHoa, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly user?: string | null;
  readonly polling_unit?: string | null;
  readonly election_type?: string | null;
  readonly votes_a?: string | null;
  readonly votes_aa?: string | null;
  readonly votes_aac?: string | null;
  readonly votes_adc?: string | null;
  readonly votes_adp?: string | null;
  readonly votes_apc?: string | null;
  readonly votes_apga?: string | null;
  readonly votes_apm?: string | null;
  readonly votes_app?: string | null;
  readonly votes_bp?: string | null;
  readonly votes_lp?: string | null;
  readonly votes_nnpp?: string | null;
  readonly votes_nrm?: string | null;
  readonly votes_pdp?: string | null;
  readonly votes_prp?: string | null;
  readonly votes_sdp?: string | null;
  readonly votes_ypp?: string | null;
  readonly votes_zlp?: string | null;
  readonly copy_of_results?: string | null;
  readonly state_id?: string | null;
  readonly lga_id?: string | null;
  readonly ward_id?: string | null;
  readonly lga_unique?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type EMHoa = LazyLoading extends LazyLoadingDisabled ? EagerEMHoa : LazyEMHoa

export declare const EMHoa: (new (init: ModelInit<EMHoa>) => EMHoa) & {
  copyOf(source: EMHoa, mutator: (draft: MutableModel<EMHoa>) => MutableModel<EMHoa> | void): EMHoa;
}

type EagerEMHor = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<EMHor, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly user?: string | null;
  readonly polling_unit?: string | null;
  readonly election_type?: string | null;
  readonly votes_a?: string | null;
  readonly votes_aa?: string | null;
  readonly votes_aac?: string | null;
  readonly votes_adc?: string | null;
  readonly votes_adp?: string | null;
  readonly votes_apc?: string | null;
  readonly votes_apga?: string | null;
  readonly votes_apm?: string | null;
  readonly votes_app?: string | null;
  readonly votes_bp?: string | null;
  readonly votes_lp?: string | null;
  readonly votes_nnpp?: string | null;
  readonly votes_nrm?: string | null;
  readonly votes_pdp?: string | null;
  readonly votes_prp?: string | null;
  readonly votes_sdp?: string | null;
  readonly votes_ypp?: string | null;
  readonly votes_zlp?: string | null;
  readonly copy_of_results?: string | null;
  readonly state_id?: string | null;
  readonly lga_id?: string | null;
  readonly ward_id?: string | null;
  readonly lga_unique?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyEMHor = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<EMHor, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly user?: string | null;
  readonly polling_unit?: string | null;
  readonly election_type?: string | null;
  readonly votes_a?: string | null;
  readonly votes_aa?: string | null;
  readonly votes_aac?: string | null;
  readonly votes_adc?: string | null;
  readonly votes_adp?: string | null;
  readonly votes_apc?: string | null;
  readonly votes_apga?: string | null;
  readonly votes_apm?: string | null;
  readonly votes_app?: string | null;
  readonly votes_bp?: string | null;
  readonly votes_lp?: string | null;
  readonly votes_nnpp?: string | null;
  readonly votes_nrm?: string | null;
  readonly votes_pdp?: string | null;
  readonly votes_prp?: string | null;
  readonly votes_sdp?: string | null;
  readonly votes_ypp?: string | null;
  readonly votes_zlp?: string | null;
  readonly copy_of_results?: string | null;
  readonly state_id?: string | null;
  readonly lga_id?: string | null;
  readonly ward_id?: string | null;
  readonly lga_unique?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type EMHor = LazyLoading extends LazyLoadingDisabled ? EagerEMHor : LazyEMHor

export declare const EMHor: (new (init: ModelInit<EMHor>) => EMHor) & {
  copyOf(source: EMHor, mutator: (draft: MutableModel<EMHor>) => MutableModel<EMHor> | void): EMHor;
}

type EagerEMSenatorial = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<EMSenatorial, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly user?: string | null;
  readonly polling_unit?: string | null;
  readonly election_type?: string | null;
  readonly votes_a?: string | null;
  readonly votes_aa?: string | null;
  readonly votes_aac?: string | null;
  readonly votes_adc?: string | null;
  readonly votes_adp?: string | null;
  readonly votes_apc?: string | null;
  readonly votes_apga?: string | null;
  readonly votes_apm?: string | null;
  readonly votes_app?: string | null;
  readonly votes_bp?: string | null;
  readonly votes_lp?: string | null;
  readonly votes_nnpp?: string | null;
  readonly votes_nrm?: string | null;
  readonly votes_pdp?: string | null;
  readonly votes_prp?: string | null;
  readonly votes_sdp?: string | null;
  readonly votes_ypp?: string | null;
  readonly votes_zlp?: string | null;
  readonly copy_of_results?: string | null;
  readonly state_id?: string | null;
  readonly lga_id?: string | null;
  readonly ward_id?: string | null;
  readonly lga_unique?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyEMSenatorial = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<EMSenatorial, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly user?: string | null;
  readonly polling_unit?: string | null;
  readonly election_type?: string | null;
  readonly votes_a?: string | null;
  readonly votes_aa?: string | null;
  readonly votes_aac?: string | null;
  readonly votes_adc?: string | null;
  readonly votes_adp?: string | null;
  readonly votes_apc?: string | null;
  readonly votes_apga?: string | null;
  readonly votes_apm?: string | null;
  readonly votes_app?: string | null;
  readonly votes_bp?: string | null;
  readonly votes_lp?: string | null;
  readonly votes_nnpp?: string | null;
  readonly votes_nrm?: string | null;
  readonly votes_pdp?: string | null;
  readonly votes_prp?: string | null;
  readonly votes_sdp?: string | null;
  readonly votes_ypp?: string | null;
  readonly votes_zlp?: string | null;
  readonly copy_of_results?: string | null;
  readonly state_id?: string | null;
  readonly lga_id?: string | null;
  readonly ward_id?: string | null;
  readonly lga_unique?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type EMSenatorial = LazyLoading extends LazyLoadingDisabled ? EagerEMSenatorial : LazyEMSenatorial

export declare const EMSenatorial: (new (init: ModelInit<EMSenatorial>) => EMSenatorial) & {
  copyOf(source: EMSenatorial, mutator: (draft: MutableModel<EMSenatorial>) => MutableModel<EMSenatorial> | void): EMSenatorial;
}

type EagerEMGovernorship = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<EMGovernorship, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly user?: string | null;
  readonly polling_unit?: string | null;
  readonly election_type?: string | null;
  readonly votes_a?: string | null;
  readonly votes_aa?: string | null;
  readonly votes_aac?: string | null;
  readonly votes_adc?: string | null;
  readonly votes_adp?: string | null;
  readonly votes_apc?: string | null;
  readonly votes_apga?: string | null;
  readonly votes_apm?: string | null;
  readonly votes_app?: string | null;
  readonly votes_bp?: string | null;
  readonly votes_lp?: string | null;
  readonly votes_nnpp?: string | null;
  readonly votes_nrm?: string | null;
  readonly votes_pdp?: string | null;
  readonly votes_prp?: string | null;
  readonly votes_sdp?: string | null;
  readonly votes_ypp?: string | null;
  readonly votes_zlp?: string | null;
  readonly copy_of_results?: string | null;
  readonly state_id?: string | null;
  readonly lga_id?: string | null;
  readonly ward_id?: string | null;
  readonly lga_unique?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyEMGovernorship = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<EMGovernorship, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly user?: string | null;
  readonly polling_unit?: string | null;
  readonly election_type?: string | null;
  readonly votes_a?: string | null;
  readonly votes_aa?: string | null;
  readonly votes_aac?: string | null;
  readonly votes_adc?: string | null;
  readonly votes_adp?: string | null;
  readonly votes_apc?: string | null;
  readonly votes_apga?: string | null;
  readonly votes_apm?: string | null;
  readonly votes_app?: string | null;
  readonly votes_bp?: string | null;
  readonly votes_lp?: string | null;
  readonly votes_nnpp?: string | null;
  readonly votes_nrm?: string | null;
  readonly votes_pdp?: string | null;
  readonly votes_prp?: string | null;
  readonly votes_sdp?: string | null;
  readonly votes_ypp?: string | null;
  readonly votes_zlp?: string | null;
  readonly copy_of_results?: string | null;
  readonly state_id?: string | null;
  readonly lga_id?: string | null;
  readonly ward_id?: string | null;
  readonly lga_unique?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type EMGovernorship = LazyLoading extends LazyLoadingDisabled ? EagerEMGovernorship : LazyEMGovernorship

export declare const EMGovernorship: (new (init: ModelInit<EMGovernorship>) => EMGovernorship) & {
  copyOf(source: EMGovernorship, mutator: (draft: MutableModel<EMGovernorship>) => MutableModel<EMGovernorship> | void): EMGovernorship;
}

type EagerEMPresidential = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<EMPresidential, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly user?: string | null;
  readonly polling_unit?: string | null;
  readonly election_type?: string | null;
  readonly votes_a?: string | null;
  readonly votes_aa?: string | null;
  readonly votes_aac?: string | null;
  readonly votes_adc?: string | null;
  readonly votes_apc?: string | null;
  readonly votes_apga?: string | null;
  readonly votes_apm?: string | null;
  readonly votes_app?: string | null;
  readonly votes_bp?: string | null;
  readonly votes_lp?: string | null;
  readonly votes_nnpp?: string | null;
  readonly votes_nrm?: string | null;
  readonly votes_pdp?: string | null;
  readonly votes_prp?: string | null;
  readonly votes_sdp?: string | null;
  readonly votes_ypp?: string | null;
  readonly votes_zlp?: string | null;
  readonly copy_of_results?: string | null;
  readonly state_id?: string | null;
  readonly lga_id?: string | null;
  readonly ward_id?: string | null;
  readonly lga_unique?: string | null;
  readonly votes_adp?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyEMPresidential = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<EMPresidential, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly user?: string | null;
  readonly polling_unit?: string | null;
  readonly election_type?: string | null;
  readonly votes_a?: string | null;
  readonly votes_aa?: string | null;
  readonly votes_aac?: string | null;
  readonly votes_adc?: string | null;
  readonly votes_apc?: string | null;
  readonly votes_apga?: string | null;
  readonly votes_apm?: string | null;
  readonly votes_app?: string | null;
  readonly votes_bp?: string | null;
  readonly votes_lp?: string | null;
  readonly votes_nnpp?: string | null;
  readonly votes_nrm?: string | null;
  readonly votes_pdp?: string | null;
  readonly votes_prp?: string | null;
  readonly votes_sdp?: string | null;
  readonly votes_ypp?: string | null;
  readonly votes_zlp?: string | null;
  readonly copy_of_results?: string | null;
  readonly state_id?: string | null;
  readonly lga_id?: string | null;
  readonly ward_id?: string | null;
  readonly lga_unique?: string | null;
  readonly votes_adp?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type EMPresidential = LazyLoading extends LazyLoadingDisabled ? EagerEMPresidential : LazyEMPresidential

export declare const EMPresidential: (new (init: ModelInit<EMPresidential>) => EMPresidential) & {
  copyOf(source: EMPresidential, mutator: (draft: MutableModel<EMPresidential>) => MutableModel<EMPresidential> | void): EMPresidential;
}

type EagerElectionPosts = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ElectionPosts, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly user?: string | null;
  readonly polling_unit?: string | null;
  readonly lga?: string | null;
  readonly type?: string | null;
  readonly resource_url?: string | null;
  readonly flagged?: number | null;
  readonly endorsed?: number | null;
  readonly status?: string | null;
  readonly date_created?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyElectionPosts = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ElectionPosts, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly user?: string | null;
  readonly polling_unit?: string | null;
  readonly lga?: string | null;
  readonly type?: string | null;
  readonly resource_url?: string | null;
  readonly flagged?: number | null;
  readonly endorsed?: number | null;
  readonly status?: string | null;
  readonly date_created?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type ElectionPosts = LazyLoading extends LazyLoadingDisabled ? EagerElectionPosts : LazyElectionPosts

export declare const ElectionPosts: (new (init: ModelInit<ElectionPosts>) => ElectionPosts) & {
  copyOf(source: ElectionPosts, mutator: (draft: MutableModel<ElectionPosts>) => MutableModel<ElectionPosts> | void): ElectionPosts;
}

type EagerElectionMonitor = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ElectionMonitor, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly user?: string | null;
  readonly polling_unit?: string | null;
  readonly election_type?: string | null;
  readonly votes_a?: string | null;
  readonly votes_aa?: string | null;
  readonly votes_aac?: string | null;
  readonly votes_adc?: string | null;
  readonly votes_adp?: string | null;
  readonly votes_apc?: string | null;
  readonly votes_apga?: string | null;
  readonly votes_apm?: string | null;
  readonly votes_app?: string | null;
  readonly votes_bp?: string | null;
  readonly votes_lp?: string | null;
  readonly votes_nnpp?: string | null;
  readonly votes_nrm?: string | null;
  readonly votes_pdp?: string | null;
  readonly votes_prp?: string | null;
  readonly votes_sdp?: string | null;
  readonly votes_ypp?: string | null;
  readonly votes_zlp?: string | null;
  readonly copy_of_results?: string | null;
  readonly state_id?: string | null;
  readonly lga_id?: string | null;
  readonly ward_id?: string | null;
  readonly lga_unique?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyElectionMonitor = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ElectionMonitor, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly user?: string | null;
  readonly polling_unit?: string | null;
  readonly election_type?: string | null;
  readonly votes_a?: string | null;
  readonly votes_aa?: string | null;
  readonly votes_aac?: string | null;
  readonly votes_adc?: string | null;
  readonly votes_adp?: string | null;
  readonly votes_apc?: string | null;
  readonly votes_apga?: string | null;
  readonly votes_apm?: string | null;
  readonly votes_app?: string | null;
  readonly votes_bp?: string | null;
  readonly votes_lp?: string | null;
  readonly votes_nnpp?: string | null;
  readonly votes_nrm?: string | null;
  readonly votes_pdp?: string | null;
  readonly votes_prp?: string | null;
  readonly votes_sdp?: string | null;
  readonly votes_ypp?: string | null;
  readonly votes_zlp?: string | null;
  readonly copy_of_results?: string | null;
  readonly state_id?: string | null;
  readonly lga_id?: string | null;
  readonly ward_id?: string | null;
  readonly lga_unique?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type ElectionMonitor = LazyLoading extends LazyLoadingDisabled ? EagerElectionMonitor : LazyElectionMonitor

export declare const ElectionMonitor: (new (init: ModelInit<ElectionMonitor>) => ElectionMonitor) & {
  copyOf(source: ElectionMonitor, mutator: (draft: MutableModel<ElectionMonitor>) => MutableModel<ElectionMonitor> | void): ElectionMonitor;
}

type EagerLiveReports = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<LiveReports, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly user?: string | null;
  readonly polling_unit?: string | null;
  readonly pu_current_state?: string | null;
  readonly pu_scenery?: string | null;
  readonly no_on_queue?: string | null;
  readonly materials_functional?: string | null;
  readonly average_time_to_vote?: string | null;
  readonly staff_present?: string | null;
  readonly time_create?: string | null;
  readonly time_create_clone?: string | null;
  readonly attachment?: string | null;
  readonly comment?: string | null;
  readonly endorsements?: number | null;
  readonly is_false?: number | null;
  readonly report_status?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyLiveReports = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<LiveReports, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly user?: string | null;
  readonly polling_unit?: string | null;
  readonly pu_current_state?: string | null;
  readonly pu_scenery?: string | null;
  readonly no_on_queue?: string | null;
  readonly materials_functional?: string | null;
  readonly average_time_to_vote?: string | null;
  readonly staff_present?: string | null;
  readonly time_create?: string | null;
  readonly time_create_clone?: string | null;
  readonly attachment?: string | null;
  readonly comment?: string | null;
  readonly endorsements?: number | null;
  readonly is_false?: number | null;
  readonly report_status?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type LiveReports = LazyLoading extends LazyLoadingDisabled ? EagerLiveReports : LazyLiveReports

export declare const LiveReports: (new (init: ModelInit<LiveReports>) => LiveReports) & {
  copyOf(source: LiveReports, mutator: (draft: MutableModel<LiveReports>) => MutableModel<LiveReports> | void): LiveReports;
}

type EagerReportToUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ReportToUser, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly report_id?: string | null;
  readonly user_id?: string | null;
  readonly report_type?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyReportToUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ReportToUser, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly report_id?: string | null;
  readonly user_id?: string | null;
  readonly report_type?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type ReportToUser = LazyLoading extends LazyLoadingDisabled ? EagerReportToUser : LazyReportToUser

export declare const ReportToUser: (new (init: ModelInit<ReportToUser>) => ReportToUser) & {
  copyOf(source: ReportToUser, mutator: (draft: MutableModel<ReportToUser>) => MutableModel<ReportToUser> | void): ReportToUser;
}

type EagerUserProfile = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UserProfile, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly state_id?: string | null;
  readonly lga?: string | null;
  readonly ward?: string | null;
  readonly ward_id?: string | null;
  readonly ward_abbreviation?: string | null;
  readonly state?: string | null;
  readonly pu?: string | null;
  readonly pu_id?: string | null;
  readonly lga_abbreviation?: string | null;
  readonly lga_id?: string | null;
  readonly sub?: string | null;
  readonly gender?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUserProfile = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UserProfile, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly state_id?: string | null;
  readonly lga?: string | null;
  readonly ward?: string | null;
  readonly ward_id?: string | null;
  readonly ward_abbreviation?: string | null;
  readonly state?: string | null;
  readonly pu?: string | null;
  readonly pu_id?: string | null;
  readonly lga_abbreviation?: string | null;
  readonly lga_id?: string | null;
  readonly sub?: string | null;
  readonly gender?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type UserProfile = LazyLoading extends LazyLoadingDisabled ? EagerUserProfile : LazyUserProfile

export declare const UserProfile: (new (init: ModelInit<UserProfile>) => UserProfile) & {
  copyOf(source: UserProfile, mutator: (draft: MutableModel<UserProfile>) => MutableModel<UserProfile> | void): UserProfile;
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