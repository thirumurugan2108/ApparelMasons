import { Component, OnInit } from '@angular/core';
import { Post } from '../shared/postModel';
import { HomePageService } from '../shared/home-page.service';
import { BlogsFirestoreService } from '../shared/blogs.firestore.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts: Post[];
  SCRUM: Post[];
  KANBAN: Post[];
  XP: Post[];
  trend: Post;
  recents: any;
  date: any;
  featured: Post[];

  constructor(
    private homePageService: HomePageService,
    private blogsFirestoreService: BlogsFirestoreService,
    private afs: AngularFirestore) { }

  

  ngOnInit() {
    this.afs.collection<Post>('posts', query =>
      query.where('CATEGORY', '==', 'Trend').
        where('ACTIVATIONSTATUS', '==', true).
        where('ISPUBLISHED', '==', true).
        orderBy('CREATEDDATE', 'desc').limit(1)
    ).valueChanges().subscribe(
      data => {
        this.trend = data[0];
      }
    );

    const doc = this.afs.collection('posts', query =>
      query.orderBy('CREATEDDATE', 'desc').
        where('ACTIVATIONSTATUS', '==', true).
        where('ISPUBLISHED', '==', true).limit(2)
    ).valueChanges();
    doc.subscribe(data => {
      this.recents = data;
    });

    const doc1 = this.afs.collection<Post>('posts', query =>
      query.where('ISAUTHORRECOMMENDED', '==', true).
        where('ACTIVATIONSTATUS', '==', true).
        where('ISPUBLISHED', '==', true).
        orderBy('CREATEDDATE', 'desc').limit(6)
    ).valueChanges();
    doc1.subscribe(data => {
      this.featured = data;
    });

    this.afs.collection<Post>('posts', query =>
      query.where('CATEGORY', '==', 'Lifestyle').
        where('ACTIVATIONSTATUS', '==', true).
        where('ISPUBLISHED', '==', true).
        orderBy('CREATEDDATE', 'desc').limit(3)
    ).valueChanges().subscribe(
      data => {
        this.SCRUM = data;
      }
    );

    this.afs.collection<Post>('posts', query =>
      query.where('CATEGORY', '==', 'Health').
        where('ACTIVATIONSTATUS', '==', true).
        where('ISPUBLISHED', '==', true).
        orderBy('CREATEDDATE', 'desc').limit(3)
    ).valueChanges().subscribe(
      data => {
        this.KANBAN = data;
      }
    );
    this.afs.collection<Post>('posts', query =>
      query.where('CATEGORY', '==', 'COVID-19').
        where('ACTIVATIONSTATUS', '==', true).
        where('ISPUBLISHED', '==', true).
        orderBy('CREATEDDATE', 'desc').limit(3)
    ).valueChanges().subscribe(
      data => {
        this.XP = data;
      }
    );
    this.currentdate();
  }


  currentdate() {
    this.date = new Date();
  }

}
