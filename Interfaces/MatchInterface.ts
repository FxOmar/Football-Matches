export interface MatchInterface {
  _id: ID;
  match_id: string;
  coverage_level: number;
  date: DateClass;
  time: string;
  week: string;
  description: string;
  last_updated: DateClass;
  competition: Competition;
  sport: Ruleset;
  ruleset: Ruleset;
  tournament_calendar: TournamentCalendar;
  stage: Stage;
  contestant: Contestant[];
  venue: Venue;
  match_details: MatchDetails;
  goal: Goal[];
  card: Card[];
  substitute: Substitute[];
  line_up: LineUp[];
  var: any[];
  missed_pen: any[];
  penalty_shot: any[];
  series: Series;
  match_details_extra: MatchDetailsExtra;
  has_pixels: boolean;
  is_important: boolean;
  updated_keys: any[];
  cover: Cover;
  oc_id?: string;
  number_of_periods?: number;
  period_length?: number;
  overtime_length?: number;
  description_fr?: string;
  description_en?: string;
  attendance_info_id?: number;
  attendance_info?: string;
}

export interface ID {
  $oid: string;
}

export interface Card {
  contestant_id: ContestantID;
  period_id: number;
  time_min: number;
  time_min_sec: string;
  last_updated: string;
  timestamp: string;
  type: string;
  player_id: string;
  player_name: string;
  opta_event_id: string;
  card_reason: string;
  player_name_fr?: string;
  player_name_en?: string;
}

export enum ContestantID {
  The102Ykb145Wz6Dtveg65Nistwm = "102ykb145wz6dtveg65nistwm",
  The2Ldx5Vhhqfz2Rllkgp7Wpa744 = "2ldx5vhhqfz2rllkgp7wpa744",
}

export interface Competition {
  id: string;
  name: string;
  competition_code: string;
  competition_format: string;
  country: Country;
  display_order: number;
  name_fr?: string;
  name_en?: string;
}

export interface Country {
  id: string;
  name: string;
  name_fr?: string;
  name_en?: string;
}

export interface Contestant {
  id: string;
  name: string;
  short_name: string;
  official_name: string;
  code: string;
  position: string;
  country: Country;
  name_fr?: string;
  official_name_fr?: string;
  short_name_fr?: string;
  name_en?: string;
  official_name_en?: string;
  short_name_en?: string;
}

export interface Cover {
  default_path: string;
  thumb_path: string;
}

export interface DateClass {
  $date: string;
}

export interface Goal {
  contestant_id: ContestantID;
  period_id: number;
  time_min: number;
  time_min_sec: string;
  last_updated: string;
  timestamp: string;
  type: string;
  scorer_id: string;
  scorer_name: string;
  opta_event_id: string;
  home_score: number;
  away_score: number;
  scorer_name_en: string;
  scorer_name_fr: string;
  assist_player_id?: string;
  assist_player_name?: string;
  assist_player_name_en?: string;
  assist_player_name_fr?: string;
}

export interface LineUp {
  contestant_id: ContestantID;
  formation_used: string;
  player: Player[];
  team_official: TeamOfficial;
  player_positions: { [key: string]: PlayerPosition };
  player_stat: { [key: string]: PlayerStat[] };
  stat: Stat[];
}

export interface Player {
  player_id: string;
  first_name: string;
  last_name: string;
  match_name: string;
  shirt_number: number;
  position: string;
  position_side?: string;
  formation_place?: string;
  match_name_en?: string;
  first_name_fr?: string;
  match_name_fr?: string;
  first_name_en?: string;
  last_name_fr?: string;
  last_name_en?: string;
  captain?: string;
  sub_position?: SubPosition;
}

export enum SubPosition {
  Attacker = "Attacker",
  Defender = "Defender",
  Goalkeeper = "Goalkeeper",
  Midfielder = "Midfielder",
}

export interface PlayerPosition {
  pixel_x: number;
  pixel_y: number;
}

export interface PlayerStat {
  type: string;
  value: string;
}

export interface Stat {
  fh?: string;
  sh?: string;
  type: string;
  value: string;
}

export interface TeamOfficial {
  id: string;
  first_name: string;
  last_name: string;
  type: string;
  first_name_en?: string;
  first_name_fr?: string;
  last_name_fr?: string;
  last_name_en?: string;
}

export interface MatchDetails {
  period_id: number;
  match_status: string;
  winner: string;
  scores: Scores;
  match_length_min?: number;
  match_length_sec?: number;
  period?: Period[];
}

export interface Period {
  id: number;
  start: string;
  end: string;
  length_min: number;
  length_sec: number;
}

export interface Scores {
  ft: Ft;
  total: Ft;
  ht?: Ft;
}

export interface Ft {
  home: number;
  away: number;
}

export interface MatchDetailsExtra {
  match_official?: MatchOfficial[];
}

export interface MatchOfficial {
  id: string;
  type: string;
  first_name: string;
  last_name: string;
}

export interface Ruleset {
  id: string;
  name: string;
}

export interface Series {}

export interface Stage {
  id: string;
  format_id: string;
  start_date: string;
  end_date: string;
  name: string;
  name_fr?: string;
  name_en?: string;
}

export interface Substitute {
  contestant_id: ContestantID;
  period_id: number;
  time_min: number;
  time_min_sec: string;
  last_updated: string;
  timestamp: string;
  player_on_id: string;
  player_on_name: string;
  player_off_id: string;
  player_off_name: string;
  sub_reason: SubReason;
  player_on_name_fr?: string;
  player_on_name_en?: string;
  player_off_name_en?: string;
  player_off_name_fr?: string;
}

export enum SubReason {
  Tactical = "Tactical",
}

export interface TournamentCalendar {
  id: string;
  start_date: string;
  end_date: string;
  name: string;
}

export interface Venue {
  id: string;
  neutral: string;
  long_name: string;
  short_name: string;
  long_name_fr?: string;
  short_name_fr?: string;
  long_name_en?: string;
  short_name_en?: string;
}
