import { Component, OnInit } from '@angular/core';

import { Config, ConfigService } from './config.service';
// import { MessageService } from '../message.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  // styleUrls: ['./config.component.css'],
  providers: [ ConfigService ],
  styles: ['.error {color: red;}']
})
export class ConfigComponent implements OnInit{
  error: any;
  headers: string[];
  config: Config;

  constructor(private configService: ConfigService) {}

  ngOnInit() {
  }

  clear() {
    this.config = undefined;
    this.error = undefined;
    this.headers = undefined;
  }

  showConfig() {
    this.configService.getConfig()
      .subscribe(
        data => this.config = { ...data }, // success path
        error => this.error = error // error path
      );
  }

  showConfig_v1() {
    this.configService.getConfig_1()
      .subscribe(data => this.config = {
          heroesUrl: data['wingsUrl'],
          textfile:  data['textfile']
      });
  }

  showConfig_v2() {
    this.configService.getConfig()
      // clone the data object, using its known Config shape
      .subscribe(data => this.config = { ...data });
  }

  showConfigResponse() {
    this.configService.getConfigResponse()
      // resp is of type `HttpResponse<Config>`
      .subscribe(resp => {
        // display its headers
        const keys = resp.headers.keys();
        this.headers = keys.map(key =>
          `${key}: ${resp.headers.get(key)}`);

        // access the body directly, which is typed as `Config`.
        this.config = { ... resp.body };
      });
  }
  makeError() {
    this.configService.makeIntentionalError().subscribe(null, error => this.error = error );
  }
}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/