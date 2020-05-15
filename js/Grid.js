import CardGrid from './CardGrid.js';
import { cardTypes } from './CardTypes.js';

export default class Grid {
  constructor(data) {
    let { scene, rows, columns } = data;
    this.xOffset = 120;
    this.yOffset = 280;
    this.yStart = scene.game.config.height / 2;
    this.rows = rows;
    this.columns = columns;
    this.scene = scene;
    this.cards = [];
    this.addCards(0);
  }

  addCards(startIndex) {
    for (let index = startIndex; index < this.columns * this.rows; index++) {
      const cardType = cardTypes[Math.floor(Math.random() * cardTypes.length)];
      let card = new CardGrid({
        scene: this.scene,
        x: this.xOffset + (this.scene.game.config.width / 2 - this.xOffset) * (index % this.columns),
        y: this.yStart - this.yOffset * Math.floor(index / this.columns),
        card: 'card',
        image: cardType.image,
        name: cardType.name,
        value: cardType.value,
        type: cardType.type
      });
      card.depth = 0;
      this.cards.push(card);
    }
  }

  addBackRow() {
    if (this.cards.length < this.columns * this.rows) {
      this.addCards(6);
    }
  }

  fadeFrontRow() {
    setTimeout(() => {
      this.cards.splice(0, 3).forEach(card => card.destroy());
      this.cards.forEach(card => {
        this.scene.tweens.add({
          targets: card,
          duration: 400,
          y: card.y + this.yOffset,
          onComplete: () => this.addBackRow()
        })
      })
    }, 700);

    this.cards.slice(0, 3).forEach(card => {
      if (!card.selected) {
        this.scene.tweens.add({
          targets: card,
          alpha: 0,
          duration: 200
        });
      }
    });
  }
}
