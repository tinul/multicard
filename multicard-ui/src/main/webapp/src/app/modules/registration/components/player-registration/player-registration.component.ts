import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {GameDTO} from '../../../../../app-gen/generated-model';
import {GameService} from '../../../../services/game.service';
import {MatDialog} from '@angular/material/dialog';
import {Player} from '../../../../model/game.model';
import {PlayerService} from '../../../../services/player.service';
import {
  PlayerRegistrationDialogComponent,
  PlayerRegistrationParam
} from '../player-registration-dialog/player-registration-dialog.component';

const ERROR_MSG = 'Leider ist ein unerwarteter Fehler aufgetreten. Bitte lade die Seite neu.';

@Component({
  selector: 'mc-player-registration',
  templateUrl: './player-registration.component.html',
  styleUrls: ['./player-registration.component.scss']
})
export class PlayerRegistrationComponent implements OnInit {

  @ViewChild('errorDialogTemplate', {static: true}) errorDialogTemplate!: TemplateRef<any>;

  player!: Player;
  playerIdOfGame?: string;
  gameId!: string;
  game!: GameDTO;

  constructor(
    private playerService: PlayerService,
    private gameService: GameService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router) {
  }

  ngOnInit(): void {
    this.player = this.playerService.loadPlayerFromLocalStorage();
    this.route.paramMap.subscribe(p => {
      const gameId = p.get('gameId');
      if (gameId) {
        this.gameId = gameId;
        this.loadGameAndCreatePlayer();
      } else {
        console.error('gameId or playerId is not set', this.route);
      }
    });
  }

  joinTable() {
    this.router.navigate([`/game/${this.gameId}/${this.playerIdOfGame}`]);
  }

  private loadGameAndCreatePlayer() {
    this.gameService.loadGame(this.gameId).subscribe(game => {
      this.game = game;
      this.playerIdOfGame = this.player.registeredGames?.find(rg => rg.gameId === game.id)?.playerId;
      if (!this.playerIdOfGame) {
        const hasGameAlreadyAnOrganizer = game.players && game.players.find(p => p.organizer);
        this.createPlayer(game, !hasGameAlreadyAnOrganizer);
      }
    }, e => {
      console.error('error on game creation', e);
      this.dialog.open(this.errorDialogTemplate, {data: {error: ERROR_MSG}, position: {top: '60px'}});
    });
  }

  private createPlayer(game: GameDTO, isOrganizer: boolean) {
    const data: PlayerRegistrationParam = {isOrganizer, game, player: this.player};
    const dialogRef = this.dialog.open(PlayerRegistrationDialogComponent,
      {data, hasBackdrop: false, position: {top: '100px'}});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.player = result as Player;
        this.playerIdOfGame = this.player.registeredGames.find(rg => rg.gameId === this.gameId)?.playerId;
      }
    });
  }
}
