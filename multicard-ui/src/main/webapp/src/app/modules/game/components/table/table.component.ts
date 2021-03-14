import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {GameDTO, Gamestate} from '../../../../../app-gen/generated-model';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {GameService} from '../../../../services/game.service';

@Component({
  selector: 'mc-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnChanges {

  @Input() gameState!: GameDTO;
  playerIdList: string[] = [];

  constructor(
    private gameService: GameService) {
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

  isDragAndDropOfPlayersAllowed() {
    return this.playerIdList.length === 4
      && (this.gameState.state === Gamestate.INITIAL || this.gameState.state === Gamestate.READYTOSTART);
  }

  playerDroppedLeft(event: CdkDragDrop<number>) {
    console.log(`player ${event.item.data}  moved to left place`, event);
    this.gameService.changePlayerPosition(event.item.data, 1);
  }

  playerDroppedTop(event: CdkDragDrop<number>) {
    console.log(`player ${event.item.data}  moved to top place`, event);
    this.gameService.changePlayerPosition(event.item.data, 2);
  }

  playerDroppedRight(event: CdkDragDrop<number>) {
    console.log(`player ${event.item.data}  moved to right place`, event);
    this.gameService.changePlayerPosition(event.item.data, 3);
  }
}