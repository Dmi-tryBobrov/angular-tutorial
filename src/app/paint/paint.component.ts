import { Component, OnDestroy, OnInit } from '@angular/core';

import { fromEvent, Observable, Subscription } from 'rxjs';
import { map, pairwise, startWith, switchMap, takeUntil, tap } from 'rxjs/operators';

type DrawLine = [
  {
    x: number;
    y: number;
  },
  {
    x: number,
    y: number;
  }
];

@Component({
  selector: 'app-paint',
  templateUrl: './paint.component.html',
  styleUrls: ['./paint.component.scss']
})
export class PaintComponent implements OnInit, OnDestroy {

  private _canvasDraw!: HTMLCanvasElement;
  private ctxDraw!: CanvasRenderingContext2D;
  private _canvasBgd!: HTMLCanvasElement;
  private ctxBgd!: CanvasRenderingContext2D;
  private canvasSize!: DOMRect; 
  private _pixelRatio!: number;
  private _inputBgd!: HTMLInputElement;

  private mouseMove$!: Observable<MouseEvent>;
  private mouseUp$!: Observable<MouseEvent>;
  private mouseDown$!: Observable<MouseEvent>;
  private mouseOut$!: Observable<MouseEvent>;
  private bgdColorInput$!: Observable<Event>;
  private subscriptionDraw?: Subscription;
  private subscriptionBgd?: Subscription;

  public lineWidth = '2';
  public lineColor = '#4b0082'; //indigo color
  public backgroundColor = '#ffffff';
  private _oldBackgroundColor?: string; 


  constructor() { }

  ngOnInit(): void {
    this._canvasDraw = document.querySelector('#draw-layer')!;
    this._canvasBgd = document.querySelector('#bgd-layer')!;
    this.ctxDraw = this._canvasDraw.getContext('2d')!;
    this.ctxBgd = this._canvasBgd.getContext('2d')!;
    this.canvasSize = this._canvasDraw.getBoundingClientRect();
    this._pixelRatio = window.devicePixelRatio;
    this._inputBgd = document.querySelector('#bgd-color')!;

    console.log(this._inputBgd, this._inputBgd.value);

    //scale to accomodate retina display
    this._canvasDraw.width = this._canvasBgd.width =
    this.canvasSize.width*this._pixelRatio;

    this._canvasDraw.height = this._canvasBgd.height =
    this.canvasSize.height*this._pixelRatio;

    console.log(this._canvasBgd.width, this._canvasBgd.height, this.canvasSize);

    this.ctxDraw.scale(this._pixelRatio, this._pixelRatio);
    this.ctxBgd.scale(this._pixelRatio, this._pixelRatio);

    this.mouseMove$ = fromEvent<MouseEvent>(this._canvasDraw, 'mousemove');
    this.mouseUp$ = fromEvent<MouseEvent>(this._canvasDraw, 'mouseup');
    this.mouseDown$ = fromEvent<MouseEvent>(this._canvasDraw, 'mousedown');
    this.mouseOut$ = fromEvent<MouseEvent>(this._canvasDraw, 'mouseout');
    this.bgdColorInput$ = fromEvent<Event>(this._inputBgd, 'change');


    this.subscriptionDraw = this.mouseDown$.pipe(
      switchMap(() => {
        return this.mouseMove$.pipe(
          map((e: MouseEvent) => ({
            x: e.offsetX,
            y: e.offsetY
          })),
          pairwise(),
          takeUntil(this.mouseUp$),
          takeUntil(this.mouseOut$) 
        )
      }),
    )
    .subscribe(pos => {
      this.ctxDraw.strokeStyle = this.lineColor;
      this.ctxDraw.lineWidth = parseInt(this.lineWidth, 10);

      this.ctxDraw.beginPath();
      this.ctxDraw.moveTo(pos[0].x, pos[0].y);
      this.ctxDraw.lineTo(pos[1].x, pos[1].y);
      this.ctxDraw.stroke();
    });

    this.subscriptionBgd = this.bgdColorInput$
    .subscribe(e => this.setCanvasBackground((<HTMLInputElement>e.target).value));
  }

  ngOnDestroy(): void {
    if(this.subscriptionDraw)
      this.subscriptionDraw.unsubscribe();

    if(this.subscriptionBgd)
      this.subscriptionBgd.unsubscribe();
  }

  // changeCanvasBackground(): void {
  //   if(!this._oldBackgroundColor){
  //     this._oldBackgroundColor = this.backgroundColor;
  //     this.setCanvasBackground();
  //     return;
  //   }

  //   if(this._oldBackgroundColor === this.backgroundColor)
  //     return;
  //   else{
  //     this._oldBackgroundColor = this.backgroundColor;
  //     this.setCanvasBackground();
  //   }

  // }

  private setCanvasBackground(bgdColor: string): void {
    this.ctxBgd.clearRect(0, 0, this._canvasBgd.width, this._canvasBgd.height);
    this.ctxBgd.fillStyle = bgdColor;
    this.ctxBgd.fillRect(0, 0, this._canvasBgd.width, this._canvasBgd.height);
  }

  clearCanvas(): void {
    this.ctxDraw.clearRect(0, 0, this._canvasDraw.width, this._canvasDraw.height);
    this.ctxBgd.clearRect(0, 0, this._canvasBgd.width, this._canvasBgd.height);
    this.setCanvasBackground(this._inputBgd.value);
  }
}
