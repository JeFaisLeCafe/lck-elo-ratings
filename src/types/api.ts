export interface ApiMatch {
    begin_at: string;
    detailed_stats: boolean;
    draw: boolean;
    end_at: string | null;
    forfeit: boolean;
    game_advantage: null;
    games: ApiGame[];
    id: number;
    league: ApiLeague;
    league_id: number;
    live: ApiLive;
    match_type: string;
    modified_at: string;
    name: string;
    number_of_games: number;
    opponents: ApiOpponent[];
    original_scheduled_at: string;
    rescheduled: boolean;
    results: ApiResult[];
    scheduled_at: string;
    serie: ApiSerie;
    serie_id: number;
    slug: string;
    status: string;
    streams_list: ApiStream[];
    tournament: ApiTournament;
    tournament_id: number;
    videogame: ApiVideogame;
    videogame_title: string | null;
    videogame_version: string | null;
    winner: null;
    winner_id: null;
    winner_type: string;
}

export interface ApiGame {
    begin_at: string | null;
    complete: boolean;
    detailed_stats: boolean;
    end_at: string | null;
    finished: boolean;
    forfeit: boolean;
    id: number;
    length: string | null;
    match_id: number;
    position: number;
    status: string;
    winner: ApiWinner;
    winner_type: string;
}

export interface ApiWinner {
    id: null;
    type: string;
}

export interface ApiLeague {
    id: number;
    image_url: string;
    modified_at: string;
    name: string;
    slug: string;
    url: null;
}

export interface ApiLive {
    opens_at: string;
    supported: boolean;
    url: string;
}

export interface ApiOpponent {
    opponent: ApiOpponentDetails;
    type: string;
}

export interface ApiOpponentDetails {
    acronym: string | null;
    id: number;
    image_url: string;
    name: string;
    slug: string;
}

export interface ApiResult {
    score: number;
    team_id: number;
}

export interface ApiSerie {
    begin_at: string;
    end_at: string;
    full_name: string;
    id: number;
    league_id: number;
    modified_at: string;
    name: null;
    season: null;
    slug: string;
    winner_id: null;
    winner_type: null;
    year: number;
}

export interface ApiStream {
    embed_url: string;
}

export interface ApiTournament {
    begin_at: string;
    detailed_stats: boolean;
    end_at: string;
    has_bracket: boolean;
    id: number;
    league_id: number;
    live_supported: boolean;
    modified_at: string;
    name: string;
    prizepool: null;
    serie_id: number;
    slug: string;
    tier: string;
    winner_id: null;
    winner_type: string;
}

export interface ApiVideogame {
    id: number;
    name: string;
    slug: string;
}

