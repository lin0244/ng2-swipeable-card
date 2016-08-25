import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  HostListener,
  Input
} from '@angular/core';

@Component({
  selector: 'swipeable-card',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template:`
    <ng-content></ng-content>
  `,
  styles:[`
.swipeable-card-container {
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin: 0 auto; }

swipeable-card-title, swipeable-card-subtitle {
  display: block;
  margin-bottom: 16px; }

[swipeable-button] {
  background: transparent;
  border: none;
  outline: none;
  display: inline-block;
  padding: 0 6px;
  margin: 6px 8px;
  min-width: 88px;
  line-height: 36px;
  cursor: pointer;
  border-radius: 3px;
  font-size: 14px;
  font-weight: 500; }
  [swipeable-button]:hover {
    background-color: rgba(158, 158, 158, 0.2); }

swipeable-card {
  display: block;
  position: relative;
  padding: 24px;
  border-radius: 2px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
  font-family: Roboto, "Helvetica Neue", sans-serif;
  background: white; }
  swipeable-card.visible {
    display: block !important; }
    swipeable-card.visible :hover {
      cursor: pointer; }
  swipeable-card.hidden {
    display: none !important; }

swipeable-card-title {
  font-size: 24px;
  font-weight: 400; }

swipeable-card-subtitle {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.54); }

swipeable-card-content {
  display: block;
  font-size: 14px;
  margin-bottom: 16px; }

swipeable-card-actions {
  display: block;
  margin: 16px -16px;
  padding: 8px 0; }

swipeable-card-actions [swipeable-button], swipeable-card-actions [swipeable-raised-button], swipeable-card-actions button {
  margin: 0 4px; }

img[swipeable-card-image] {
  width: calc(100% + 48px);
  margin: 0 -24px 16px -24px;
  border-radius: .28571429rem .28571429rem 0 0; }

img[swipeable-card-xl-image] {
  width: 240px;
  height: 240px;
  margin: -8px; }

swipeable-card-footer {
  position: absolute;
  bottom: 0; }

/* HEADER STYLES */
swipeable-card-header {
  display: flex;
  flex-direction: row;
  height: 40px;
  margin: -8px 0 16px 0; }

.swipeable-card-header-text {
  height: 40px;
  margin: 0 8px; }

img[swipeable-card-avatar] {
  height: 40px;
  width: 40px;
  border-radius: 50%; }

swipeable-card-header swipeable-card-title {
  font-size: 14px; }

swipeable-card-header swipeable-card-subtitle:not(:first-child) {
  margin-top: -8px; }

/* TITLE-GROUP STYLES */
img[swipeable-card-sm-image], img[swipeable-card-md-image], img[swipeable-card-lg-image] {
  margin: -8px 0; }

swipeable-card-title-group {
  display: flex;
  justify-content: space-between;
  margin: 0 -8px; }

img[swipeable-card-sm-image] {
  width: 80px;
  height: 80px; }

img[swipeable-card-md-image] {
  width: 112px;
  height: 112px; }

img[swipeable-card-lg-image] {
  width: 152px;
  height: 152px; }

/* MEDIA QUERIES */
@media (max-width: 600px) {
  swipeable-card {
    padding: 24px 16px; }
  img[swipeable-card-image] {
    width: calc(100% + 32px);
    margin: 16px -16px;
    border-radius: .28571429rem .28571429rem 0 0; }
  swipeable-card-title-group {
    margin: 0; }
  img[swipeable-card-xl-image] {
    margin-left: 0;
    margin-right: 0; } }

/* FIRST/LAST CHILD ADJUSTMENTS */
swipeable-card-title:not(:first-child),
swipeable-card-subtitle:not(:first-child) {
  margin-top: -4px; }

img[swipeable-card-image]:first-child {
  margin-top: -24px; }

swipeable-card-content:first-child {
  margin: 0;
  padding-top: 0; }

swipeable-card-content > *:first-child {
  margin-top: 0; }

swipeable-card > img[swipeable-card-xl-image]:first-child {
  margin-top: -8px; }

swipeable-card > img[swipeable-card-xl-image]:last-child {
  margin-bottom: -8px; }

swipeable-card > *:last-child,
swipeable-card-content > *:last-child {
  margin-bottom: 0; }

swipeable-card > swipeable-card-actions:last-child {
  margin-bottom: -16px;
  padding-bottom: 0; }

swipeable-card-actions [swipeable-button]:first-child,
swipeable-card-actions [swipeable-raised-button]:first-child {
  margin: 0 4px; }

  `]
})
export class SwipeableCard {
  SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };

  @Input() cards: any[];

  @HostListener('swipeleft', ['idx','$event.type'])
  swipeLeft(index: number, action: string): void {
    this._swipe(index, action);
  }

  @HostListener('swiperight', ['idx', '$event.type'])
  swipeRight(index: number, action: string): void {
    this._swipe(index, action);
  }

  private _swipe(currentIndex: number, action: string = this.SWIPE_ACTION.RIGHT) {

    if (currentIndex > this.cards.length || currentIndex < 0) return;

    let nextIndex = 0;

    // next action
    if (action === this.SWIPE_ACTION.RIGHT) {
      const isLast = currentIndex === this.cards.length - 1;
      nextIndex = isLast ? 0 : currentIndex + 1;
    }

    if (action === this.SWIPE_ACTION.LEFT) {
      const isFirst = currentIndex === 0;
      nextIndex = isFirst ? this.cards.length - 1 : currentIndex - 1;
    }

    // toggle avatar visibility
    this.cards.forEach((x, i) => x.visible = (i === nextIndex));
  }
}

@Component({
  selector: 'swipeable-card-header',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template:`
  <ng-content select="[swipeable-card-avatar]"></ng-content>
  <div class="swipeable-card-header-text">
    <ng-content select="swipeable-card-title, swipeable-card-subtitle"></ng-content>
  </div>
  <ng-content></ng-content>
  `
})
export class SwipeableCardHeader {}

@Component({
  selector: 'swipeable-card-title-group',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template:`
  <div>
    <ng-content select="swipeable-card-title, swipeable-card-subtitle"></ng-content>
  </div>
  <ng-content select="img"></ng-content>
  <ng-content></ng-content> 
  `
})
export class SwipeableCardTitleGroup {}

@Component({
  selector: '[swipeable-button]:not(a), [swipeable-raised-button]:not(a)',
  encapsulation: ViewEncapsulation.None,
  template:`
  <span class="swipeable-button-wrapper">
    <ng-content></ng-content>
  </span>
  `
})
export class SwipeableButton {

  isMouseDown: boolean = false;
  isKeyboardFocused: boolean = false;

  @HostListener('mousedown')
  onMousedown() {
    this.isMouseDown = true;
    setTimeout(() => {this.isMouseDown = false}, 100);
  }

  @HostListener('focus')
  onFocus() {
    this.isKeyboardFocused = !this.isMouseDown;
  }

  @HostListener('blur')
  onBlur() {
    this.isKeyboardFocused = false;
  }
}


