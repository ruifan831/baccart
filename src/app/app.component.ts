import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  player:string='';
  banker:string='';
  firstCardDrawed=false;
  cards = {
    'A': 32, '2': 32, '3': 32, '4': 32, '5': 32, '6': 32, '7': 32, '8': 32, '9': 32, '10': 32, 'J': 32, 'Q': 32, 'K': 32
  }
  records={
    'banker':0,
    'tie':0,
    'player':0
  }
  credit=0;
  ngOnInit(): void {

  }

  reset() {
    this.cards={
      'A': 32, '2': 32, '3': 32, '4': 32, '5': 32, '6': 32, '7': 32, '8': 32, '9': 32, '10': 32, 'J': 32, 'Q': 32, 'K': 32
    }
  }

  recordCard(card:string){
    switch (card){
      case 'A': {
        this.cards.A-=1;
        break;
      }
      case '2':{
        this.cards[2]-=1;
        break;
      }
      case '3':{
        this.cards[3]-=1;
        break
      }
      case '4':{
        this.cards[4]-=1;
        break;
      }
      case '5':{
        this.cards[5]-=1;
        break;
      }
      case '6':{
        this.cards[6]-=1;
        break;
      }
      case '7':{
        this.cards[7]-=1;
        break;
      }
      case '8':{
        this.cards[8]-=1;
        break;
      }
      case '9':{
        this.cards[9]-=1;
        break;
      }
      case '10':{
        this.cards[10]-=1;
        break;
      }
      case 'J':{
        this.cards.J-=1;
        break;
      }
      case 'Q':{
        this.cards.Q-=1;
        break;
      }
      case 'K':{
        this.cards.K-=1;
        break;
      }
      default:
        throw new Error("Invalid Input")
        break;
    }
  }
  updateCredit(card:string){
    if (card in ['A','2']){
      this.credit+=1
    } else if (card == '3'){
      this.credit +=2;
    } else if (card =='4'){
      this.credit+=3;
    } else if (card in ['5','6','7']){
      this.credit-=2;
    } else if (card=='8'){
      this.credit-=1;
    }
  }

  firstDrawCard(card:string){
    this.recordCard(card);
    this.updateCredit(card);
    this.firstCardDrawed=true;
  }

  recordAndPredict(){
    let playerCard = this.player.split(',')
    let bankerCard = this.banker.split(',')
    let playerTotal=0;
    let bankerTotal=0;

    for (let card of playerCard){
      this.recordCard(card);
      this.updateCredit(card);
      if (card=='A'){
        playerTotal+=1;
      } else if (card in ['J','Q','K']){
        playerTotal+=10;
      } else if (!isNaN(Number(card))){
        playerTotal+=parseInt(card)
      }
    }

    for (let card of bankerCard){
      this.recordCard(card);
      this.updateCredit(card);
      if (card=='A'){
        bankerTotal+=1;
      } else if (card in ['J','Q','K']){
        bankerTotal+=10;
      } else if (!isNaN(Number(card))){
        bankerTotal+=parseInt(card)
      }
    }

    playerTotal = playerTotal%10;
    bankerTotal = bankerTotal%10;
    if (playerTotal>bankerTotal){
      this.records.player+=1;
    } else if (playerTotal<bankerTotal){
      this.records.banker+=1;
    } else{
      this.records.tie+=1;
    }
    this.predict();
  }


  predict(){
    if (this.credit>0){
      alert('庄')
    } else{
      alert('闲')
    }
  }
  title = 'baccart';
}
