import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Post } from '../shared/postModel';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PostComponent implements OnInit, OnDestroy {
  posts: Post[];
  scrums: Post[];
  title: string;
  category: string;
  private scrumcl: any;
  routeSubcription: Subscription;
  blog: any;
  id: any;
  relapost: any;
  relapost1: any;
  relapost2: any;
  date = new Date();
  constructor(private route: ActivatedRoute, private afs: AngularFirestore) { }
  ngOnInit() {
    this.title = this.route.snapshot.params['title'];
    this.routeSubcription = this.route.params.subscribe((params: Params) => {
      this.title = params['title'];
      console.log(this.title);
      if (this.title) {
        this.afs.collection('posts', query =>
          query.where('TITLE', '==', this.title)
        ).snapshotChanges()
          .subscribe(data => {
            console.log("test tset tset tset tset tes");
            console.log(data);
            this.id = data[0].payload.doc.id;
            this.afs.collection('posts/' + this.id + '/otherDetails').valueChanges().subscribe(
              data => {
                console.log(data);
                this.relapost = data[0];
                this.relapost1 = data[1];
                this.relapost2 = data[2];
                this.blog = data[3];
              }
            );
          });
      }
    });

  }

  ngOnDestroy() {
    this.routeSubcription.unsubscribe();
  }
}
