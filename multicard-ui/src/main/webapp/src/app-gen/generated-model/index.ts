/* tslint:disable */
/* eslint-disable */

export interface GameDTO {
    id: string;
    title: string;
    state: Gamestate;
    players: PlayerDTO[];
    stacks: StackDTO[];
    playedCards: PlayedCardsDTO;
    lastAction: ActionDTO;
}

export interface GameMessage {
    messageName: "GameMessage" | "GameStateMessage" | "PlayersPositionedMessage" | "PlayedCardMessage" | "RevertLastPlayerActionMessage";
    command: Action;
}

export interface GameStateMessage extends GameMessage {
    messageName: "GameStateMessage";
    game: GameDTO;
}

export interface PlayersPositionedMessage extends GameMessage {
    messageName: "PlayersPositionedMessage";
    players: PlayerDTO[];
}

export interface PlayedCardMessage extends GameMessage {
    messageName: "PlayedCardMessage";
    card: CardDTO;
}

export interface RevertLastPlayerActionMessage extends GameMessage {
    messageName: "RevertLastPlayerActionMessage";
    card: CardDTO;
}

export interface PlayerDTO {
    id: string;
    name: string;
    position: number;
    hand: HandDTO;
    stacks: StackDTO[];
    organizer: boolean;
    playerReady: boolean;
}

export interface StackDTO {
    id: string;
    cards: CardDTO[];
}

export interface PlayedCardsDTO {
    cards: PlayedCardDTO[];
    onSameStack: boolean;
}

export interface ActionDTO {
    id: string;
    playerId: string;
    action: Action;
}

export interface CardDTO extends Comparable<CardDTO> {
    id: string;
    name: string;
    sort: number;
    faceUp: boolean;
}

export interface HandDTO {
    id: string;
    cardCount: number;
    cards: CardDTO[];
}

export interface PlayedCardDTO extends CardDTO {
    playerId: string;
}

export interface Comparable<T> {
}

export type GameMessageUnion = GameStateMessage | PlayedCardMessage | RevertLastPlayerActionMessage;

export enum Gamestate {
    INITIAL = "INITIAL",
    READYTOSTART = "READYTOSTART",
    STARTED = "STARTED",
    ENDED = "ENDED",
}

export enum Action {
    CLIENT_GAME_READY = "CLIENT_GAME_READY",
    CLIENT_PLAYER_READY = "CLIENT_PLAYER_READY",
    CLIENT_PLAYERS_POSITIONED = "CLIENT_PLAYERS_POSITIONED",
    CLIENT_START_GAME = "CLIENT_START_GAME",
    CLIENT_REQUEST_STATE = "CLIENT_REQUEST_STATE",
    CLIENT_CARD_PLAYED = "CLIENT_CARD_PLAYED",
    CLIENT_PLAYED_CARDS_TAKEN = "CLIENT_PLAYED_CARDS_TAKEN",
    CLIENT_REVERT_LAST_PLAYER_ACTION = "CLIENT_REVERT_LAST_PLAYER_ACTION",
    CLIENT_REVERT_ACTION = "CLIENT_REVERT_ACTION",
    START_GAME = "START_GAME",
    GAME_STATE = "GAME_STATE",
}
