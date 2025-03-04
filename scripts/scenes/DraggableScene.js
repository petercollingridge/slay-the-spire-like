class DraggableScene extends Phaser.Scene {
  init() {
    this.input.on('dragstart', this.dragStart, this);
    this.input.on('dragenter', this.dragEnter, this);
    this.input.on('dragleave', this.dragLeave, this);
    this.input.on('drag', this.drag, this);
    this.input.on('dragend', this.dragEnd, this);
    this.input.on('drop', this.drop, this);
    this.zones = {};
  }

  dragStart(pointer, target) {
    target.parent.dragStart();
  }
  
  drag(pointer, target, dragX, dragY) {
    target.x = dragX;
    target.y = dragY;
  }

  dragEnter(pointer, target, dropZone) {
    dropZone.parent.dragEnter(target.parent);
  }

  dragLeave(pointer, target, dropZone) {
    target.parent.cardImg.setTint(YELLOW_TINT);
    dropZone.parent.clearTint();
  }
  
  dragEnd(pointer, target) {
    target.parent.dragEnd();
  }

  drop(pointer, target, dropZone) {
    target.parent.clearTint();
    console.log('drop')
    console.log('dropZone', this.zones[dropZone.name])
    this.zones[dropZone.name].dropCard(target.parent, pointer);
  }
}
