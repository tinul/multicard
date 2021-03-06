import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Game} from '../../model/game.model';

@Component({
  selector: 'mc-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnChanges {

  @Input()
  gameState!: Game;

  playerIdList!: string[];

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.gameState.players !== undefined) {
      this.playerIdList = this.gameState.players.map((p) => p.id);
    } else {
      this.playerIdList = [];
    }
  }
}
