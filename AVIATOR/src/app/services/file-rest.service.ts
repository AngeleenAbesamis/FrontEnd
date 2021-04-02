import { Injectable } from '@angular/core';
import { BlobServiceClient } from '@azure/storage-blob';

@Injectable({
  providedIn: 'root'
})
export class FileRESTService {

  constructor(private blob: BlobServiceClient) { }

  //addfile
  //getfile
}
