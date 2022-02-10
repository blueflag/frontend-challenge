interface IBlueflagUser {
  id: string;
  givenName: string;
  jobPositions: string;
  familyName: string;
}
interface IBlueflagLearningResource {
  masterId: string;
  code: string;
  title: string;
}
interface IBlueflagLearningRecord {
  learning_record_verb: string; // ATTEMPT, COMPLETE, FAIL, PASS, ENROL, ATTEND.
  user_id: string;
  learning_resource_id: string;
  learning_record_timestamp: string;
}
interface IBlueflagLearningModdedRecord extends IBlueflagLearningRecord {
  resource_code?: string;
  resource_title?: string;
}

interface IBlueflagModdedUser extends IBlueflagUser {
  learning_records: IBlueflagLearningModdedRecord[];
  total_records: number;
  completed_records: number;
}

interface IBlueflagModdedResource extends IBlueflagLearningResource {
  records: IBlueflagLearningRecord[];
  has_enrolled_only: boolean;
  records_completed: number;
}

// Section props
interface RecordRankingSectionProps {
  moddedResources: IBlueflagModdedResource[];
}
interface UserRankingSectionProps {
  sortedUsersDesc: IBlueflagModdedUser[];
  sortedUsersAsc: IBlueflagModdedUser[];
}
interface UserSearchSectionProps {
  searchTerm: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchResults: IBlueflagModdedUser[];
}
