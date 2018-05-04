import { Component, OnInit } from '@angular/core';

class Slide {
  url: string;
  title: string;
  alt: string;
  description: string;
}

class Photo {
  url: string;
  description?: string;
}

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css']
})


export class IntroComponent implements OnInit {
  slides = SLIDES;
  photos = PHOTOS;

  constructor() { }

  ngOnInit() {
   
    
  }

}

export const SLIDES: Slide[] = [
  {
    url: '/assets/images/wing-green-2.jpg',
    title: 'Крыло',
    alt: 'Крыло',
    description: 'на внутренней стороне расположены три точки крепления'
  },
  {
    url: '/assets/images/bike-with-wing.jpg',
    title: 'Байк с установленным крылом и кейсом',
    alt: 'Байк с установленным крылом и кейсом',
    description: 'боковины велокейса закрыты'
  },
  {
    url: '/assets/images/bike-with-case.jpg',
    title: 'Байк с установленным крылом и кейсом',
    alt: 'Байк с установленным крылом и кейсом',
    description: 'боковины велокейса открыты для укладки'
  },
  {
    url: '/assets/images/wing-green-1.jpg',
    title: 'Крыло',
    alt: 'Крыло',
    description: 'наружная сторона'
  }
]

export const PHOTOS: Photo[] = [
  {
    url: '/assets/images/case-for-bike-SCS-yellow-tiger.jpg',
    // description: 'Ski resort'
  },
  {
    url: '/assets/images/bike-with-SCS-case-and-wing.jpg',
    // description: 'Turnstiles - Spain'
  },
  {
    url: '/assets/images/bike-with-SCS-case-and-wing-red.jpg',
    // description: 'Turnstile Cayman - trade show'
  },
  {
    url: '/assets/images/wings-for-bike.jpg',
    // description: 'Protection for engine'
  },
  {
    url: '/assets/images/bike-kellys-with-SCS-wings-and-case-with-reflective-tape.jpg',
    // description: 'Fireplace'
  },
  {
    url: '/assets/images/wing-SCS-mtb26-yellow-tiger.jpg',
    // description: 'Subway station - Baku'
  }
]
