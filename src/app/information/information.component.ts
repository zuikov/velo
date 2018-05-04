import { Component, OnInit } from '@angular/core';

class Photo {
  url: string;
  description?: string;
}

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})

export class InformationComponent implements OnInit {
  photos = PHOTOS;

  constructor() { }

  ngOnInit() {
  }

}

export const PHOTOS: Photo[] = [
  {
    url: '/assets/images/wing-SCS-mtb26-black.jpg',
    description: 'Короткий брызговик для защиты системы'
  },
  {
    url: '/assets/images/wing-SCS-mtb26-black-inside.jpg',
    description: 'Короткий брызговик для защиты системы - внутренняя сторона'
  },
  {
    url: '/assets/images/frame-protection.jpg',
    description: 'Защита кареточного узла'
  },
  {
    url: '/assets/images/helmet-with-stickers.jpg',
    description: 'Светоотражающие наклейки для велошлемов'
  },
  {
    url: '/assets/images/holder-for-smartphonel.jpg',
    description: 'Крепление для смартфона на рвму байка'
  },
  {
    url: '/assets/images/supplies.jpg',
    description: 'Расходные материалы - ленты, наклейки и т.п.'
  }
]