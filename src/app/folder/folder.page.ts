import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
declare const google;

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit, AfterViewInit {
  public folder: string;
  public map;
  public geocoder;
  marker;
  @ViewChild('mapElement', {static: false}) mapElement;
  public formattedAddress;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngAfterViewInit(): void {
    const myLatlng = new google.maps.LatLng(-25.363882, 131.044922);
    this.geocoder = new google.maps.Geocoder();
    const mapOptions = {
      zoom: 4,
      center: myLatlng
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.marker = new google.maps.Marker({
      position: myLatlng,
      map: this.map,
      draggable: true,
      title: 'Drag me!'
    });
    google.maps.event.addListener(this.marker, 'dragend', () => {
      this.geocodePosition(this.marker.getPosition());
    });
  }

  geocodePosition(pos) {
    this.geocoder.geocode({
      latLng: pos
    }, (responses) => {
      if (responses && responses.length > 0) {
        this.formattedAddress = responses[0].formatted_address;
      } else {
      }
    });
  }

}
